"use client"

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

interface Box3DProps {
  isHovered: boolean
  boxOpening: boolean
  boxDisappearing: boolean
}

function Box3DModel({ isHovered, boxOpening, boxDisappearing }: Box3DProps) {
  const boxRef = useRef<THREE.Group>(null)
  const lidRef = useRef<THREE.Mesh>(null)
  const frontGroupRef = useRef<THREE.Group>(null)
  const backGroupRef = useRef<THREE.Group>(null)
  const leftGroupRef = useRef<THREE.Group>(null)
  const rightGroupRef = useRef<THREE.Group>(null)
  
  // Load textures
  const boxTexture = useLoader(TextureLoader, '/box.png')
  const lidTexture = useLoader(TextureLoader, '/lid.png')

  // Animation state
  const [rotation, setRotation] = useState(0)
  const [openProgress, setOpenProgress] = useState(0) // 0..1 opening of all flaps
  const [hoverPhase, setHoverPhase] = useState(0)

  // When a new open sequence starts, reset lid and scale so animation plays from start
  useEffect(() => {
    if (boxOpening) {
      setOpenProgress(0)
      if (boxRef.current) {
        boxRef.current.scale.setScalar(1)
      }
    }
    // Ensure scale is restored when not disappearing
    if (!boxDisappearing && boxRef.current) {
      boxRef.current.scale.setScalar(1)
    }
  }, [boxOpening, boxDisappearing])

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

  useFrame((state, delta) => {
    if (!boxRef.current) return

    // Idle rotation - smooth continuous rotation
    if (!boxOpening && !boxDisappearing) {
      setRotation((prev) => prev + delta * 0.5)
      boxRef.current.rotation.y = rotation
      boxRef.current.rotation.x = Math.sin(rotation * 0.5) * 0.1
    }

    // Lid hover animation
    if (isHovered && lidRef.current && !boxOpening && !boxDisappearing) {
      setHoverPhase((prev) => prev + delta * 4)
      const wobble = Math.sin(hoverPhase) * 0.15 + Math.sin(hoverPhase * 1.5) * 0.08
      lidRef.current.rotation.x = wobble
    } else if (lidRef.current) {
      lidRef.current.rotation.x = 0
      setHoverPhase(0)
    }

    // Opening animation: flaps fold down, lid rises
    if (boxOpening) {
      const next = Math.min(openProgress + delta * 0.8, 1)
      setOpenProgress(next)
      const t = easeOutCubic(next)

      // Flaps rotate around their bottom hinges, down to lay flat on ground
      if (frontGroupRef.current) frontGroupRef.current.rotation.x = -t * (Math.PI / 2)
      if (backGroupRef.current) backGroupRef.current.rotation.x = t * (Math.PI / 2)
      if (leftGroupRef.current) leftGroupRef.current.rotation.z = t * (Math.PI / 2)
      if (rightGroupRef.current) rightGroupRef.current.rotation.z = -t * (Math.PI / 2)

      if (lidRef.current) {
        lidRef.current.position.y = 1.15 + t * 1.0 // raise lid up
        lidRef.current.rotation.x = -t * 0.6 // slight tilt back
      }
    }

    // Disappearing animation
    if (boxDisappearing && boxRef.current) {
      boxRef.current.scale.setScalar(Math.max(0, boxRef.current.scale.x - delta * 2))
      boxRef.current.rotation.y += delta * 4
    }
  })

  return (
    <group ref={boxRef}>
      {/* Base */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[2.05, 0.2, 2.05]} />
        <meshStandardMaterial 
          map={boxTexture} 
          metalness={0.1}
          roughness={0.6}
        />
      </mesh>

      {/* Front flap - hinge at y=-1, z=1 */}
      <group ref={frontGroupRef} position={[0, -1, 1]} rotation={[0, 0, 0]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[2.05, 2.0, 0.2]} />
          <meshStandardMaterial map={boxTexture} metalness={0.1} roughness={0.6} />
        </mesh>
      </group>

      {/* Back flap - hinge at y=-1, z=-1 */}
      <group ref={backGroupRef} position={[0, -1, -1]} rotation={[0, 0, 0]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[2.05, 2.0, 0.2]} />
          <meshStandardMaterial map={boxTexture} metalness={0.1} roughness={0.6} />
        </mesh>
      </group>

      {/* Left flap - hinge at y=-1, x=-1 */}
      <group ref={leftGroupRef} position={[-1, -1, 0]} rotation={[0, 0, 0]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[0.2, 2.0, 2.05]} />
          <meshStandardMaterial map={boxTexture} metalness={0.1} roughness={0.6} />
        </mesh>
      </group>

      {/* Right flap - hinge at y=-1, x=1 */}
      <group ref={rightGroupRef} position={[1, -1, 0]} rotation={[0, 0, 0]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[0.2, 2.0, 2.05]} />
          <meshStandardMaterial map={boxTexture} metalness={0.1} roughness={0.6} />
        </mesh>
      </group>

      {/* Lid - raises up */}
      <mesh ref={lidRef} position={[0, 1.15, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.05, 0.3, 2.05]} />
        <meshStandardMaterial map={lidTexture} metalness={0.1} roughness={0.6} />
      </mesh>
    </group>
  )
}

export function Box3D({ isHovered, boxOpening, boxDisappearing }: Box3DProps) {
  return (
    <div className="w-[240px] h-[240px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        <pointLight position={[0, 10, 0]} intensity={0.3} />
        
        <Box3DModel 
          isHovered={isHovered}
          boxOpening={boxOpening}
          boxDisappearing={boxDisappearing}
        />
      </Canvas>
    </div>
  )
}

export default Box3D

