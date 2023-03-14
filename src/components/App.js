import React, { useState, useEffect } from "react";
import Header from "./Header";

function App() {
  const [dogs, setDogs] = useState([])
  const [selectedDog, setSelectedDog] = useState({})

  const { id, name, image, isGoodDog } = selectedDog

  useEffect(() => {
    fetch(`http://localhost:3001/pups`)
      .then(r => r.json())
      .then(dogData => setDogs(dogData))
      .catch(e => console.error('ERROR', e))
  }, [])

  return (
    <div className="App">
      <Header dogs={dogs} setSelectedDog={setSelectedDog} />

      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          <img src={image} alt="Mr. Bonkers" />
          <h2>{name}</h2>
          <button
            onClick={handleToogleIsGoodDog}
          >{isGoodDog ? 'Good Dog!' : 'Bad Dog!'}
          </button>
        </div>
      </div>
    </div>
  );

  function handleToogleIsGoodDog() {
    const optionObj = {
      method: 'PATCH',
      body: JSON.stringify({
        isGoodDog: !isGoodDog
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }

    fetch(`http://localhost:3001/pups/${id}`, optionObj)
      .then(r => r.json())
      .then(dogData => {
        console.log('PATCH RES', dogData)
        //find by ID the dog obj to replace/update
        let updatedDog = dogs.find( dog => dog.id === id)
        updatedDog.isGoodDog = !isGoodDog
        
        setSelectedDog(dogData)
      })

      .catch(e => console.error('ERROR', e))
  }
}


export default App;
