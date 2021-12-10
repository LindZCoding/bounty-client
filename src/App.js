import './App.css'
import { useState, useEffect } from 'react'
import Poster from './components/Poster'
import Display from './components/Display'
import Form from './components/Form'
import EditBounty from './components/EditBounty'

function App() {
  const [bounties, setBounties] = useState([])
  const [current, setCurrent] = useState({})
  const [editing, setEditing] = useState({})

  const getBounties = () => {
    fetch('http://localhost:8000/bounties')
      .then(response => response.json())
      .then(foundBounties => {
        console.log(foundBounties)
        setBounties(foundBounties)
      })
      .catch(err => {
        console.log(err)
    })
  }

  useEffect(() => {
    getBounties()
  }, [])

  const changeCurrent = bounty => {
    setCurrent(bounty)
  }

  const changeEditing = bounty => {
    setEditing(bounty)
  }

  const allPosters = bounties.map((bounty) => {
    return (
      <Poster
        key={bounty._id}
        bounty={bounty}
        changeCurrent={changeCurrent}
        changeEditing={changeEditing}
      />
    )
  })

  return (
    <div className="App">
      <header className="">
        <h1>Wanted</h1>
        <Display bounty={current} />
        <EditBounty bounty={editing} refreshBounties={ getBounties }/>
      </header>
      <section className="poster-board">
        {allPosters}
      </section>
      <section className="App-header">
        <Form refreshBounties={ getBounties }/>
      </section>
    </div>
  );
}

export default App
