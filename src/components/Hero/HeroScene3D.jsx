import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { isWebGLAvailable, prefersReducedMotion } from '../../utils/webglSupport'
import heroFallbackImg from '../../assets/launch.jpg'

export default function HeroScene3D() {
  const mountRef = useRef(null)
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglSupported(false)
      return
    }

    const container = mountRef.current
    if (!container) return

    const reducedMotion = prefersReducedMotion()
    let animationFrameId
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x020205, 0.0035)

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 48)

    // 2. High-performance WebGL Renderer
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

    // 3. Ambient & Directional Space Lighting
    const ambientLight = new THREE.AmbientLight(0x223355, 1.2)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xffffff, 3.2)
    sunLight.position.set(50, 40, 30)
    scene.add(sunLight)

    const earthRimLight = new THREE.DirectionalLight(0x4488ff, 2.5)
    earthRimLight.position.set(-40, -20, -10)
    scene.add(earthRimLight)

    // 4. Multi-Layer Dynamic Starfield
    const starCount = 3200
    const starGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)
    const starScales = new Float32Array(starCount)

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3
      starPositions[idx] = (Math.random() - 0.5) * 350
      starPositions[idx + 1] = (Math.random() - 0.5) * 350
      starPositions[idx + 2] = (Math.random() - 0.5) * 350

      // Color tints: cold blue-white, pure white, faint amber
      const tint = Math.random()
      if (tint > 0.8) {
        starColors[idx] = 0.7; starColors[idx + 1] = 0.85; starColors[idx + 2] = 1.0 // Ice Blue
      } else if (tint > 0.6) {
        starColors[idx] = 1.0; starColors[idx + 1] = 0.92; starColors[idx + 2] = 0.8 // Solar warm
      } else {
        starColors[idx] = 0.95; starColors[idx + 1] = 0.95; starColors[idx + 2] = 0.95 // White
      }
      starScales[i] = Math.random() * 2.0 + 0.5
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3))

    const starMaterial = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    })
    const starField = new THREE.Points(starGeometry, starMaterial)
    scene.add(starField)

    // 5. 3D Earth Curvature Horizon in Background
    const earthGroup = new THREE.Group()
    const earthRadius = 45
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64)

    // Procedural Earth surface canvas texture
    const earthCanvas = document.createElement('canvas')
    earthCanvas.width = 1024
    earthCanvas.height = 512
    const ctx = earthCanvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 1024, 512)
    gradient.addColorStop(0, '#020b1c')
    gradient.addColorStop(0.3, '#041d40')
    gradient.addColorStop(0.6, '#062858')
    gradient.addColorStop(1, '#020a17')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1024, 512)

    // Continents silhouette & cloud bands
    ctx.fillStyle = '#0a3022'
    for (let c = 0; c < 24; c++) {
      ctx.beginPath()
      ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 80 + 30, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = 'rgba(255, 255, 255, 0.22)'
    for (let w = 0; w < 16; w++) {
      ctx.fillRect(0, Math.random() * 512, 1024, Math.random() * 30 + 10)
    }

    const earthTexture = new THREE.CanvasTexture(earthCanvas)
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.7,
      metalness: 0.1,
    })
    const earthMesh = new THREE.Mesh(earthGeo, earthMat)
    earthGroup.add(earthMesh)

    // Atmospheric Glow Shell (Fresnel effect)
    const atmosGeo = new THREE.SphereGeometry(earthRadius * 1.025, 48, 48)
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x3d85c6,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat)
    earthGroup.add(atmosMesh)

    earthGroup.position.set(16, -42, -18)
    scene.add(earthGroup)

    // 6. 3D Procedural Starship Model in Orbital Glide
    const rocketGroup = new THREE.Group()

    // Stainless steel metallic material
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8d8de,
      metalness: 0.92,
      roughness: 0.22,
    })

    const blackTilesMaterial = new THREE.MeshStandardMaterial({
      color: 0x111115,
      metalness: 0.1,
      roughness: 0.85,
    })

    // Fuselage cylinder
    const bodyGeo = new THREE.CylinderGeometry(1.6, 1.6, 14, 32)
    const bodyMesh = new THREE.Mesh(bodyGeo, steelMaterial)
    bodyMesh.position.y = 0
    rocketGroup.add(bodyMesh)

    // Nosecone cone
    const noseGeo = new THREE.ConeGeometry(1.6, 4.2, 32)
    const noseMesh = new THREE.Mesh(noseGeo, steelMaterial)
    noseMesh.position.y = 9.1
    rocketGroup.add(noseMesh)

    // Ceramic heat shield tiles layer on windward side
    const shieldGeo = new THREE.CylinderGeometry(1.62, 1.62, 14, 32, 1, false, 0, Math.PI)
    const shieldMesh = new THREE.Mesh(shieldGeo, blackTilesMaterial)
    shieldMesh.position.y = 0
    rocketGroup.add(shieldMesh)

    // Forward Aerodynamic Flaps (2x)
    const flapGeo = new THREE.BoxGeometry(0.12, 2.4, 1.2)
    const forwardFlapL = new THREE.Mesh(flapGeo, steelMaterial)
    forwardFlapL.position.set(-1.8, 8.2, 0)
    forwardFlapL.rotation.z = 0.2
    rocketGroup.add(forwardFlapL)

    const forwardFlapR = new THREE.Mesh(flapGeo, steelMaterial)
    forwardFlapR.position.set(1.8, 8.2, 0)
    forwardFlapR.rotation.z = -0.2
    rocketGroup.add(forwardFlapR)

    // Aft Aerodynamic Flaps (2x)
    const aftFlapGeo = new THREE.BoxGeometry(0.14, 3.8, 2.2)
    const aftFlapL = new THREE.Mesh(aftFlapGeo, steelMaterial)
    aftFlapL.position.set(-2.2, -4.5, 0)
    aftFlapL.rotation.z = 0.15
    rocketGroup.add(aftFlapL)

    const aftFlapR = new THREE.Mesh(aftFlapGeo, steelMaterial)
    aftFlapR.position.set(2.2, -4.5, 0)
    aftFlapR.rotation.z = -0.15
    rocketGroup.add(aftFlapR)

    // Raptor Engine Cluster Bells (3 Sea-level + 3 Vacuum bells)
    const engineGeo = new THREE.CylinderGeometry(0.35, 0.55, 1.2, 16)
    const engineMat = new THREE.MeshStandardMaterial({
      color: 0x44444a,
      metalness: 0.8,
      roughness: 0.3,
    })

    const enginePositions = [
      [-0.45, -7.5, 0],
      [0.45, -7.5, 0],
      [0, -7.5, 0.6],
      [0, -7.5, -0.6],
    ]
    enginePositions.forEach(([x, y, z]) => {
      const bell = new THREE.Mesh(engineGeo, engineMat)
      bell.position.set(x, y, z)
      rocketGroup.add(bell)
    })

    // Thruster engine glow aura
    const glowGeo = new THREE.SphereGeometry(0.9, 16, 16)
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00c3ff,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    })
    const glowMesh = new THREE.Mesh(glowGeo, glowMat)
    glowMesh.position.set(0, -8.2, 0)
    rocketGroup.add(glowMesh)

    // Position rocket nicely in frame (right side of viewport on desktop)
    rocketGroup.position.set(12, 1, 6)
    rocketGroup.rotation.set(-0.35, 0.45, 0.3)
    scene.add(rocketGroup)

    // 7. Mouse Parallax Handler
    const handleMouseMove = (e) => {
      if (reducedMotion) return
      const { innerWidth, innerHeight } = window
      targetMouseX = ((e.clientX / innerWidth) - 0.5) * 2
      targetMouseY = ((e.clientY / innerHeight) - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // 8. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Adjust rocket position for mobile screens
      if (width < 768) {
        rocketGroup.position.set(0, 3, -4)
        rocketGroup.scale.set(0.68, 0.68, 0.68)
        earthGroup.position.set(0, -44, -20)
      } else {
        rocketGroup.position.set(12, 1, 6)
        rocketGroup.scale.set(1, 1, 1)
        earthGroup.position.set(16, -42, -18)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    // 9. 60 FPS Render Loop with Smooth Camera Lerp
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Smooth mouse parallax interpolation
      if (!reducedMotion) {
        mouseX += (targetMouseX - mouseX) * 0.04
        mouseY += (targetMouseY - mouseY) * 0.04
        camera.position.x = mouseX * 5
        camera.position.y = -mouseY * 3.5
        camera.lookAt(0, 0, 0)
      }

      // Continuous subtle orbital rotations
      starField.rotation.y = time * 0.008
      starField.rotation.x = time * 0.003
      earthGroup.rotation.y = time * 0.015

      // Rocket subtle orbital attitude drift & engine pulse
      rocketGroup.position.y += Math.sin(time * 1.5) * 0.006
      rocketGroup.rotation.y = 0.45 + Math.sin(time * 0.8) * 0.04
      glowMesh.scale.setScalar(0.9 + Math.sin(time * 12) * 0.15)

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starGeometry.dispose()
      starMaterial.dispose()
      earthGeo.dispose()
      earthMat.dispose()
      earthTexture.dispose()
      atmosGeo.dispose()
      atmosMat.dispose()
      bodyGeo.dispose()
      noseGeo.dispose()
      steelMaterial.dispose()
      blackTilesMaterial.dispose()
    }
  }, [])

  if (!webglSupported) {
    return (
      <div
        className="hero-fallback-bg"
        style={{ backgroundImage: `url(${heroFallbackImg})` }}
      >
        <div className="hero-fallback-gradient" />
      </div>
    )
  }

  return <div ref={mountRef} className="hero-3d-canvas-wrap" aria-hidden="true" />
}
