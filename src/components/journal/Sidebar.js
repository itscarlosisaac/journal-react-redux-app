import React from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';
import { LogoutIcon, CalendarIcon, UserIcon  } from '@heroicons/react/outline'

export const Sidebar = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state.auth )
  console.log(state)
  const { name, email, photoUrl } = state;

  const handleLogout = () =>{
    dispatch( startLogout() )
  }

  const handleAddNew = () => {
    dispatch(startNewNote())
  }

  return (
    <aside  className="journal__sidebar h-100 py-10 flex justify-between flex-col">

      
      <div className="journal__sidebar-navbar h-auto mb-6 px-5">
        <h3 className="flex">
          {
            photoUrl ? 
              <img className="w-12 h-12 bg-indigo-300 overflow-hidden rounded-full" src={photoUrl} /> : 
              <div  className="h-12 w-12 bg-indigo-500  overflow-hidden rounded-full mr-2 flex justify-center items-center"><UserIcon className=" h-6 text-white text-md " /></div>
            }
          <div className="ml-3 flex flex-col">
            <span> {name}</span>
            {email && <span> {email} </span>}
          </div>
        </h3>
      </div>


      <div 
        className="journal__new-entry px-4 "
        onClick={handleAddNew}
        >
        
        <p className="m-0 text-white text-md  p-4 cursor-pointer mb-10 text-center self-center my-5 bg-blue-500 w-full content-center flex justify-center hover:bg-blue-800 hover:text-white transition-colors duration-200">
          <CalendarIcon  className="h-5 w-5 inline align-top mr-2" />
          Add New Note
        </p>
      </div>

      <JournalEntries/>

      <footer className="px-4 w-full min-w-full">
        <button onClick={handleLogout} className="p-4 bg-blueish-100 text-gray-400 w-full min-w-full text-center tracking-wide hover:bg-blueish-700 hover:text-white transition-colors duration-200">
          Logout <LogoutIcon className="h-5 w-5  inline align-top"/> 
        </button>
      </footer>
    </aside>
  )
}
