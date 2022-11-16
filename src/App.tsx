import React from 'react'
import './App.css'
import phaserGame from './PhaserGame'
import BasicModal from './planet/planetModal'
import HelloWorldScene, { Reflection, Goal} from './scenes/HelloWorldScene'

const handleClick = () => {
  const scene = phaserGame.scene.keys.helloworld as HelloWorldScene
  const reflections: Reflection[] = [
    {
      id: 'ref1',
      reflection_date: "2022-11-15T14:21:42.000Z",
      name: 'ref 1',
      created_at: "2022-11-15T14:21:42.000Z"
    }, 
    {
      id: 'ref2',
      reflection_date: "2022-11-15T14:21:42.000Z",
      name: 'ref 2',
      created_at: "2022-11-15T14:21:42.000Z"
    }, 
    {
      id: 'ref3',
      reflection_date: "2022-11-15T14:21:42.000Z",
      name: 'ref 3',
      created_at: "2022-11-15T14:21:42.000Z"
    },
    {
      id: 'ref4',
      reflection_date: "2022-11-15T14:21:42.000Z",
      name: 'ref 4',
      created_at: "2022-11-15T14:21:42.000Z"
    }
  ];

  const goals: Goal[] = [{
    "id": "1",
    "parent_id": null,
    "name": "goal 1",
    "type": "personal",
    "created_at": "2022-11-15T14:21:42.000Z",
    "completed_at": "2022-11-15T14:21:42.000Z",
    "user_id": "1"
  },
  {
    "id": "2", 
    "parent_id": "1", 
    "name": "goal 2",
    "type": "personal", 
    "created_at": "2022-11-15T14:21:42.049Z", 
    "user_id": "1"
  }, 
  { 
    "id": "3", 
    "parent_id": "1", 
    "name": "goal 3", 
    "type": "personal", 
    "created_at": "2022-11-15T14:21:42.063Z", 
    "user_id": "1" 
  }, 
  { 
    "id": "4", 
    "parent_id": "3", 
    "name": "goal 4", 
    "type": "personal", 
    "created_at": "2022-11-15T14:21:42.070Z", 
    "user_id": "1" 
  }, 
  { 
    "id": "5", 
    "parent_id": "3", 
    "name": "goal 5", 
    "type": "personal", 
    "created_at": "2022-11-15T14:21:42.077Z", 
    "user_id": "1" 
  }]
  scene.start(reflections);
}


function App() {
  const [modalData, setModalData] = React.useState(false);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openFromParent() {
    setIsOpen(true);
  }

  function handleCloseModal(event: any, data: any) {
    console.log(event, data);
    setIsOpen(false);
  }

  function handleAfterOpen(event: any, data: any) {
    console.log(event, data);
  }

  const planetOpen = (e: any) => {
    console.log(e.detail);
    setIsOpen(false);
    setModalData({ ...e.detail });
    openFromParent();
  }

  window.addEventListener('phaseLoad', handleClick);
  window.addEventListener('planetOpen', planetOpen);

  return (
    <div className="App">
      <BasicModal
        dynData={modalData}
        isOpen={modalIsOpen}
        onCloseModal={handleCloseModal}
        onAfterOpen={handleAfterOpen}
      ></BasicModal>
    </div>
  )
}

export default App
