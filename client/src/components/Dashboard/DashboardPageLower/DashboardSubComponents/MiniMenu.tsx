import React from 'react'
import {HiOutlineDuplicate} from 'react-icons/hi'
import {AiOutlineEye} from 'react-icons/ai'
import {TiCancel} from 'react-icons/ti'

const MiniMenu = () => {
  return (
    <div className='mini-menu-container'>
        <div className='mini-menu-top'>
            <div>
                <HiOutlineDuplicate /> 
                Duplicate
            </div>
            <div>
               <AiOutlineEye />
               View 
            </div>   
        </div>
        <div className='mini-menu-bottom'>
            <TiCancel />
            Read only
        </div>
            
                
            
            
            
                
       
        
    </div>
  )
}

export default MiniMenu