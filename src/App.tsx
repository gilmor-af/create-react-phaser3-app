import React from 'react'
import './App.css'
import phaserGame from './PhaserGame'
import HelloWorldScene, { Planet } from './scenes/HelloWorldScene'

const handleClick = () => {
  const scene = phaserGame.scene.keys.helloworld as HelloWorldScene
  // scene.createEmitter()
  const planets: Planet[] = [
    { id: 'test1' },
    { id: 'test2' },
    { id: 'test3' },
    { id: 'test4' },
    { id: 'test5' }
  ]
  scene.start(planets);  
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
