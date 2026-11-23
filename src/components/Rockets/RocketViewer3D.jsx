import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { isWebGLAvailable, prefersReducedMotion } from '../../utils/webglSupport'
import falconFallbackImg from '../../assets/falcon.jpg'
import './Rockets.css'

export default function RocketViewer3D({ rocketType }) {
  const mountRef = useRef(null)
  const [webglSupported] = useState(() => isWebGLAvailable())
  const [isAutoSpin, setIsAutoSpin] = useState(true)
  const isDraggingRef = useRef(false)
  const previousMousePositionRef = useRef({ x: 0, y: 0 })
  const rotationVelocityRef = useRef(0)
  const rocketGroupRef = useRef(null)

  useEffect(() => {
    if (!webglSupported) return

    const container = mountRef.current
    if (!container) return

    const reducedMotion = prefersReducedMotion()
    let animationFrameId

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 32)

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

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8)
    keyLight.position.set(20, 20, 20)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x66aaff, 2.0)
    rimLight.position.set(-20, -10, -15)
    scene.add(rimLight)

    // 4. Ground Reflection Grid
    const gridHelper = new THREE.GridHelper(30, 30, 0x334466, 0x111622)
    gridHelper.position.y = -10.5
    scene.add(gridHelper)

    // 5. Build Procedural Rocket Model based on rocketType
    const rocketRoot = new THREE.Group()
    rocketGroupRef.current = rocketRoot
    scene.add(rocketRoot)

    // Common PBR Materials
    const whiteBoosterMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5fa,
      metalness: 0.35,
      roughness: 0.3,
    })
    const darkInterstageMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1f,
      metalness: 0.6,
      roughness: 0.5,
    })
    const titaniumFinMat = new THREE.MeshStandardMaterial({
      color: 0x2e2e33,
      metalness: 0.85,
      roughness: 0.25,
    })
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xd0d0d8,
      metalness: 0.94,
      roughness: 0.18,
    })
    const tilesMat = new THREE.MeshStandardMaterial({
      color: 0x111116,
      metalness: 0.05,
      roughness: 0.88,
    })
    const engineMat = new THREE.MeshStandardMaterial({
      color: 0x333338,
      metalness: 0.8,
      roughness: 0.4,
    })

    if (rocketType === 'falcon9') {
      // FALCON 9: Single Core + Fairing
      // First stage booster
      const stage1Geo = new THREE.CylinderGeometry(0.8, 0.8, 14, 32)
      const stage1 = new THREE.Mesh(stage1Geo, whiteBoosterMat)
      stage1.position.y = -1.5
      rocketRoot.add(stage1)

      // Interstage
      const interstageGeo = new THREE.CylinderGeometry(0.8, 0.8, 1.8, 32)
      const interstage = new THREE.Mesh(interstageGeo, darkInterstageMat)
      interstage.position.y = 6.4
      rocketRoot.add(interstage)

      // Stage 2
      const stage2Geo = new THREE.CylinderGeometry(0.8, 0.8, 2.8, 32)
      const stage2 = new THREE.Mesh(stage2Geo, whiteBoosterMat)
      stage2.position.y = 8.7
      rocketRoot.add(stage2)

      // Payload Fairing
      const fairingCylGeo = new THREE.CylinderGeometry(1.05, 0.8, 2.2, 32)
      const fairingCyl = new THREE.Mesh(fairingCylGeo, whiteBoosterMat)
      fairingCyl.position.y = 11.2
      rocketRoot.add(fairingCyl)

      const fairingConeGeo = new THREE.ConeGeometry(1.05, 3.2, 32)
      const fairingCone = new THREE.Mesh(fairingConeGeo, whiteBoosterMat)
      fairingCone.position.y = 13.9
      rocketRoot.add(fairingCone)

      // 4 Grid fins
      for (let i = 0; i < 4; i++) {
        const finGeo = new THREE.BoxGeometry(0.08, 0.9, 0.6)
        const fin = new THREE.Mesh(finGeo, titaniumFinMat)
        const angle = (i * Math.PI) / 2
        fin.position.set(Math.cos(angle) * 0.95, 6.8, Math.sin(angle) * 0.95)
        fin.rotation.y = angle
        rocketRoot.add(fin)
      }

      // 4 Landing legs
      for (let i = 0; i < 4; i++) {
        const legGeo = new THREE.BoxGeometry(0.08, 3.8, 0.25)
        const leg = new THREE.Mesh(legGeo, titaniumFinMat)
        const angle = (i * Math.PI) / 2 + Math.PI / 4
        leg.position.set(Math.cos(angle) * 0.88, -6.8, Math.sin(angle) * 0.88)
        leg.rotation.y = angle
        rocketRoot.add(leg)
      }

      // 9 Merlin engine bells (Octaweb)
      for (let i = 0; i < 8; i++) {
        const bellGeo = new THREE.CylinderGeometry(0.12, 0.22, 0.6, 16)
        const bell = new THREE.Mesh(bellGeo, engineMat)
        const angle = (i * Math.PI) / 4
        bell.position.set(Math.cos(angle) * 0.48, -8.8, Math.sin(angle) * 0.48)
        rocketRoot.add(bell)
      }
      const centerBell = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 0.6, 16), engineMat)
      centerBell.position.set(0, -8.8, 0)
      rocketRoot.add(centerBell)

      camera.position.set(0, 2, 28)
    } else if (rocketType === 'falconheavy') {
      // FALCON HEAVY: Tri-Core (Center + 2 Side Boosters)
      const corePositions = [0, -1.85, 1.85]

      corePositions.forEach((posX, index) => {
        const isCenter = index === 0
        const boosterGeo = new THREE.CylinderGeometry(0.72, 0.72, 14, 32)
        const booster = new THREE.Mesh(boosterGeo, whiteBoosterMat)
        booster.position.set(posX, -1.5, 0)
        rocketRoot.add(booster)

        // Side booster nosecones
        if (!isCenter) {
          const noseConeGeo = new THREE.ConeGeometry(0.72, 2.4, 32)
          const noseCone = new THREE.Mesh(noseConeGeo, whiteBoosterMat)
          noseCone.position.set(posX, 6.7, 0)
          rocketRoot.add(noseCone)
        } else {
          // Center core interstage + stage 2 + fairing
          const interstageGeo = new THREE.CylinderGeometry(0.72, 0.72, 1.8, 32)
          const interstage = new THREE.Mesh(interstageGeo, darkInterstageMat)
          interstage.position.set(0, 6.4, 0)
          rocketRoot.add(interstage)

          const stage2 = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 2.8, 32), whiteBoosterMat)
          stage2.position.set(0, 8.7, 0)
          rocketRoot.add(stage2)

          const fairingCyl = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 0.72, 2.2, 32), whiteBoosterMat)
          fairingCyl.position.set(0, 11.2, 0)
          rocketRoot.add(fairingCyl)

          const fairingCone = new THREE.Mesh(new THREE.ConeGeometry(1.0, 3.2, 32), whiteBoosterMat)
          fairingCone.position.set(0, 13.9, 0)
          rocketRoot.add(fairingCone)
        }

        // Engine clusters
        for (let b = 0; b < 9; b++) {
          const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.18, 0.55, 16), engineMat)
          const angle = (b * Math.PI) / 4
          const rad = b === 8 ? 0 : 0.42
          bell.position.set(posX + Math.cos(angle) * rad, -8.8, Math.sin(angle) * rad)
          rocketRoot.add(bell)
        }
      })

      camera.position.set(0, 2, 32)
    } else {
      // STARSHIP & SUPER HEAVY
      // Super Heavy Booster (Stainless steel cylinder)
      const boosterGeo = new THREE.CylinderGeometry(1.5, 1.5, 13, 32)
      const booster = new THREE.Mesh(boosterGeo, steelMat)
      booster.position.y = -2.5
      rocketRoot.add(booster)

      // Hot Staging Ring (Vented ring)
      const hotStageGeo = new THREE.CylinderGeometry(1.5, 1.5, 1.2, 32)
      const hotStage = new THREE.Mesh(hotStageGeo, darkInterstageMat)
      hotStage.position.y = 4.6
      rocketRoot.add(hotStage)

      // 4 Heavy Grid fins on Booster
      for (let i = 0; i < 4; i++) {
        const finGeo = new THREE.BoxGeometry(0.12, 1.2, 1.0)
        const fin = new THREE.Mesh(finGeo, steelMat)
        const angle = (i * Math.PI) / 2
        fin.position.set(Math.cos(angle) * 1.8, 3.8, Math.sin(angle) * 1.8)
        fin.rotation.y = angle
        rocketRoot.add(fin)
      }

      // Starship Upper Stage
      const shipBodyGeo = new THREE.CylinderGeometry(1.5, 1.5, 7.5, 32)
      const shipBody = new THREE.Mesh(shipBodyGeo, steelMat)
      shipBody.position.y = 9.0
      rocketRoot.add(shipBody)

      // Ceramic Heat Shield on half cylinder
      const tilesGeo = new THREE.CylinderGeometry(1.52, 1.52, 7.5, 32, 1, false, 0, Math.PI)
      const tiles = new THREE.Mesh(tilesGeo, tilesMat)
      tiles.position.y = 9.0
      rocketRoot.add(tiles)

      // Starship Nosecone
      const noseGeo = new THREE.ConeGeometry(1.5, 3.8, 32)
      const nose = new THREE.Mesh(noseGeo, steelMat)
      nose.position.y = 14.65
      rocketRoot.add(nose)

      // Forward Flaps
      const fFlapL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.8, 0.9), steelMat)
      fFlapL.position.set(-1.7, 13.5, 0)
      rocketRoot.add(fFlapL)

      const fFlapR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.8, 0.9), steelMat)
      fFlapR.position.set(1.7, 13.5, 0)
      rocketRoot.add(fFlapR)

      // Aft Flaps
      const aFlapL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.0, 1.6), steelMat)
      aFlapL.position.set(-2.0, 6.2, 0)
      rocketRoot.add(aFlapL)

      const aFlapR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.0, 1.6), steelMat)
      aFlapR.position.set(2.0, 6.2, 0)
      rocketRoot.add(aFlapR)

      // 33 Raptor engine cluster representation
      for (let i = 0; i < 20; i++) {
        const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 0.6, 16), engineMat)
        const angle = (i * Math.PI) / 10
        bell.position.set(Math.cos(angle) * 1.15, -9.3, Math.sin(angle) * 1.15)
        rocketRoot.add(bell)
      }
      for (let i = 0; i < 10; i++) {
        const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 0.6, 16), engineMat)
        const angle = (i * Math.PI) / 5
        bell.position.set(Math.cos(angle) * 0.65, -9.3, Math.sin(angle) * 0.65)
        rocketRoot.add(bell)
      }
      for (let i = 0; i < 3; i++) {
        const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.24, 0.65, 16), engineMat)
        const angle = (i * Math.PI * 2) / 3
        bell.position.set(Math.cos(angle) * 0.25, -9.3, Math.sin(angle) * 0.25)
        rocketRoot.add(bell)
      }

      camera.position.set(0, 3, 30)
    }

    // 6. Interactive Drag Controls
    const onPointerDown = (e) => {
      isDraggingRef.current = true
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY }
    }

    const onPointerMove = (e) => {
      if (!isDraggingRef.current || !rocketGroupRef.current) return
      const deltaX = e.clientX - previousMousePositionRef.current.x
      rotationVelocityRef.current = deltaX * 0.008
      rocketGroupRef.current.rotation.y += rotationVelocityRef.current
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY }
    }

    const onPointerUp = () => {
      isDraggingRef.current = false
    }

    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    // 7. Resize Observer
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

    // 8. Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (rocketGroupRef.current) {
        if (!isDraggingRef.current) {
          if (isAutoSpin && !reducedMotion) {
            rocketGroupRef.current.rotation.y += 0.006
          } else {
            // Apply damping to manual spin
            rotationVelocityRef.current *= 0.95
            rocketGroupRef.current.rotation.y += rotationVelocityRef.current
          }
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
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
      scene.clear()
    }
  }, [rocketType, isAutoSpin, webglSupported])

  if (!webglSupported) {
    return (
      <div
        className="rocket-fallback-image"
        style={{ backgroundImage: `url(${falconFallbackImg})` }}
      />
    )
  }

  return (
    <div className="rocket-canvas-container">
      <div ref={mountRef} className="rocket-webgl-canvas" />

      {/* 3D Interaction Control Overlay */}
      <div className="viewer-controls-overlay">
        <span className="drag-hint">DRAG TO ROTATE 360°</span>
        <button
          type="button"
          className="autospin-btn"
          onClick={() => setIsAutoSpin(prev => !prev)}
          aria-label={isAutoSpin ? 'Pause auto rotation' : 'Resume auto rotation'}
        >
          {isAutoSpin ? 'AUTO-SPIN: ACTIVE' : 'AUTO-SPIN: PAUSED'}
        </button>
      </div>
    </div>
  )
}
