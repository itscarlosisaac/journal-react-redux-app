import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleteNote } from '../../actions/notes';
import { XIcon  } from '@heroicons/react/outline'

export const NoteScreen = () => {

  const { active:note } = useSelector(state => state.notes);
  const dispatch = useDispatch();
  const [ formValues, handleInputChange, reset ] = useForm(note);

  const activeId = useRef(note.id);

  useEffect(() => {
    if( note.id !== activeId.current) {
      reset(note)
      activeId.current = note.id
    }
  }, [note, reset])

  useEffect(() => {
    dispatch(activeNote(formValues.id,{...formValues}))
  }, [formValues])

  const {body, title} = formValues;

  const handleDelete = () => {
    dispatch(startDeleteNote(activeId.current))
  }

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input type="text" name='title' placeholder="New entry title" value={title}
        className="notes__title-input" autoComplete="off" onChange={handleInputChange}/>
        <textarea name='body' className="notes__textarea" placeholder="New entry" onChange={handleInputChange} value={body}>

        </textarea>
        {
          (note.url) && 
          <div className="notes__image">
            <img src={note.url} alt="Japanese cherry"/>
          </div>
        }
      </div>
      <div onClick={handleDelete} className="cursor-pointer absolute bg-red-500 text-white w-16 h-16 rounded-full overflow-hidden flex items-center justify-center shadow-lg right-4 bottom-4">
          <XIcon className="w-6" />
      </div>
    </div>
  )
}

