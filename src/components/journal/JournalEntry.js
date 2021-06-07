import React from 'react'
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url, isActive}) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();

  const handleActiveNote = () => {
    dispatch(activeNote(id,  { date, title, body, url } ))
  }

  return (
    <div 
      className={`journal__entry pointer py-3 pb-5  px-5  pt-4  flex justify-start w-full 
        ${isActive ? 
          "bg-blueish-100 border-l-4 border-blue-500 border-l-solid border-t-transparent" : 
          "border-l-4 border-l-solid border-t border-t-gray-200"}`}
      onClick={handleActiveNote}
    >
      {url && <div
        style={{
          backgroundSize: "cover",
          backgroundImage: `url('${url}')`
        }}
        className="journal__entry-picture mr-1 w-16 h-16 overflow-hidden rounded-full border border-gray-200 border-solid">
      </div>}

      <div className="journal__entry-body self-center">
        <p className="journal__entry-title text-lg font-semibold whitespace-nowrap text-blueish-600"> {title}</p>
        <p className="journal__entry-content text-sm  whitespace-nowrap text-blueish-400">
          <span className="font-medium">{noteDate.format('MMMM Do YYYY')}, </span>
          <span>{body.substr(0, 20)}</span>
        </p>
      </div>
    </div>
  )
}
