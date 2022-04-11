import * as THREE from 'three'
import { STATE } from './global.js'
import * as UTILS from './utils'

// parallax effect on mouse hover
// export function parallax(){
//   const [ xMul, yMul, lerpFactor ] = [ 4, 4, 0.05 ]

//   STATE.WEBGL.camera.position.x = UTILS.lerp(STATE.WEBGL.camera.position.x, - STATE.WEBGL.mouse.x * xMul + STATE.WEBGL.cameraOptions.x, lerpFactor)
//   STATE.WEBGL.camera.position.y = UTILS.lerp(STATE.WEBGL.camera.position.y, - STATE.WEBGL.mouse.y * yMul + STATE.WEBGL.cameraOptions.y, lerpFactor)
//   STATE.WEBGL.camera.lookAt(new THREE.Vector3(0,0,0))
// }
