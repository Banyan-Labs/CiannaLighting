import React, { FC, FormEvent, useState, useEffect, useCallback } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    getFilteredProjects
} from '../../redux/actions/projectActions';
// import './style/newRoomModal.css';

import { useNavigate } from 'react-router-dom';

type Props = {
    closeModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: boolean;
    // user: any;
};

export const FilterModal: FC<Props> = ({ closeModal, openModal }) => {
    const { allProjects } = useAppSelector(({ project }) => project);
    console.log(allProjects);
    const navigate = useNavigate();
    const [formDetails, setFormDetails] = useState({
        clientName: '',
        status: '',
        region: '',
    });
    const [submittalForm, setSubmittalForm] = useState<any>({});
    const filterInfo = allProjects
        .slice()
        .map((project) => [project.clientName, project.status, project.region]);
    const designers = ['Select from designers..', ...filterInfo
        .slice()
        .map((project) => project[0])
        .filter((x, c, r) => c === r.lastIndexOf(x))];
    const statuses = ['Select a status..', ...filterInfo
        .slice()
        .map((project) => project[1])
        .filter((x, c, r) => c === r.lastIndexOf(x))];
    const regions = ['Select from regions..', ...filterInfo
        .slice()
        .map((project) => project[2])
        .filter((x, c, r) => c === r.lastIndexOf(x))];
    console.log('Designers: ', designers);
    console.log('Status: ', statuses);
    console.log('Regions: ', regions);

    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(getAllProjectRoomsAction(projectId));
    // }, [room]);

    // const projectRoute = useCallback(
    //     (roomId: string) => {
    //         const to = `/createLight/ + ?_id= ${user._id}&roomId=${roomId}&projectId=${projectId}`;
    //         navigate(to);
    //     },
    //     [user.name, navigate]
    // );

    const handleFormInput = (e: FormEvent<HTMLSelectElement>) => {
        setFormDetails({
            ...formDetails,
            [e.currentTarget.name]: e.currentTarget.value,
        });
        if (e.currentTarget.value == '') {
            delete submittalForm[e.currentTarget.name];
        } else {
            setSubmittalForm({
                ...submittalForm,
                [e.currentTarget.name]: e.currentTarget.value,
            });
        }
        console.log('formDetails: ', formDetails);
        console.log('submittalForm: ', submittalForm);
    };
    console.log('formDetailsOUTSIDE: ', formDetails);
    console.log('submittalFormOUTSIDE: ', submittalForm);

    const clearForm = (e:any) =>{
        e.preventDefault()
        setFormDetails({
            clientName: '',
            status: '',
            region: '',
        })
        setSubmittalForm({})
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        // try {
        //     if (projectId) {
        //         const newRoom = {
        //             clientId: user._id,
        //             projectId: projectId,
        //             name: roomDetails.name,
        //             description: roomDetails.description,
        //         };
        //         dispatch(createRoomAction(newRoom));
        //         setRoomCreated(!roomCreated);
        //     }
        //     setRoomDetails({
        //         name: '',
        //         description: '',
        //     });
        // } catch (err) {
        //     console.log('Error: ' + err);
        // }
    };

    return (
        // <div>
        //     yo
        // </div>
        <div className="new-room-modal-background">
            <div className="new-room-modal-container">
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

                <div>
                    <div className="new-room-modal-title">
                        <h3 className="modal-title">New Room</h3>
                    </div>
                    <div className="new-room-modal-body">
                        <form onSubmit={onSubmit}>
                            <label
                                className="new-room-modal-labels"
                                htmlFor="clientName"
                            >
                                Designer
                            </label>
                            <select
                                id="clientName"
                                name="clientName"
                                className="new-room-modal-inputs"
                                onChange={(e) => handleFormInput(e)}
                                required
                            >
                                {designers.map(
                                    (designer: string, index: number) => {
                                        return (
                                            <option
                                                key={index}
                                                value={designer == 'Select from designers..' ? '' : designer}
                                            >
                                                {designer}
                                            </option>
                                        );
                                    }
                                )}
                                
                            </select>
                            <label
                                className="new-room-modal-labels"
                                htmlFor="status"
                            >
                                Status
                            </label>
                            <select
                                id="clientName"
                                name="status"
                                className="new-room-modal-inputs"
                                onChange={(e) => handleFormInput(e)}
                                required
                            >
                                {statuses.map(
                                    (status: string, index: number) => {
                                        return (
                                            <option
                                                key={index}
                                                value={status == 'Select a status..' ? '' : status}
                                            >
                                                {status}
                                            </option>
                                        );
                                    }
                                )}
                                
                            </select>
                            <label
                                className="new-room-modal-labels"
                                htmlFor="region"
                            >
                                Region
                            </label>
                            <select
                                id="region"
                                name="region"
                                className="new-room-modal-inputs"
                                onChange={(e) => handleFormInput(e)}
                                required
                            >
                                {regions.map(
                                    (region: string, index: number) => {
                                        if (region === 'Select from regions..') {
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
                                                value={region == 'Select from regions..' ? '' : region}
                                            >
                                                {region}
                                            </option>
                                        );
                                    }
                                )}
                                
                            </select>
                            <div className="new-room-modal-footer">
                                <button
                                    className="new-room-modal-button"
                                    onClick={(e)=> clearForm(e)}
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="new-room-modal-button"
                                >
                                    Create Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* hiiiiiiii!!!! */}
            </div>
        </div>
    );
};
