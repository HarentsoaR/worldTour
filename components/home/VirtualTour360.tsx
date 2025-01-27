import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Loader } from "@/components/ui/loading/loader"

interface Location {
  id: string
  name: string
  type: "destination" | "hotel" | "restaurant"
  imageUrl: string
  description: string
}

const locations: Location[] = [
  {
    id: "1",
    name: "Eiffel Tower, Paris",
    type: "destination",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Eiffel_Tower_as_seen_from_the_Champ_de_Mars%2C_Paris_May_2014.jpg",
    description: "Experience the iconic Eiffel Tower in the heart of Paris.",
  },
  {
    id: "2",
    name: "Melati Resort & Spa",
    type: "hotel",
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/56561088.jpg?k=c0b0870221717a7b276f909aee16278a28452488a96ac66caef941b819da1f61&o=&hp=1",
    description: "Relax in luxury at this beachfront resort with stunning ocean views.",
  },
  {
    id: "3",
    name: "Le Petit Bistro",
    type: "restaurant",
    imageUrl: "/Hotel.jpg",
    description: "Savor authentic French cuisine in a charming Parisian bistro setting.",
  },
]

const createSphere = (
  scene: THREE.Scene,
  textureLoader: THREE.TextureLoader,
  imageUrl: string,
): Promise<THREE.Mesh> => {
  return new Promise((resolve) => {
    textureLoader.load(imageUrl, (texture) => {
      const sphereGeometry = new THREE.SphereGeometry(500, 60, 40)
      const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide })
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      scene.add(sphere)
      resolve(sphere)
    })
  })
}

export function VirtualTour360() {
  const [currentLocation, setCurrentLocation] = useState<Location>(locations[0])
  const [isLoading, setIsLoading] = useState(true)
  const mountRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    )
    cameraRef.current = camera
    camera.position.set(0, 0, 0.1)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererRef.current = renderer
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    mountRef.current.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controlsRef.current = controls
    controls.enableZoom = false
    controls.enablePan = false
    controls.rotateSpeed = -0.25

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      mountRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    if (!sceneRef.current) return

    const textureLoader = new THREE.TextureLoader()
    setIsLoading(true)

    createSphere(sceneRef.current, textureLoader, currentLocation.imageUrl).then(() => {
      setIsLoading(false)
    })

    return () => {
      if (sceneRef.current) {
        while (sceneRef.current.children.length > 0) {
          sceneRef.current.remove(sceneRef.current.children[0])
        }
      }
    }
  }, [currentLocation])

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center my-8 text-gray-900 dark:text-gray-100">Virtual 360° Tour</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{currentLocation.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 capitalize">{currentLocation.type}</p>
        </div>
        <div className="relative w-full h-[400px] md:h-[600px] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
          <div ref={mountRef} className="w-full h-full" />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-600 bg-opacity-75 dark:bg-opacity-75">
              <Loader className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-gray-700 dark:text-gray-300">{currentLocation.description}</p>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Explore Other Locations:</h4>
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setCurrentLocation(location)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  currentLocation.id === location.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {location.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

