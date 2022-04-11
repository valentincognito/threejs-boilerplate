import { STATE } from './global.js'

export function registerEvents( ){
  document.addEventListener( 'mousemove', e => onMouseMove( e, STATE.WEBGL ), false )
  document.addEventListener( 'touchmove', e => onTouchMove( e, STATE.WEBGL ), false )
}

export function onMouseMove( e ){
  STATE.WEBGL.mouse.x = ( e.clientX / window.innerWidth * 2 ) - 1
  STATE.WEBGL.mouse.y = ( e.clientY / window.innerHeight * -2 ) + 1
}

export function onTouchMove( e ){
  STATE.WEBGL.mouse.x = ( e.touches[0].pageX / window.innerWidth ) * 2 - 1
  STATE.WEBGL.mouse.y = -( e.touches[0].pageY / window.innerHeight ) * 2 + 1
}
