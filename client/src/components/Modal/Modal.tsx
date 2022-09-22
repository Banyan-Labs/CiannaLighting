import React, { FC, FormEvent, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './style/modal.scss';
import { useAppDispatch } from '../../app/hooks';
import { createProjectAction } from '../../redux/actions/projectActions';

type ProjectType = {
    name: string;
    clientId: string;
    clientName: string;
    region: string;
    status: string;
    description: string;
};

// Assign prop "types" to allow react dispatch to pass values among
// parent/child components.
type Props = {
    closeModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: boolean;
    user: any;
};

// Modal function for "New Project". Creates a modal window which allows
// user to input the Name, Description, Status, and Region of a "New Project".
const Modal: FC<Props> = (props) => {
    const closeModal = props.closeModal;
    const openModal = props.openModal;
    const [projectDetails, setProjectDetails] = useState<ProjectType>({
        name: '',
        clientId: props.user.id,
        clientName: props.user.name,
        region: '',
        status: '',
        description: '',
    });

    const dispatch = useAppDispatch();

    const handleFormInput = (e: FormEvent<HTMLInputElement>) => {
        setProjectDetails({
            ...projectDetails,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        console.log('submitted');
        try {
            dispatch(createProjectAction(projectDetails));
            setProjectDetails({
                name: '',
                clientId: props.user.id,
                clientName: props.user.name,
                region: '',
                status: '',
                description: '',
            });
        } catch (err) {
            console.log('Error: ' + err);
        }
    };

    return (
        <div className="new-project-modal-background">
            <div className="new-project-modal-container">
                <div className="modal-title-close-btn">
                    <button
                        onClick={() => {
                            closeModal(!openModal);
                        }}
                    >
                        {' '}
                        <FaTimes />
                    </button>
                </div>
                <div className="new-project-modal-title">
                    <h3 className="modal-title">New Project</h3>
                </div>
                <div className="new-project-modal-body">
                    <form onSubmit={onSubmit}>
                        <label
                            className="new-project-modal-labels"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="new-project-modal-inputs"
                            placeholder="Ex. 113 Baptistry"
                            value={projectDetails.name}
                            onChange={(e) => handleFormInput(e)}
                            required
                        />
                        <label
                            className="new-project-modal-labels"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <input
                            name="description"
                            id="description"
                            type="text"
                            className="new-project-modal-inputs"
                            placeholder="Description of the project..."
                            value={projectDetails.description}
                            onChange={(e) => handleFormInput(e)}
                            required
                        ></input>
                        <span className="max-text-span">
                            <small className="max-text">500 max</small>
                        </span>
                        <div className="new-projects-dropdowns-container">
                            <div>
                                <label
                                    htmlFor="status-select-menu"
                                    className="new-project-modal-labels"
                                >
                                    Status
                                </label>
                                <br />
                                <input
                                    name="status"
                                    id="status"
                                    type="text"
                                    className="new-project-modal-inputs"
                                    placeholder="New"
                                    value={projectDetails.status}
                                    onChange={(e) => handleFormInput(e)}
                                    required
                                ></input>
                            </div>
                            <br />
                            <div>
                                <label className="new-project-modal-labels">
                                    Region
                                </label>
                                <br />
                                <input
                                    name="region"
                                    id="region"
                                    type="text"
                                    className="new-project-modal-inputs"
                                    placeholder="North America"
                                    value={projectDetails.region}
                                    onChange={(e) => handleFormInput(e)}
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="new-project-modal-footer">
                            <button
                                type="submit"
                                className="new-project-modal-button"
                                onClick={(e) => onSubmit(e)}
                            >
                                Create Project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
