import React, {useEffect, useState} from 'react'
// import notes from '../Assets/data'
import ListItem from '../Components/ListItem'
import AddButton from '../Components/AddButton'
const NotesListPage = () => {

  let [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes()
  }, [])


  let getNotes = async() => {
    let response = await fetch('http://localhost:3500/notes/')
    let data = await response.json()
    setNotes(data)
  }

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>
        <div className='NotesList'>
            {
                notes.map((note, index) => (
                    <ListItem  key = {index} note = {note}/>
                ))
            }
        </div>
        <AddButton />
    </div>
  )
}

export default NotesListPage