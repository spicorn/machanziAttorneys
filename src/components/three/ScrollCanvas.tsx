import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

type ScrollCanvasProps = {
  className?: string
}

/**
 * Abstract gold “balance” form  scroll-scrubbed rotation (steven/lando energy, brand palette).
 */
export function ScrollCanvas({ className }: ScrollCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    ensureGsap()

    const width = mount.clientWidth || 420
    const height = mount.clientHeight || 420

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 0.15, 4.2)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const gold = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c5a35a'),
      metalness: 0.82,
      roughness: 0.28,
    })
    const deep = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0a1b33'),
      metalness: 0.35,
      roughness: 0.55,
    })

    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.2, 24), gold)
    beam.position.y = 0.2
    group.add(beam)

    const arm = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 0.12), gold)
    arm.position.y = 1.15
    group.add(arm)

    const dishGeo = new THREE.CylinderGeometry(0.42, 0.48, 0.08, 32)
    const leftDish = new THREE.Mesh(dishGeo, deep)
    leftDish.position.set(-1.05, 0.55, 0)
    const rightDish = new THREE.Mesh(dishGeo, deep)
    rightDish.position.set(1.05, 0.55, 0)
    group.add(leftDish, rightDish)

    const leftChain = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 10), gold)
    leftChain.position.set(-1.05, 0.85, 0)
    const rightChain = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 10), gold)
    rightChain.position.set(1.05, 0.85, 0)
    group.add(leftChain, rightChain)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.035, 16, 100),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#e0c37a'),
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: 0.55,
      }),
    )
    ring.rotation.x = Math.PI / 2.4
    group.add(ring)

    const key = new THREE.DirectionalLight(0xfff2d6, 2.2)
    key.position.set(3, 4, 5)
    scene.add(key)
    scene.add(new THREE.AmbientLight(0xb8c4d4, 0.55))
    const fill = new THREE.DirectionalLight(0xc5a35a, 0.85)
    fill.position.set(-4, 1, -2)
    scene.add(fill)

    const state = { progress: 0, idle: 0 }
    let frame = 0
    let disposed = false

    const render = () => {
      if (disposed) return
      state.idle += 0.008
      const tilt = Math.sin(state.progress * Math.PI * 2) * 0.22
      arm.rotation.z = tilt
      leftDish.position.y = 0.55 + tilt * 0.9
      rightDish.position.y = 0.55 - tilt * 0.9
      leftChain.position.y = 0.85 + tilt * 0.45
      rightChain.position.y = 0.85 - tilt * 0.45
      group.rotation.y = state.progress * Math.PI * 1.25 + (reduced ? 0 : state.idle * 0.15)
      group.rotation.x = 0.12 + state.progress * 0.25
      ring.rotation.z = state.progress * Math.PI
      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)

    let trigger: ScrollTrigger | undefined
    if (!reduced) {
      trigger = ScrollTrigger.create({
        trigger: mount,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.1,
        onUpdate: (self) => {
          state.progress = self.progress
        },
      })
    }

    const onResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      trigger?.kill()
      window.removeEventListener('resize', onResize)
      gsap.killTweensOf(state)
      renderer.dispose()
      gold.dispose()
      deep.dispose()
      dishGeo.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [reduced])

  return (
    <div
      ref={mountRef}
      className={cn('h-full w-full [&_canvas]:h-full [&_canvas]:w-full', className)}
      aria-hidden
    />
  )
}
