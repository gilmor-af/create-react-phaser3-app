import React from 'react'
import './App.css'
import phaserGame from './PhaserGame'
import HelloWorldScene from './scenes/HelloWorldScene'

const handleClick = () => {
  const scene = phaserGame.scene.keys.helloworld as HelloWorldScene
  // scene.createEmitter()
  scene.start(8);  
}

const planetOpen = (e: any) => {
  console.log(e.detail);
}

function App() {
  window.addEventListener('phaseLoad', handleClick);
  window.addEventListener('planetOpen', planetOpen);

  return (
    <div className="App">
    </div>
  )
}

export default App
