export const STATE = {
  IS_MOBILE: false,
  CURRENT_SCENE: {
    NAME: '',
    VISIBLE: false
  },
  ENABLE_MOUSE_INTERACTION: false,
  ENABLE_RENDERING: false,
}

export const ASSETS = {
  MAIN: {
    MODEL_FILES: [
      {
        name: 'scene',
        loaded: false,
        path : 'glb/scene.glb',
        asset: null
      }
    ],
    TEXTURES_FILES: []
  },
}
