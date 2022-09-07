import React, {FC} from 'react'
import {RiAddLine} from 'react-icons/ri'
const Rooms:FC = () => {
  return (
    <div>
        <div className='add-room-button-container'>
            <div className='add-room-button'>
                <RiAddLine className='add-sign' />
                
            </div>
            <p className='no-room-text'>No rooms in this project</p>
            
        </div>
        <p className='room-bottom-text'>Create rooms to manage your project</p>
    </div>
  )
}

export default Rooms