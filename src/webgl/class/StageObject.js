import * as THREE from 'three'
import { STATE } from '../global.js'

export class StageObject{
  constructor(_options){
    this.original = _options.originalObject
    this.clone = _options.clonedObject
    this.name = _options.objectName
    this.definition = _options.definition
    this.clone.position.copy( this.definition.PROPERTIES.position )
    this.texturesPath = `${STATE.ASSET_DOMAIN_PATH}/textures/${this.name}/${_options.definition.PROPERTIES.texturesQuality}/`

    this.loadedTextures = {
      map: {},
      envMap: {},
      normalMap: {},
      bumpMap: {},
      alphaMap: {},
      metalnessMap: {},
      specularMap: {},
      displacementMap: {},
      emissiveMap: {},
    }

    this.loadingManagerLoaded = false
    this.pendingTexturesUpdated = false
    this.needToBeUpdated = []

    this.LOADING_MANAGER = new THREE.LoadingManager()
    this.LOADING_MANAGER.onProgress = function ( url, itemsLoaded, itemsTotal ) {
      if(STATE.WEBGL.isDebug)
        console.log( `%cTextures loading: ${url} (${itemsLoaded}/${itemsTotal})`,'color:#787878;')
    }
    this.LOADING_MANAGER.onError = function ( url ) {console.log( 'There was an error loading ' + url )}

    this.LOADING_MANAGER.onLoad = () => {
      this.loadingManagerLoaded = true
      if (!this.pendingTexturesUpdated) {
        this.updatePendingTexures()
      }
    }

    this.textureLoader = new THREE.TextureLoader(this.LOADING_MANAGER)

    this.updateProperties()
    this.updateMaterial(this.clone, this.name, true)
  }

  updatePendingTexures(){
    this.pendingTexturesUpdated = true
    for (let mesh of this.needToBeUpdated){
      mesh.mesh.material.dispose()
      mesh.mesh.material = mesh.clonedMaterial
      mesh.clonedMaterial.dispose()
    }
    this.needToBeUpdated = []
  }

  toggleVisibility(_toggle){
    this.clone.visible = _toggle
  }

  updateProperties(){
    this.clone.scale.copy( this.definition.PROPERTIES.scale )
    this.clone.position.copy( this.definition.PROPERTIES.position )
    this.clone.rotation.copy( this.definition.PROPERTIES.rotation )
  }

  async updateMaterial(object, objectName, loadTextures = false){
    this.pendingTexturesUpdated = false

    object.traverse( async child => {
      if( child.material ){
        if (!this.definition.MATERIALS[child.material.name]) return

        let cloneMat = child.material.clone()

        if (this.definition.MATERIALS[cloneMat.name].type == 'MeshPhongMaterial')
          cloneMat = new THREE.MeshPhongMaterial()
        else if (this.definition.MATERIALS[cloneMat.name].type == 'MeshBasicMaterial')
          cloneMat = new THREE.MeshBasicMaterial()
        else if (this.definition.MATERIALS[cloneMat.name].type == 'MeshLambertMaterial')
          cloneMat = new THREE.MeshLambertMaterial()
        else if (this.definition.MATERIALS[cloneMat.name].type == 'MeshPhysicalMaterial')
          cloneMat = new THREE.MeshPhysicalMaterial()
        else if (this.definition.MATERIALS[cloneMat.name].type == 'MeshStandardMaterial')
          cloneMat = new THREE.MeshStandardMaterial()

        //common values
        cloneMat.name = child.material.name

        //textures
        const MAPS = ['map', 'specularMap', 'alphaMap', 'displacementMap', 'normalMap', 'bumpMap', 'emissiveMap', 'envMap']
        if(loadTextures){
          for(let map of MAPS){
            if(this.definition.MATERIALS[cloneMat.name][map] != undefined){
              let key = child.material.name
              let file = this.definition.MATERIALS[cloneMat.name][map]

              if (this.loadedTextures[map][key]) {
                //get texture from class memory
                cloneMat[map] = this.loadedTextures[map][key]
              }else{
                this.loadingManagerLoaded = false
                let mapText = this.textureLoader.load( this.texturesPath + file )
                mapText.encoding = THREE.LinearEncoding
                mapText.mapping = THREE.EquirectangularReflectionMapping
                cloneMat[map] = mapText

                //keep texture in the class memory
                this.loadedTextures[map][key] = mapText
              }
            }
          }
        }

        const CHANNELS = [
          'transparent',
          'opacity',
          'shininess',
          'aoMapIntensity',
          'roughness',
          'metalness',
          'clearcoat',
          'clearcoatRoughness',
          'envMapIntensity',
          'reflectivity',
          'refractionRatio',
          'transmission',
          'thickness',
          'attenuationDistance',
          'attenuationColor',
          'blending',
          'bumpScale',
          'emissiveIntensity',
          'depthTest',
          'depthWrite',
          'alphaTest',
          'bumpScale'
        ]

        //colors channels
        if(this.definition.MATERIALS[cloneMat.name].color != undefined)
          cloneMat.color = new THREE.Color(this.definition.MATERIALS[cloneMat.name].color)
        if(this.definition.MATERIALS[cloneMat.name].specular != undefined)
          cloneMat.specular = new THREE.Color(this.definition.MATERIALS[cloneMat.name].specular)
        if(this.definition.MATERIALS[cloneMat.name].emissive != undefined)
          cloneMat.emissive = new THREE.Color(this.definition.MATERIALS[cloneMat.name].emissive)

        for (let channel of CHANNELS) {
          if(this.definition.MATERIALS[cloneMat.name][channel] != undefined)
            cloneMat[channel] = this.definition.MATERIALS[cloneMat.name][channel]
        }

        this.needToBeUpdated.push({mesh: child, clonedMaterial: cloneMat})

        if(STATE.WEBGL.isDebug) if(cloneMat.name == "lego.mat") console.log(cloneMat)
      }
    })

    if(!this.pendingTexturesUpdated && this.loadingManagerLoaded){
      this.updatePendingTexures()
    }
  }
}
