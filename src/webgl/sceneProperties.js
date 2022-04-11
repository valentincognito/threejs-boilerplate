import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(1, 1, 1),
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}
export const MATERIALS = {
  "lego.mat": {
    "type": "MeshBasicMaterial",
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Bandit Texture_Low Poly.png",
    "flipY": true,
  },
}