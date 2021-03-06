import { db } from "../firebase/firebaseConfig"

export const loadNotes = async ( uid ) => {
   const notesSnap = await db.collection( `${uid}/journal/notes`).get();
   const notes = [];
   notesSnap.forEach( snapshot => {
     notes.push({
       id: snapshot.id,
       ...snapshot.data()
     });
   });
   return notes;
}