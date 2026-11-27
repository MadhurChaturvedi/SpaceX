import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { isWebGLAvailable, prefersReducedMotion } from '../../utils/webglSupport'
import { LUNAR_LANDMARKS } from './moonData'
import './Moon.css'

export default function MoonSimulation3D({
  phaseAngle = 180,
  viewMode = 'earth',
  selectedLandmarkId = null,
  onSelectLandmark = () => {},
}) {
  const mountRef = useRef(null)
  const [webglSupported] = useState(() => isWebGLAvailable())

  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const sunLightRef = useRef(null)
  const moonGroupRef = useRef(null)
  const earthMeshRef = useRef(null)
  const trajectoryLineRef = useRef(null)
  const markerObjectsRef = useRef([])

  const isDraggingRef = useRef(false)
  const prevMousePosRef = useRef({ x: 0, y: 0 })
  const userRotationRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!webglSupported) return

    const container = mountRef.current
    if (!container) return

    const reducedMotion = prefersReducedMotion()
    let animationFrameId

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    )
    camera.position.set(0, 0, 36)
    cameraRef.current = camera

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    container.appendChild(renderer.domElement)

    // 3. Multi-Layer Deep Space Starfield
    const starCount = 2800
    const starGeo = new THREE.BufferGeometry()
    const starPos = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3
      starPos[idx] = (Math.random() - 0.5) * 600
      starPos[idx + 1] = (Math.random() - 0.5) * 600
      starPos[idx + 2] = (Math.random() - 0.5) * 600

      const tint = Math.random()
      if (tint > 0.85) {
        starColors[idx] = 0.7; starColors[idx + 1] = 0.85; starColors[idx + 2] = 1.0 // Cold blue
      } else if (tint > 0.7) {
        starColors[idx] = 1.0; starColors[idx + 1] = 0.95; starColors[idx + 2] = 0.85 // Warm white
      } else {
        starColors[idx] = 0.92; starColors[idx + 1] = 0.92; starColors[idx + 2] = 0.92
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3))

    const starMat = new THREE.PointsMaterial({
      size: 1.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    })
    const starField = new THREE.Points(starGeo, starMat)
    scene.add(starField)

    // 4. Directional Solar Illumination & Earthshine Ambient Light
    // Faint Earthshine illuminating the dark side of the Moon
    const earthshineLight = new THREE.AmbientLight(0x0e1422, 1.1)
    scene.add(earthshineLight)

    // Direct Collimated Sunlight (controls phases dynamically)
    const sunLight = new THREE.DirectionalLight(0xffffff, 4.0)
    sunLight.position.set(0, 0, 50)
    scene.add(sunLight)
    sunLightRef.current = sunLight

    // 5. Build Procedural High-Res Lunar Surface
    const moonGroup = new THREE.Group()
    moonGroupRef.current = moonGroup
    scene.add(moonGroup)

    const moonRadius = 9.0
    const moonGeo = new THREE.SphereGeometry(moonRadius, 64, 64)

    // Generate Procedural High-Contrast Lunar Texture (Mares + Craters + Rays)
    const moonCanvas = document.createElement('canvas')
    moonCanvas.width = 2048
    moonCanvas.height = 1024
    const ctx = moonCanvas.getContext('2d')

    // Lunar highland base regolith (ash grey)
    ctx.fillStyle = '#9b9ba3'
    ctx.fillRect(0, 0, 2048, 1024)

    // Maria Basalt Plains (Dark volcanic basalt depressions)
    const maria = [
      { x: 920, y: 380, rx: 220, ry: 170, color: '#44464c' }, // Mare Imbrium
      { x: 620, y: 460, rx: 260, ry: 280, color: '#3d3f44' }, // Oceanus Procellarum
      { x: 1220, y: 410, rx: 170, ry: 130, color: '#424449' }, // Mare Serenitatis
      { x: 1310, y: 520, rx: 190, ry: 150, color: '#3c3e43' }, // Mare Tranquillitatis
      { x: 1450, y: 550, rx: 140, ry: 120, color: '#404247' }, // Mare Fecunditatis
      { x: 1460, y: 390, rx: 130, ry: 110, color: '#45474c' }, // Mare Crisium
      { x: 1080, y: 640, rx: 180, ry: 140, color: '#46484e' }, // Mare Nubium
    ]

    maria.forEach(m => {
      const grad = ctx.createRadialGradient(m.x, m.y, 10, m.x, m.y, Math.max(m.rx, m.ry))
      grad.addColorStop(0, m.color)
      grad.addColorStop(0.7, m.color)
      grad.addColorStop(1, '#8e8e96')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.ellipse(m.x, m.y, m.rx, m.ry, 0, 0, Math.PI * 2)
      ctx.fill()
    })

    // Random impact craters across surface
    for (let c = 0; c < 600; c++) {
      const cx = Math.random() * 2048
      const cy = Math.random() * 1024
      const r = Math.random() * 12 + 1.5

      ctx.fillStyle = '#222326'
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fill()

      // Crater bright rim
      ctx.strokeStyle = '#d5d5dd'
      ctx.lineWidth = Math.max(1, r * 0.25)
      ctx.beginPath()
      ctx.arc(cx, cy, r + 1, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Tycho Crater with massive ejecta ray system (South polar region)
    const tychoX = 1000
    const tychoY = 740
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(tychoX, tychoY, 14, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)'
    ctx.lineWidth = 2
    for (let ray = 0; ray < 24; ray++) {
      const angle = (ray * Math.PI) / 12
      const len = Math.random() * 450 + 250
      ctx.beginPath()
      ctx.moveTo(tychoX, tychoY)
      ctx.lineTo(tychoX + Math.cos(angle) * len, tychoY + Math.sin(angle) * len)
      ctx.stroke()
    }

    const moonTexture = new THREE.CanvasTexture(moonCanvas)
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.92,
      metalness: 0.05,
    })
    const moonMesh = new THREE.Mesh(moonGeo, moonMat)
    moonGroup.add(moonMesh)

    // 6. Landmark Pin Markers on Lunar Surface
    markerObjectsRef.current = []
    LUNAR_LANDMARKS.forEach(lm => {
      // Convert latitude/longitude to 3D Cartesian coordinates
      const phi = (90 - lm.coords.lat) * (Math.PI / 180)
      const theta = (lm.coords.lon + 180) * (Math.PI / 180)

      const x = -(moonRadius * 1.012 * Math.sin(phi) * Math.cos(theta))
      const z = moonRadius * 1.012 * Math.sin(phi) * Math.sin(theta)
      const y = moonRadius * 1.012 * Math.cos(phi)

      const markerPin = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x00ff88 })
      )
      markerPin.position.set(x, y, z)
      markerPin.userData = { id: lm.id, name: lm.name }
      moonGroup.add(markerPin)

      // Pulsing outer beacon ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.32, 0.46, 24),
        new THREE.MeshBasicMaterial({ color: 0x00ff88, side: THREE.DoubleSide })
      )
      ring.position.set(x, y, z)
      ring.lookAt(0, 0, 0)
      moonGroup.add(ring)

      markerObjectsRef.current.push({ id: lm.id, mesh: markerPin, pos: new THREE.Vector3(x, y, z) })
    })

    // 7. Earth Horizon Object (Visible in Earth Observation mode)
    const earthRadius = 60
    const earthGeo = new THREE.SphereGeometry(earthRadius, 48, 48)
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x0b2545,
      roughness: 0.7,
      metalness: 0.1,
    })
    const earthMesh = new THREE.Mesh(earthGeo, earthMat)
    earthMesh.position.set(0, -68, -10)
    scene.add(earthMesh)
    earthMeshRef.current = earthMesh

    // Blue atmospheric haze rim
    const airglowGeo = new THREE.SphereGeometry(earthRadius * 1.02, 48, 48)
    const airglowMat = new THREE.MeshBasicMaterial({
      color: 0x3388ff,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })
    const airglowMesh = new THREE.Mesh(airglowGeo, airglowMat)
    earthMesh.add(airglowMesh)

    // 8. Trans-Lunar Trajectory Line (Earth to Moon orbital path)
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, -45, 0),
      new THREE.Vector3(25, -20, 10),
      new THREE.Vector3(-15, 10, -5),
      new THREE.Vector3(0, 0, 0)
    )
    const trajPoints = curve.getPoints(80)
    const trajGeo = new THREE.BufferGeometry().setFromPoints(trajPoints)
    const trajMat = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.6,
      linewidth: 2,
    })
    const trajectoryLine = new THREE.Line(trajGeo, trajMat)
    scene.add(trajectoryLine)
    trajectoryLineRef.current = trajectoryLine
    trajectoryLine.visible = false // Only visible in 'system' view mode

    // 9. Interactive Drag Controls for Moon Orbit View
    const onPointerDown = (e) => {
      isDraggingRef.current = true
      prevMousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const onPointerMove = (e) => {
      if (!isDraggingRef.current || !moonGroupRef.current) return
      const deltaX = e.clientX - prevMousePosRef.current.x
      const deltaY = e.clientY - prevMousePosRef.current.y
      userRotationRef.current.y += deltaX * 0.007
      userRotationRef.current.x += deltaY * 0.005
      prevMousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const onPointerUp = () => {
      isDraggingRef.current = false
    }

    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    // Raycaster for clicking landmark pins
    const raycaster = new THREE.Raycaster()
    const mouseVec = new THREE.Vector2()

    const onClickCanvas = (e) => {
      const rect = container.getBoundingClientRect()
      mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouseVec, camera)

      const targets = markerObjectsRef.current.map(m => m.mesh)
      const intersects = raycaster.intersectObjects(targets)
      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData.id
        if (hitId) onSelectLandmark(hitId)
      }
    }
    container.addEventListener('click', onClickCanvas)

    // 10. Responsive Resize
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', handleResize)

    // 11. Render Loop
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      clock.getDelta()

      if (moonGroupRef.current) {
        // Apply user drag rotation
        moonGroupRef.current.rotation.y = userRotationRef.current.y
        moonGroupRef.current.rotation.x = userRotationRef.current.x

        // Auto-orbit drift when not dragging
        if (!isDraggingRef.current && !reducedMotion) {
          userRotationRef.current.y += 0.001
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      container.removeEventListener('click', onClickCanvas)
      window.removeEventListener('resize', handleResize)

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starGeo.dispose()
      starMat.dispose()
      moonGeo.dispose()
      moonMat.dispose()
      moonTexture.dispose()
      earthGeo.dispose()
      earthMat.dispose()
      airglowGeo.dispose()
      airglowMat.dispose()
      trajGeo.dispose()
      trajMat.dispose()
    }
  }, [webglSupported, onSelectLandmark])

  // Update Directional Sunlight Position when phaseAngle changes
  useEffect(() => {
    if (!sunLightRef.current) return
    const rad = (phaseAngle * Math.PI) / 180
    // Sun orbits in the X-Z plane around the Moon
    const sunDistance = 60
    const sunX = Math.sin(rad) * sunDistance
    const sunZ = -Math.cos(rad) * sunDistance
    sunLightRef.current.position.set(sunX, 6, sunZ)
  }, [phaseAngle])

  // Update Camera Viewport based on viewMode and selectedLandmarkId
  useEffect(() => {
    if (!cameraRef.current || !earthMeshRef.current || !trajectoryLineRef.current) return
    const camera = cameraRef.current
    const earth = earthMeshRef.current
    const traj = trajectoryLineRef.current

    switch (viewMode) {
      case 'earth':
        // Earth horizon view looking up into the night sky
        camera.position.set(0, 0, 36)
        camera.lookAt(0, 0, 0)
        earth.visible = true
        earth.position.set(0, -68, -10)
        traj.visible = false
        break

      case 'telescope':
        // Optical zoom directly onto lunar disc
        camera.position.set(0, 0, 20)
        camera.lookAt(0, 0, 0)
        earth.visible = false
        traj.visible = false
        break

      case 'orbit':
        // 3D inspection mode
        camera.position.set(0, 4, 30)
        camera.lookAt(0, 0, 0)
        earth.visible = false
        traj.visible = false
        break

      case 'system':
        // Earth-Moon orbital system vantage (384,400 km scale view)
        camera.position.set(0, 15, 80)
        camera.lookAt(0, -10, 0)
        earth.visible = true
        earth.position.set(0, -35, 0)
        traj.visible = true
        break

      default:
        break
    }
  }, [viewMode])

  // Focus Camera onto selected landmark if specified
  useEffect(() => {
    if (!selectedLandmarkId || !moonGroupRef.current) return
    const marker = markerObjectsRef.current.find(m => m.id === selectedLandmarkId)
    if (marker) {
      // Rotate moon group so selected landmark faces the camera
      const pos = marker.pos.clone().normalize()
      const targetAngleY = Math.atan2(pos.x, pos.z)
      const targetAngleX = -Math.asin(pos.y)
      userRotationRef.current.y = -targetAngleY
      userRotationRef.current.x = targetAngleX
    }
  }, [selectedLandmarkId])

  if (!webglSupported) {
    return (
      <div className="moon-fallback-container">
        <p className="fallback-msg">WebGL unavailable. Displaying astronomical reference.</p>
      </div>
    )
  }

  return (
    <div className="moon-simulation-canvas-wrap">
      <div ref={mountRef} className="moon-webgl-canvas" />
    </div>
  )
}
