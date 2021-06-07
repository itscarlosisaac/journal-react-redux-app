import React from 'react'
import { Sidebar } from './Sidebar'
import { NothingSelected } from './NothingSelected';
import { NoteScreen } from '../notes/NoteScreen';
import { useSelector } from 'react-redux';

export const JournalScreen = () => {

  const { active } = useSelector(state => state.notes)

  return (
    <div className="w-screen h-screen flex">
      <Sidebar className="w-24 min-w-full p-4" />
      <main className="border-l border-blueish-200 border-solid">
        { 
          ( active ) ? 
            <NoteScreen /> : 
            <NothingSelected /> 
        }
      </main>
    </div>
  )
}
