import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/** Cena original inspirada em uma skyline digital. Se WebGL não estiver disponível, o CSS mantém um fundo funcional. */
export default function Universe({ accent, disabled }: { accent: string; disabled: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disabled || !mountRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = mountRef.current
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' }) }
    catch { return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
    el.appendChild(renderer.domElement)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.style.pointerEvents = 'none'

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2('#090d18', 0.013)
    const camera = new THREE.PerspectiveCamera(54, 1, .1, 250)
    const city = new THREE.Group()
    scene.add(city)
    const main = new THREE.Color(accent)
    const concrete = new THREE.MeshStandardMaterial({ color: 0x111e34, metalness: .4, roughness: .7, transparent: true, opacity: .87 })
    const neon = new THREE.LineBasicMaterial({ color: main, transparent: true, opacity: .29 })
    const violet = new THREE.LineBasicMaterial({ color: 0x735cff, transparent: true, opacity: .24 })
    const buildings: THREE.Object3D[] = []
    // Deterministic skyline. No random flashing layout on each refresh.
    for (let i = 0; i < 125; i++) {
      const seed = Math.sin(i * 39.537) * 92837.27
      const r = seed - Math.floor(seed)
      const col = i % 11
      const row = Math.floor(i / 11)
      const x = (col - 5) * 6.4 + Math.sin(i * 2.15) * .6
      const z = 20 - row * 10
      if (Math.abs(x) < 7 && row < 5) continue
      const height = 3.5 + r * 12.5
      const width = 2.1 + (i % 4) * .58
      const geo = new THREE.BoxGeometry(width, height, width)
      const mesh = new THREE.Mesh(geo, concrete)
      mesh.position.set(x, height / 2 - 11, z)
      city.add(mesh)
      buildings.push(mesh)
      if (i % 2 === 0) {
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), i % 3 ? neon : violet)
        edges.position.copy(mesh.position)
        city.add(edges)
        buildings.push(edges)
      }
    }
    const grid = new THREE.GridHelper(220, 70, main, 0x21304e)
    grid.position.y = -11
    const gridMats = Array.isArray(grid.material) ? grid.material : [grid.material]
    gridMats.forEach(m => { m.transparent = true; m.opacity = .23 })
    city.add(grid)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(12, .04, 3, 90),
      new THREE.MeshBasicMaterial({ color: main, transparent: true, opacity: .32 })
    )
    ring.position.set(17, 2, -45)
    ring.rotation.y = .7
    scene.add(ring)
    const stars = new Float32Array(600 * 3)
    for (let i = 0; i < 600; i++) {
      stars[i * 3] = (Math.sin(i * 191.24) * 110)
      stars[i * 3 + 1] = 1 + Math.abs(Math.cos(i * 39.2) * 43)
      stars[i * 3 + 2] = -140 + (i % 85) * 2
    }
    const particles = new THREE.BufferGeometry()
    particles.setAttribute('position', new THREE.BufferAttribute(stars, 3))
    const dots = new THREE.Points(particles, new THREE.PointsMaterial({ size: .18, color: 0x80bfff, transparent: true, opacity: .48, sizeAttenuation: true }))
    scene.add(dots)
    scene.add(new THREE.AmbientLight(0x425786, 1.1))
    const light = new THREE.PointLight(main, 55)
    light.position.set(9, 24, 13)
    scene.add(light)

    let frame = 0
    let mouseX = 0
    let mouseY = 0
    let progress = 0
    let target = 0
    let last = performance.now()
    const size = () => {
      const w = window.innerWidth, h = window.innerHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const onScroll = () => { target = Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) }
    const onMouse = (e: MouseEvent) => { mouseX = (e.clientX / innerWidth - .5); mouseY = (e.clientY / innerHeight - .5) }
    const animate = (time: number) => {
      frame = window.requestAnimationFrame(animate)
      if (document.hidden) { last = time; return }
      const dt = Math.min((time - last) / 1000, .08)
      last = time
      progress += (target - progress) * Math.min(1, dt * 2.7)
      const mobile = innerWidth < 800
      camera.position.set((mobile ? 3 : 18) + mouseX * 1.6 - progress * 5, 12 - progress * 2.7 - mouseY, 40 - progress * 57)
      camera.lookAt((mobile ? 0 : 1) + mouseX * 2, -3, -36 - progress * 48)
      ring.rotation.z += dt * .045
      renderer.render(scene, camera)
    }
    size(); onScroll(); frame = requestAnimationFrame(animate)
    window.addEventListener('resize', size)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', size)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      for (const o of buildings) if (o instanceof THREE.LineSegments) o.geometry.dispose()
      for (const o of buildings) if (o instanceof THREE.Mesh) o.geometry.dispose()
      grid.geometry.dispose(); gridMats.forEach(m => m.dispose())
      ring.geometry.dispose(); (ring.material as THREE.Material).dispose()
      particles.dispose(); (dots.material as THREE.Material).dispose()
      concrete.dispose(); neon.dispose(); violet.dispose()
      renderer.dispose(); renderer.domElement.remove()
    }
  }, [accent, disabled])

  return <div ref={mountRef} className="universe" aria-hidden="true" />
}
