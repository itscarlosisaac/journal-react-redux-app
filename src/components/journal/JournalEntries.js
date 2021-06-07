import React from 'react'
import { useSelector } from 'react-redux'
import { JournalEntry } from './JournalEntry'

export const JournalEntries = () => {

  const { notes, active } = useSelector(state => state.notes)
  console.log(notes, active)

  return (
    <div className="journal__entries overflow-y-scroll h-4/5">
      {
        notes.map((note) => (
          <JournalEntry
            isActive={active && active.id === note.id}
            key={ note.id }
            {...note}
          />
        ))
      }
    </div>
  )
}
