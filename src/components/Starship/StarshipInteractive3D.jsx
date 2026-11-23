import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { isWebGLAvailable, prefersReducedMotion } from '../../utils/webglSupport'
import launchFallbackImg from '../../assets/launch.jpg'
import './Starship.css'

export default function StarshipInteractive3D({ activeStageIndex }) {
  const mountRef = useRef(null)
  const [webglSupported, setWebglSupported] = useState(true)

  const boosterMeshRef = useRef(null)
  const shipMeshRef = useRef(null)
  const plasmaGlowRef = useRef(null)
  const cameraRef = useRef(null)
  const sceneRef = useRef(null)

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
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 36)
    cameraRef.current = camera

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // 3. Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambient)

    const sun = new THREE.DirectionalLight(0xffffff, 3.2)
    sun.position.set(30, 25, 20)
    scene.add(sun)

    const fill = new THREE.DirectionalLight(0x4488ff, 1.8)
    fill.position.set(-25, -15, -10)
    scene.add(fill)

    // 4. Materials
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4dc,
      metalness: 0.92,
      roughness: 0.2,
    })
    const tilesMat = new THREE.MeshStandardMaterial({
      color: 0x111116,
      metalness: 0.1,
      roughness: 0.88,
    })
    const darkRingMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f24,
      metalness: 0.7,
      roughness: 0.45,
    })
    const engineMat = new THREE.MeshStandardMaterial({
      color: 0x333338,
      metalness: 0.85,
      roughness: 0.35,
    })

    // 5. Starship Model Groups
    const modelRoot = new THREE.Group()
    scene.add(modelRoot)

    // BOOSTER GROUP
    const boosterGroup = new THREE.Group()
    boosterMeshRef.current = boosterGroup

    // Booster Body
    const boosterCyl = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 15, 32), steelMat)
    boosterCyl.position.y = -7.5
    boosterGroup.add(boosterCyl)

    // Hot Staging Ring
    const hotRing = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 1.5, 32), darkRingMat)
    hotRing.position.y = 0.75
    boosterGroup.add(hotRing)

    // Grid Fins (4x)
    for (let i = 0; i < 4; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.4, 1.1), steelMat)
      const angle = (i * Math.PI) / 2
      fin.position.set(Math.cos(angle) * 1.9, -0.2, Math.sin(angle) * 1.9)
      fin.rotation.y = angle
      boosterGroup.add(fin)
    }

    // Raptor Cluster representation
    for (let i = 0; i < 18; i++) {
      const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 0.7, 16), engineMat)
      const angle = (i * Math.PI) / 9
      bell.position.set(Math.cos(angle) * 1.25, -15.4, Math.sin(angle) * 1.25)
      boosterGroup.add(bell)
    }
    modelRoot.add(boosterGroup)

    // SHIP UPPER STAGE GROUP
    const shipGroup = new THREE.Group()
    shipMeshRef.current = shipGroup

    // Ship Body (Stainless Steel half)
    const shipCyl = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 9, 32), steelMat)
    shipCyl.position.y = 6.0
    shipGroup.add(shipCyl)

    // Heat Shield half (windward tiles)
    const shipTiles = new THREE.Mesh(
      new THREE.CylinderGeometry(1.62, 1.62, 9, 32, 1, false, 0, Math.PI),
      tilesMat
    )
    shipTiles.position.y = 6.0
    shipGroup.add(shipTiles)

    // Nosecone
    const nose = new THREE.Mesh(new THREE.ConeGeometry(1.6, 4.4, 32), steelMat)
    nose.position.y = 12.7
    shipGroup.add(nose)

    // Forward Flaps
    const fFlapL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.0, 1.0), steelMat)
    fFlapL.position.set(-1.85, 11.2, 0)
    shipGroup.add(fFlapL)

    const fFlapR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.0, 1.0), steelMat)
    fFlapR.position.set(1.85, 11.2, 0)
    shipGroup.add(fFlapR)

    // Aft Flaps
    const aFlapL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.4, 1.8), steelMat)
    aFlapL.position.set(-2.2, 3.2, 0)
    shipGroup.add(aFlapL)

    const aFlapR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.4, 1.8), steelMat)
    aFlapR.position.set(2.2, 3.2, 0)
    shipGroup.add(aFlapR)

    // Atmospheric Reentry Plasma Glow (for Heat Shield stage)
    const plasmaGeo = new THREE.SphereGeometry(3.6, 24, 24)
    const plasmaMat = new THREE.MeshBasicMaterial({
      color: 0xff4411,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    })
    const plasmaGlow = new THREE.Mesh(plasmaGeo, plasmaMat)
    plasmaGlow.position.set(0, 6, 1.6)
    plasmaGlowRef.current = plasmaGlow
    shipGroup.add(plasmaGlow)

    modelRoot.add(shipGroup)

    // 6. Responsive Resize
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

    // 7. Render Loop with Target State Lerping
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      // Continuous subtle yaw drift
      if (!reducedMotion) {
        modelRoot.rotation.y += 0.003
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      scene.clear()
    }
  }, [])

  // Update 3D Stage Configurations whenever activeStageIndex changes
  useEffect(() => {
    if (!cameraRef.current || !boosterMeshRef.current || !shipMeshRef.current) return

    const camera = cameraRef.current
    const booster = boosterMeshRef.current
    const ship = shipMeshRef.current
    const plasma = plasmaGlowRef.current

    // Define spatial and positional parameters for each scroll stage
    switch (activeStageIndex) {
      case 0: // LIFTOFF & RAPTOR 3 POWER
        camera.position.set(0, -6, 26)
        camera.lookAt(0, -8, 0)
        booster.position.set(0, 0, 0)
        ship.position.set(0, 0, 0)
        ship.rotation.set(0, 0, 0)
        if (plasma) plasma.material.opacity = 0
        break

      case 1: // HOT-STAGING SEPARATION
        camera.position.set(0, 4, 34)
        camera.lookAt(0, 3, 0)
        booster.position.set(0, -4.5, 0)
        ship.position.set(0, 3.5, 0)
        ship.rotation.set(0, 0, 0)
        if (plasma) plasma.material.opacity = 0
        break

      case 2: // MECHAZILLA TOWER CATCH
        camera.position.set(10, -2, 28)
        camera.lookAt(0, -2, 0)
        booster.position.set(0, 0, 0)
        ship.position.set(0, 0, 0)
        ship.rotation.set(0, 0, 0)
        if (plasma) plasma.material.opacity = 0
        break

      case 3: // THERMAL PROTECTION SHIELD (MACH 25 ENTRY)
        camera.position.set(0, 6, 26)
        camera.lookAt(0, 6, 0)
        booster.position.set(0, 0, 0)
        ship.position.set(0, 0, 0)
        ship.rotation.set(0, Math.PI / 2, 0) // Face heat shield tiles toward camera
        if (plasma) plasma.material.opacity = 0.55
        break

      case 4: // BELLYFLOP & LANDING FLIP
        camera.position.set(0, 4, 30)
        camera.lookAt(0, 4, 0)
        booster.position.set(0, 0, 0)
        ship.position.set(0, 0, 0)
        ship.rotation.set(Math.PI / 2.2, 0, 0) // Horizontal aerodynamic bellyflop posture
        if (plasma) plasma.material.opacity = 0
        break

      default:
        break
    }
  }, [activeStageIndex])

  if (!webglSupported) {
    return (
      <div
        className="starship-fallback-img"
        style={{ backgroundImage: `url(${launchFallbackImg})` }}
      />
    )
  }

  return (
    <div className="starship-canvas-wrap">
      <div ref={mountRef} className="starship-webgl" />
    </div>
  )
}
