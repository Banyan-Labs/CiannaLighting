import React, { FC, FormEvent, useState } from 'react';
import dataHolding from '../Dashboard/YourProjects/projectDetails';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    createProjectAction,
    getProject,
    getUserProjects,
    setTheYourProjects,
} from '../../redux/actions/projectActions';
import './style/modal.scss';

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
    editProject: boolean;
    setEditProject: any;
};

// Modal function for "New Project". Creates a modal window which allows
// user to input the Name, Description, Status, and Region of a "New Project".
const Modal: FC<Props> = (props) => {
    const { status } = useAppSelector(({ filter: status }) => status);
    const { region } = useAppSelector(({ filter: region }) => region);
    const { user } = useAppSelector(({ auth: user }) => user);
    const { project } = useAppSelector(({ project: project }) => project);
    const closeModal = props.closeModal;
    const openModal = props.openModal;
    const navigate = useNavigate();
    const [projectDetails, setProjectDetails] = useState<ProjectType>({
        name: props.editProject ? String(project?.name) : '',
        clientId: user._id,
        clientName: user.name,
        region: props.editProject ? String(project?.region) : 'Africa',
        status: props.editProject ? String(project?.status) : 'New',
        description: props.editProject ? String(project?.description) : '',
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

    const editFormat = (arr: any, defVal: any) => {
        const reFormat = [defVal, ...arr.filter((x: any) => x !== defVal)];

        return reFormat;
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        console.log('submitted');
        console.log('DEETS: ', projectDetails);
        try {
            !props.editProject
                ? await dispatch(createProjectAction(projectDetails))
                : await dispatch(
                      getProject({
                          ...projectDetails,
                          _id: project?._id,
                      })
                  );
            setProjectDetails({
                name: '',
                clientId: user._id,
                clientName: user.name,
                region: '',
                status: '',
                description: '',
            });
            !props.editProject
                ? navigate(`/projects/ + ?_id= ${user._id}`)
                : navigate(
                      `/projects/ + ?_id= ${user._id}&projectId=${project?._id}`
                  );
            await dispatch(getUserProjects(user._id));
            await dispatch(setTheYourProjects(true));
            dataHolding.getData(projectDetails, '');
            if (props.editProject) {
                closeModal(false);
                props.setEditProject(false);
            }
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
                            props.setEditProject(false);
                        }}
                    >
                        {' '}
                        <FaTimes />
                    </button>
                </div>
                <div className="new-project-modal-title">
                    <h3 className="modal-title-new-project">
                        {props.editProject === true
                            ? `Edit ${project?.name}`
                            : 'New Project'}
                    </h3>
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
                            placeholder={
                                props.editProject
                                    ? project?.name
                                    : 'Ex. 113 Baptistry'
                            }
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
                            placeholder={
                                props.editProject
                                    ? project?.description
                                    : 'Description of the project...'
                            }
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
                                    required
                                >
                                    {!props.editProject
                                        ? status.map(
                                              (
                                                  status: string,
                                                  index = status.indexOf(status)
                                              ) => {
                                                  return (
                                                      <option
                                                          key={index}
                                                          value={status}
                                                      >
                                                          {status}
                                                      </option>
                                                  );
                                              }
                                          )
                                        : editFormat(
                                              status,
                                              project?.status
                                          )?.map(
                                              (
                                                  status: string,
                                                  index = status.indexOf(status)
                                              ) => {
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
                                    required
                                >
                                    {!props.editProject
                                        ? region.map(
                                              (
                                                  region: string,
                                                  index = region.indexOf(region)
                                              ) => {
                                                  return (
                                                      <option
                                                          key={index}
                                                          value={region}
                                                      >
                                                          {region}
                                                      </option>
                                                  );
                                              }
                                          )
                                        : editFormat(
                                              region,
                                              project?.region
                                          )?.map(
                                              (
                                                  region: string,
                                                  index = region.indexOf(region)
                                              ) => {
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
                            >
                                {props.editProject
                                    ? 'Update Project'
                                    : 'Create Project'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
