"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import { useRef, useMemo, useState, useEffect, useCallback } from "react"
import * as THREE from "three"
import { landDots } from "@/data/land-dots"

export interface GlobeCityPoint {
  slug: string
  name: string
  country: string
  lat: number
  lng: number
}

// All tweakable values for the globe scene.
// Build-time: dots.density requires re-running `node scripts/generate-land-dots.mjs`
const CONFIG = {
  globe: {
    radius: 1,
    tilt: 0.15,
    initialRotationY: Math.PI,
  },

  camera: {
    z: 3.6,
    fov: 45,
  },

  dots: {
    // Build-time only: run `node scripts/generate-land-dots.mjs` after changing
    density: 160,
    size: 1.3,
    color: "#b0b0b0",
    opacity: 0.7,
  },

  cityDot: {
    radius: 0.025,
    color: "#555555",
    hoverColor: "#222222",
    glowRadius: 0.04,
    glowColor: "#888888",
    glowOpacity: 0.2,
    glowHoverOpacity: 0.5,
    hoverScale: 1.8,
    glowHoverScale: 2.8,
    pulseSpeed: 2,
    pulseAmount: 0.2,
    lerpSpeed: 0.12,
    surfaceOffset: 1.005,
    tooltipOffsetY: 0.08,
  },

  controls: {
    rotateSpeed: 0.4,
    autoRotateSpeed: 0.4,
    dampingFactor: 0.05,
  },
} as const

const GLOBE_RADIUS = CONFIG.globe.radius

function latLngToVector3(
  lat: number,
  lng: number,
  radius: number
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

const DOT_VS = `
  uniform float uSize;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uSize * (10.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const DOT_FS = `
  uniform vec3 uColor;
  uniform float uOpacity;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.05, d) * uOpacity;
    gl_FragColor = vec4(uColor, a);
  }
`

function GlobeDots() {
  const geo = useMemo(() => {
    const pos: number[] = []
    for (const [lat, lng] of landDots) {
      const v = latLngToVector3(lat, lng, GLOBE_RADIUS)
      pos.push(v.x, v.y, v.z)
    }

    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
    return g
  }, [])

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uSize: { value: CONFIG.dots.size },
          uColor: { value: new THREE.Color(CONFIG.dots.color) },
          uOpacity: { value: CONFIG.dots.opacity },
        },
        vertexShader: DOT_VS,
        fragmentShader: DOT_FS,
        transparent: true,
        depthWrite: false,
      }),
    []
  )

  return <points geometry={geo} material={mat} renderOrder={1} />
}

function GlobeCore({
  onEnter,
  onLeave,
}: {
  onEnter: () => void
  onLeave: () => void
}) {
  return (
    <mesh
      renderOrder={0}
      onPointerMove={(e) => e.stopPropagation()}
      onPointerEnter={(e) => {
        e.stopPropagation()
        onEnter()
      }}
      onPointerLeave={onLeave}
    >
      <sphereGeometry args={[GLOBE_RADIUS * 0.99, 128, 128]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  )
}

function CityDot({
  city,
  hoveredCity,
  onHover,
  onCityClick,
}: {
  city: GlobeCityPoint
  hoveredCity: string | null
  onHover: (slug: string | null) => void
  onCityClick: (slug: string) => void
}) {
  const dotRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const isHovered = hoveredCity === city.slug
  const target = useRef(new THREE.Vector3(1, 1, 1))

  const pos = useMemo(
    () =>
      latLngToVector3(
        city.lat,
        city.lng,
        GLOBE_RADIUS * CONFIG.cityDot.surfaceOffset
      ),
    [city.lat, city.lng]
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (glowRef.current) {
      const pulse =
        1 + Math.sin(t * CONFIG.cityDot.pulseSpeed) * CONFIG.cityDot.pulseAmount
      glowRef.current.scale.setScalar(
        isHovered ? CONFIG.cityDot.glowHoverScale : pulse
      )
    }
    if (dotRef.current) {
      const s = isHovered ? CONFIG.cityDot.hoverScale : 1
      target.current.set(s, s, s)
      dotRef.current.scale.lerp(target.current, CONFIG.cityDot.lerpSpeed)
    }
  })

  return (
    <group position={pos}>
      <mesh
        ref={dotRef}
        renderOrder={2}
        onPointerEnter={(e) => {
          e.stopPropagation()
          onHover(city.slug)
        }}
        onPointerLeave={() => {
          onHover(null)
        }}
        onClick={(e) => {
          e.stopPropagation()
          onCityClick(city.slug)
        }}
      >
        <sphereGeometry args={[CONFIG.cityDot.radius, 16, 16]} />
        <meshBasicMaterial
          color={isHovered ? CONFIG.cityDot.hoverColor : CONFIG.cityDot.color}
        />
      </mesh>

      <mesh ref={glowRef} renderOrder={2}>
        <sphereGeometry args={[CONFIG.cityDot.glowRadius, 16, 16]} />
        <meshBasicMaterial
          color={CONFIG.cityDot.glowColor}
          transparent
          opacity={
            isHovered
              ? CONFIG.cityDot.glowHoverOpacity
              : CONFIG.cityDot.glowOpacity
          }
        />
      </mesh>

      {isHovered && (
        <Html
          center
          position={[0, CONFIG.cityDot.tooltipOffsetY, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 8,
              padding: "6px 12px",
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 500,
                color: "#1a1a1a",
              }}
            >
              {city.name}
            </p>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: 11,
                color: "#777777",
              }}
            >
              {city.country}
            </p>
          </div>
        </Html>
      )}
    </group>
  )
}

function useGlobeCursor(
  controlsRef: React.RefObject<{
    addEventListener: (e: string, fn: () => void) => void
    removeEventListener: (e: string, fn: () => void) => void
  } | null>,
  hoveredCity: string | null,
  isOverGlobe: boolean,
  isDragging: boolean,
  setIsDragging: (v: boolean) => void
) {
  const gl = useThree((state) => state.gl)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    canvasRef.current = gl.domElement
  }, [gl])
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    if (hoveredCity) {
      canvas.style.cursor = "pointer"
    } else if (isDragging) {
      canvas.style.cursor = "grabbing"
    } else if (isOverGlobe) {
      canvas.style.cursor = "grab"
    } else {
      canvas.style.cursor = "default"
    }
  }, [hoveredCity, isDragging, isOverGlobe])
  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) {
      return
    }
    const onStart = () => setIsDragging(true)
    const onEnd = () => setIsDragging(false)
    controls.addEventListener("start", onStart)
    controls.addEventListener("end", onEnd)
    return () => {
      controls.removeEventListener("start", onStart)
      controls.removeEventListener("end", onEnd)
    }
  }, [controlsRef, setIsDragging])
}

function Scene({
  cities,
  onCityClick,
}: {
  cities: GlobeCityPoint[]
  onCityClick: (slug: string) => void
}) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [isOverGlobe, setIsOverGlobe] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null)
  useGlobeCursor(
    controlsRef,
    hoveredCity,
    isOverGlobe,
    isDragging,
    setIsDragging
  )
  const handleGlobeEnter = useCallback(() => setIsOverGlobe(true), [])
  const handleGlobeLeave = useCallback(() => setIsOverGlobe(false), [])

  return (
    <>
      <group rotation={[CONFIG.globe.tilt, CONFIG.globe.initialRotationY, 0]}>
        <GlobeCore onEnter={handleGlobeEnter} onLeave={handleGlobeLeave} />
        <GlobeDots />
        {cities.map((city) => (
          <CityDot
            key={city.slug}
            city={city}
            hoveredCity={hoveredCity}
            onHover={setHoveredCity}
            onCityClick={onCityClick}
          />
        ))}
      </group>
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={isOverGlobe || isDragging}
        rotateSpeed={CONFIG.controls.rotateSpeed}
        autoRotate
        autoRotateSpeed={CONFIG.controls.autoRotateSpeed}
        enableDamping
        dampingFactor={CONFIG.controls.dampingFactor}
      />
    </>
  )
}

export default function GlobeCanvas({
  cities,
  onCityClick,
}: {
  cities: GlobeCityPoint[]
  onCityClick: (slug: string) => void
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, CONFIG.camera.z], fov: CONFIG.camera.fov }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene cities={cities} onCityClick={onCityClick} />
    </Canvas>
  )
}
