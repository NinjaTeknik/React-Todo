import ListHeader from './components/ListHeader'
import { useState, useEffect } from'react'

const App = () => {

  const [tasks, setTasks] = useState(null)

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000`)
      const json = await response.json()
      setTasks(json)
    } catch {}
    console.error("error")
  }

  useEffect(() =>  getData, [])

  console.log(tasks);

  return (
    <div className="app">
      <ListHeader listName={'📋 Todo List'}/>
    </div>
  )
}

export default App