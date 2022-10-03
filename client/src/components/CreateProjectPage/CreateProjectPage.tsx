import React, { FC, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createProjectAction } from '../../redux/actions/projectActions';

// import "./style/projectForm.css";

type ProjectType = {
    name: string;
    description: string;
    region: string;
    status: string;
    clientId: string;
    clientName: string;
    rooms: string[];
};

const CreateProjectPage: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const [projectDetails, setProjectDetails] = useState<ProjectType>({
        name: '',
        description: '',
        region: '',
        status: '',
        clientId: user._id,
        clientName: user.name,
        rooms: [],
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
        try {
            dispatch(createProjectAction(projectDetails));
            setProjectDetails({
                name: '',
                description: '',
                region: '',
                status: '',
                clientId: user._id,
                clientName: user.name,
                rooms: [],
            });
        } catch (err) {
            console.log('Error: ' + err);
        }
    };
    return (
        <div
            className="project-create-form-wrapper"
            style={{ paddingTop: '100px' }}
        >
            <form onSubmit={onSubmit} className="create-project-form">
                <label htmlFor="name">Name</label>
                <input
                    className="project-name-input"
                    id="name"
                    type="text"
                    name="name"
                    value={projectDetails.name}
                    onChange={(e) => handleFormInput(e)}
                    placeholder="John Doe"
                    required
                />
                <label htmlFor="description">Description</label>
                <input
                    className="project-description-input"
                    id="description"
                    placeholder="Description"
                    name="description"
                    value={projectDetails.description}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="region">Region</label>
                <input
                    className="project-region-input"
                    id="region"
                    placeholder="Region"
                    name="region"
                    value={projectDetails.region}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="description">Status</label>
                <input
                    className="project-status-input"
                    id="status"
                    placeholder="Status"
                    name="status"
                    value={projectDetails.status}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <button onClick={(e) => onSubmit(e)}>submit</button>
            </form>
        </div>
    );
};

export default CreateProjectPage;
