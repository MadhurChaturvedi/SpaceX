import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { isWebGLAvailable, prefersReducedMotion } from '../../utils/webglSupport'
import marsFallbackImg from '../../assets/mars.jpg'
import './Mars.css'

export default function MarsGlobe3D() {
  const mountRef = useRef(null)
  const [webglSupported, setWebglSupported] = useState(true)
  const [isAutoRotate, setIsAutoRotate] = useState(true)
  const isDraggingRef = useRef(false)
  const previousPosRef = useRef({ x: 0, y: 0 })
  const marsGroupRef = useRef(null)

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglSupported(false)
      return
    }

    const container = mountRef.current
    if (!container) return

    const reducedMotion = prefersReducedMotion()
    let animationFrameId

    // 1. Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 26)

    // 2. Renderer
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

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x221108, 1.2)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xffeedd, 3.4)
    sunLight.position.set(35, 20, 25)
    scene.add(sunLight)

    const marsRimLight = new THREE.DirectionalLight(0xff6633, 2.0)
    marsRimLight.position.set(-30, -10, -15)
    scene.add(marsRimLight)

    // 4. Mars Globe Group
    const marsGroup = new THREE.Group()
    marsGroupRef.current = marsGroup
    scene.add(marsGroup)

    // Procedural High-Res Martian Surface Texture
    const marsCanvas = document.createElement('canvas')
    marsCanvas.width = 1024
    marsCanvas.height = 512
    const ctx = marsCanvas.getContext('2d')

    // Base iron-oxide terrain gradient
    const gradient = ctx.createLinearGradient(0, 0, 1024, 512)
    gradient.addColorStop(0, '#5a1f10')
    gradient.addColorStop(0.25, '#8c351c')
    gradient.addColorStop(0.5, '#b04a25')
    gradient.addColorStop(0.75, '#7a2d16')
    gradient.addColorStop(1, '#4a180c')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1024, 512)

    // Craters, canyon networks (Valles Marineris), and volcanic plateaus (Olympus Mons)
    ctx.fillStyle = '#38130a'
    for (let i = 0; i < 40; i++) {
      ctx.beginPath()
      ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 50 + 15, 0, Math.PI * 2)
      ctx.fill()
    }
    // Canyon slit
    ctx.strokeStyle = '#280c05'
    ctx.lineWidth = 14
    ctx.beginPath()
    ctx.moveTo(350, 240)
    ctx.bezierCurveTo(450, 260, 550, 230, 680, 250)
    ctx.stroke()

    // Polar Ice Caps (North & South)
    ctx.fillStyle = 'rgba(240, 245, 255, 0.75)'
    ctx.fillRect(0, 0, 1024, 38)
    ctx.fillRect(0, 480, 1024, 32)

    const marsTexture = new THREE.CanvasTexture(marsCanvas)

    // Mars Sphere Mesh
    const marsRadius = 8.2
    const marsGeo = new THREE.SphereGeometry(marsRadius, 64, 64)
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsTexture,
      roughness: 0.85,
      metalness: 0.1,
    })
    const marsSphere = new THREE.Mesh(marsGeo, marsMat)
    marsGroup.add(marsSphere)

    // Atmospheric Glow Shell (Thin CO2 haze)
    const atmosGeo = new THREE.SphereGeometry(marsRadius * 1.035, 48, 48)
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0xff6633,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })
    const atmosShell = new THREE.Mesh(atmosGeo, atmosMat)
    marsGroup.add(atmosShell)

    // Landing Site Markers (Arcadia Planitia & Jezero Crater)
    const createMarker = (lat, lon, label) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lon + 180) * (Math.PI / 180)
      const x = -(marsRadius * 1.01 * Math.sin(phi) * Math.cos(theta))
      const z = marsRadius * 1.01 * Math.sin(phi) * Math.sin(theta)
      const y = marsRadius * 1.01 * Math.cos(phi)

      const markerPin = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x00ff88 })
      )
      markerPin.position.set(x, y, z)
      marsGroup.add(markerPin)

      // Ring pulse around pin
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.24, 0.32, 24),
        new THREE.MeshBasicMaterial({ color: 0x00ff88, side: THREE.DoubleSide })
      )
      ring.position.set(x, y, z)
      ring.lookAt(0, 0, 0)
      marsGroup.add(ring)
    }

    createMarker(39.3, 171.0, 'Arcadia Planitia') // Starship Landing Zone candidate
    createMarker(18.4, 77.5, 'Jezero Crater')

    // Orbital Trajectory Ring
    const orbitCurve = new THREE.EllipseCurve(0, 0, 11.5, 11.5, 0, 2 * Math.PI, false, 0)
    const orbitPoints = orbitCurve.getPoints(64)
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints)
    const orbitMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })
    const orbitLine = new THREE.Line(orbitGeo, orbitMat)
    orbitLine.rotation.x = Math.PI / 2.6
    orbitLine.rotation.y = Math.PI / 6
    scene.add(orbitLine)

    // 5. Drag Interaction
    const onPointerDown = (e) => {
      isDraggingRef.current = true
      previousPosRef.current = { x: e.clientX, y: e.clientY }
    }
    const onPointerMove = (e) => {
      if (!isDraggingRef.current || !marsGroupRef.current) return
      const deltaX = e.clientX - previousPosRef.current.x
      const deltaY = e.clientY - previousPosRef.current.y
      marsGroupRef.current.rotation.y += deltaX * 0.007
      marsGroupRef.current.rotation.x += deltaY * 0.005
      previousPosRef.current = { x: e.clientX, y: e.clientY }
    }
    const onPointerUp = () => {
      isDraggingRef.current = false
    }

    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    // 6. Resize
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

    // 7. Render Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (marsGroupRef.current && isAutoRotate && !isDraggingRef.current && !reducedMotion) {
        marsGroupRef.current.rotation.y += 0.004
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      marsGeo.dispose()
      marsMat.dispose()
      atmosGeo.dispose()
      atmosMat.dispose()
      marsTexture.dispose()
    }
  }, [isAutoRotate])

  if (!webglSupported) {
    return (
      <div
        className="mars-fallback-img"
        style={{ backgroundImage: `url(${marsFallbackImg})` }}
      />
    )
  }

  return (
    <div className="mars-canvas-container">
      <div ref={mountRef} className="mars-webgl" />
      <div className="mars-globe-meta">
        <span className="mars-tag">RED PLANET • 3D SIMULATION</span>
        <button
          type="button"
          className="mars-spin-toggle"
          onClick={() => setIsAutoRotate(prev => !prev)}
        >
          {isAutoRotate ? 'ORBIT: SPINNING' : 'ORBIT: FROZEN'}
        </button>
      </div>
    </div>
  )
}
