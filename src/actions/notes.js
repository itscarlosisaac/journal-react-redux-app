import Swal from 'sweetalert2'
import { db } from "../firebase/firebaseConfig"
import { loadNotes } from "../helpers/loadNotes"
import { types } from "../types/types"
import { fileUpload } from '../helpers/fileUpload';


export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const newNote = { 
      title: '',
      body: '',
      date: new Date().getTime(),
    }
    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote) 
    dispatch(activeNote(docRef.id, newNote))  
    dispatch(displayNewNote(docRef.id, newNote ))
  }
}

export const displayNewNote = (id, newNote) => {
  return {
    type: types.notesDisplayNew,
    payload: {id, ...newNote }
  }
}

export const activeNote = (id, note) => {
  return {
    type: types.notesActive,
    payload: {
      id,
      ...note
    }
  }
}

export const startLoadingNotes =  (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes))
  }
}

export const setNotes = (notes) => {
  return {
    type: types.notesLoad,
    payload: notes
  }
}

export const refreshNote = (id, note) => {
  return {
    type: types.notesUpdated,
    payload: {
      id, note
    }
  }
}

export const startSaveNote = (note) => {
  return async (dispatch, getState ) => {
    const { uid } = getState().auth;
    
    if(!note.url){ 
      delete note.url
    }
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    dispatch(refreshNote(note.id, note));
    Swal.fire('Note Saved', 'Saved', 'success')
  }
}

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait while image is uploading',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
      
    })
    const fileUrl = await fileUpload(file)
    activeNote.url = fileUrl;
    
    dispatch(startSaveNote(activeNote))
    Swal.close();
  }
}

export const startDeleteNote = ( id ) => {
  return async ( dispatch, getState ) => {
    const { uid } = getState().auth;
    await db.doc(`${uid}/journal/notes/${id}`).delete();
    dispatch( deleteNote(id)  )
  }
}

export const deleteNote = (id) => {
  return {
    type: types.notesDelete,
    payload: id
  }
}

export const notesLogout = () => {
  return {
    type: types.notesLogoutCleaning,
    notes: []
  }
}