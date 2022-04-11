import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function loadGLTF(manager, assets, domain = null, draco = null) {
  let fileLoader = new GLTFLoader(manager)
  if(draco) fileLoader.setDRACOLoader( draco )

  for (let asset of assets) {
    if (!asset.loaded) {
      let filePath = (domain) ? `${domain}/${asset.path}` : `./assets/${asset.path}`
      fileLoader.load(filePath, function ( data ) {
        asset.loaded = true
        asset.asset = data
      })
    }
  }
  return assets
}

export function loadTEX(manager, assets, domain = null) {
  let fileLoader = new THREE.TextureLoader(manager)
  for (let asset of assets) {
    if (!asset.loaded) {
      let filePath = (domain) ? `${domain}/${asset.path}` : `./assets/${asset.path}`
      fileLoader.load(filePath, function ( data ) {
        asset.loaded = true
        asset.asset = data
      })
    }
  }
  return assets
}