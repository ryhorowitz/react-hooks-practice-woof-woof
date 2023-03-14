import React from "react";

function Header({ dogs, setSelectedDog }) {

  return (
    <>
    <div id="filter-div">
        <button id="good-dog-filter">Filter good dogs: OFF</button>
      </div>
      <div id="dog-bar">
        {dogs.map(dog => {
          return <span
            key={dog.id}
            onClick={() => setSelectedDog(dog)}
          >{dog.name}</span>
        })}
      </div>
    </>
  )
}

export default Header