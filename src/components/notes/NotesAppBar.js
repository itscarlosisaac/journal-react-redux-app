import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';
import moment from 'moment';

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const {active} = useSelector(state => state.notes)
  const date = moment(active.date);
  
  const handleSave = () => {
    dispatch(startSaveNote(active))
  }

  const handlePictureUpload = () =>{
    document.querySelector('#fileSelector').click();
  }

  const handleFileChanged = (e) => {
    const file = e.target.files[0];
    if( file ) {
      dispatch( startUploading(file) )
    }
  }

  return (
    <div className="notes__appbar bg-blue-500 flex justify-between py-3 px-5">
      <span className="text-white m-0 self-center">{ date.format('dddd, MMMM Do YYYY') }</span>
      <input 
        id='fileSelector'
        type="file"
        name="file"
        style={{'display':'none'}}  
        onChange={handleFileChanged} 
        /> 
      <div>
        <button className="px-3 py-2 bg-white text-blueish-600 text-sm font-medium hover:bg-blueish-200 hover:text-blueish-800 transition-colors duration-200" onClick={handlePictureUpload}> 
          Upload Thumbnail
        </button>
        <button className="px-3 py-2 bg-blueish-800 text-white text-sm font-medium font-medium ml-4 hover:bg-blueish-900 transition-colors duration-200" onClick={handleSave}> 
          Save
        </button>
      </div>
    </div>
  )
}
