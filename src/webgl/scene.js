import * as THREE from 'three'
import { StageObject } from './class/StageObject.js'
import { STATE, ASSETS } from './global.js'

import * as SCENE_PROPERTIES from './sceneProperties.js'

export function loadStage( sceneName ) {
  switch (sceneName) {
    case 'main':
      const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.2 )
      directionalLight.position.set(5, 6, 4)
      STATE.WEBGL.scene.add( directionalLight )

      const spotLight = new THREE.SpotLight( 0xf7dd94, 1 )
      spotLight.position.set( 1, 1, 1 )
      spotLight.angle = Math.PI / 4
      spotLight.penumbra = 1
      spotLight.decay = 1
      spotLight.distance = 10
      spotLight.castShadow = true
      spotLight.shadow.mapSize.width = 512
      spotLight.shadow.mapSize.height = 512
      spotLight.shadow.camera.near = 1
      spotLight.shadow.camera.far = 200
      spotLight.shadow.focus = 1
      STATE.WEBGL.scene.add( spotLight )

      const SCENE_MESH = ASSETS.MAIN.MODEL_FILES.find( obj => { return obj.name === "scene" } )
      const SCENE_OBJECT = new StageObject({
        originalObject: SCENE_MESH.asset.scene,
        clonedObject: SCENE_MESH.asset.scene.clone(),
        objectName: 'scene',
        definition: SCENE_PROPERTIES,
      })
      
      SCENE_OBJECT.clone.traverse(child => {
        if(child.name == 'Backdrop') child.receiveShadow = true
        if(child.name == 'Lego') child.castShadow = true
      })

      STATE.WEBGL.scene.add(SCENE_OBJECT.clone)
      break
  }
}

export function toggleStages( toggle, sceneName ) {
  let stagesObjects = STATE.WEBGL.scene.children.filter(function (obj) {return obj.name === sceneName})

  if (stagesObjects != undefined) {
    for (let stagesObject of stagesObjects) {
      toggle ? stagesObject.visible = true : stagesObject.visible = false
    }
  }
}