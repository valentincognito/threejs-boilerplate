import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(1, 1, 1),
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "backdrop.mat": {
    "type": new THREE.MeshPhongMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
  },
  "lego.mat": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Bandit Texture_Low Poly.png",
    "roughness": 0,
    "clearcoat": 1,
    "flipY": false,
  },
}