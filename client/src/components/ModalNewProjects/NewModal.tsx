import React from 'react'
import './style/newModal.scss'
// import './style/newModal.css'


// Assign prop "types" to allow react dispatch to pass values among
// parent/child components.
type Props = {
    closeModal: React.Dispatch<React.SetStateAction<any>>,
    openModal: boolean
}

// Modal function for "New Project". Creates a modal window which allows
// user to input the Name, Description, Status, and Region of a "New Project".
const NewModal = (props: Props) => {

    let closeModal = props.closeModal;
    let openModal = props.openModal;

  return (
    <div className="new-project-modal-background">
        <div className="new-project-modal-container">
            <div className="modal-title-close-btn">
                <button onClick={() => {closeModal(!openModal)}}> X </button>
            </div>
            <div className="new-project-modal-title">
                <h1 className="modal-title">New Project</h1>
            </div>
            <div className="new-project-modal-body">
                <label className='new-project-modal-labels'>Name</label>
                <input type='text' name='name' className='new-project-modal-inputs' placeholder='Ex. 113 Baptistry' required />
                <label className='new-project-modal-labels'>Description</label>
                <textarea name='message' className='new-project-modal-inputs' placeholder='Description of the room...' required></textarea>
                <span className='max-text-span'><small className='max-text'>500 max</small></span>
                <div className='new-projects-dropdowns-container'>
                    <div>
                        <label htmlFor="status-select-menu" className='new-project-modal-labels'>Status</label>
                        <br />
                        <select id="status-select-menu" name="status-select-menu"  required>
                            <option value="new-option" selected>New (default)</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                        </select>
                    </div>
                    <br />
                    <div>
                        <label className='new-project-modal-labels'>Region</label>
                        <br />
                        <select id="status-select-menu" name="status-select-menu"  required>
                            <option value="default-option" selected>Select Region</option>
                            <option value="region1">Region 1</option>
                            <option value="region2">Region 2</option>
                            <option value="region3">Region 3</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="new-project-modal-footer">
                <button id='cancel-btn' onClick={() => {closeModal(!openModal)}}>
                    Cancel
                </button>
                <button type='submit'>Create Project</button>
            </div>
        </div>
    </div>
  )
}

export default NewModal
