import React, { FC, FormEvent, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createProjectAction } from '../../redux/actions/projectActions';
import dataHolding from '../Dashboard/YourProjects/projectDetails';
import './style/modal.scss';
import { useNavigate } from 'react-router-dom';

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
const Modal: FC<Props> = (props, user) => {
    const { status } = useAppSelector(({ filter: status }) => status);
    const { region } = useAppSelector(({ filter: region }) => region);

    const closeModal = props.closeModal;
    const openModal = props.openModal;
    const navigate = useNavigate();
    const [projectDetails, setProjectDetails] = useState<ProjectType>({
        name: '',
        clientId: props.user._id,
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

    const handleSelection = (e: FormEvent<HTMLSelectElement>) => {
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
                                <select
                                    id="status"
                                    name="status"
                                    onChange={(e) => handleSelection(e)}
                                >
                                    {status.map(
                                        (
                                            status: string,
                                            index = status.indexOf(status)
                                        ) => {
                                            if (status === 'Choose Status') {
                                                return (
                                                    <option
                                                        defaultValue={status}
                                                        key={index}
                                                        value={status}
                                                    >
                                                        {status}
                                                    </option>
                                                );
                                            }
                                            return (
                                                <option
                                                    key={index}
                                                    value={status}
                                                >
                                                    {status}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                            <br />
                            <div>
                                <label className="new-project-modal-labels">
                                    Region
                                </label>
                                <br />
                                <select
                                    id="region"
                                    name="region"
                                    onChange={(e) => handleSelection(e)}
                                >
                                    {region.map(
                                        (
                                            region: string,
                                            index = region.indexOf(region)
                                        ) => {
                                            if (region === 'Choose Region') {
                                                return (
                                                    <option
                                                        defaultValue={region}
                                                        key={index}
                                                        value={region}
                                                    >
                                                        {region}
                                                    </option>
                                                );
                                            }
                                            return (
                                                <option
                                                    key={index}
                                                    value={region}
                                                >
                                                    {region}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="new-project-modal-footer">
                            <button
                                type="submit"
                                className="new-project-modal-button"
                                onClick={(e) => {
                                    onSubmit(e);
                                    dataHolding.getData(projectDetails, '');
                                    navigate(`/projects/${user.name}`);
                                }}
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
