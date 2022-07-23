import React ,{useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom';
import {  useNavigate } from "react-router-dom";
import notes from '../Assets/data'
import { ReactComponent as ArrowLeft } from '../Assets/arrow-left.svg';


const NotePage = () => {
  const params = useParams();
  let noteId = params.id
  const navigate = useNavigate();
  // console.log(params.id)  
  // let note = notes.find(note => note.id === Number(noteId))

  let [note, setNote] = useState(null)

  useEffect(() => {
    getNote()

  }, [noteId])

  let getNote = async() =>{
    if (noteId === 'new') return
    let response  = await fetch(`http://localhost:3500/notes/${noteId}`)
    let data = await response.json()
    setNote(data)
  }

  let createNote= async() => {
    await fetch(`http://localhost:3500/notes/`, {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({...note, 'updated':new Date()})
    })
}

  let updateNote= async() => {
      await fetch(`http://localhost:3500/notes/${noteId}`, {
        method : 'PUT',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({...note, 'updated':new Date()})
      })
  }

  let handleSubmit = () => {

    if (noteId !== "new" && !note.body) {
      deleteNote()
  } else if (noteId !== "new") {
      updateNote()
  } else if (noteId === 'new' && note !== null) {
      createNote()
  }
    navigate('/');
  }

  let deleteNote = async() => {

      
      await fetch(`http://localhost:3500/notes/${noteId}`, {
      method : 'DELETE',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify(note)
    })    
    navigate('/');
  }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to="/"> <ArrowLeft onClick={handleSubmit} /> </Link>
        </h3>
        {noteId !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ): <button onClick={handleSubmit}>Done</button>}
        
      </div>

      <textarea onChange={(e) => { setNote({...note, 'body': e.target.value})}} value= {note?.body}></textarea>
    {/* <p>{note?.body}</p> */}
    </div>
  )
}

export default NotePage