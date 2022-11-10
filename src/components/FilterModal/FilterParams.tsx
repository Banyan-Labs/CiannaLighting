import React, { FC, FormEvent, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { getFilteredProjects } from '../../redux/actions/projectActions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
    closeModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: boolean;
};

export const FilterModal: FC<Props> = ({ closeModal, openModal }) => {
    const { allProjects } = useAppSelector(({ project }) => project);
    const [formDetails, setFormDetails] = useState({
        clientName: '',
        status: '',
        region: '',
    });
    const [submittalForm, setSubmittalForm] = useState<any>({});

    const filterInfo = allProjects
        .slice()
        .map((project) => [project.clientName, project.status, project.region]);
    const designers = [
        'Select from designers..',
        ...filterInfo
            .slice()
            .map((project) => project[0])
            .filter((x, c, r) => c === r.lastIndexOf(x)),
    ];
    const statuses = [
        'Select a status..',
        ...filterInfo
            .slice()
            .map((project) => project[1])
            .filter((x, c, r) => c === r.lastIndexOf(x)),
    ];
    const regions = [
        'Select from regions..',
        ...filterInfo
            .slice()
            .map((project) => project[2])
            .filter((x, c, r) => c === r.lastIndexOf(x)),
    ];

    const dispatch = useAppDispatch();

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
    };

    const clearForm = () => {
        setFormDetails({
            clientName: '',
            status: '',
            region: '',
        });
        setSubmittalForm({});
        const designers = document.getElementById(
            'clientName'
        ) as HTMLSelectElement | null;
        designers ? (designers.selectedIndex = 0) : designers;

        const statuses = document.getElementById(
            'status'
        ) as HTMLSelectElement | null;
        statuses ? (statuses.selectedIndex = 0) : statuses;

        const regions = document.getElementById(
            'region'
        ) as HTMLSelectElement | null;
        regions ? (regions.selectedIndex = 0) : regions;
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await dispatch(getFilteredProjects(submittalForm));
            clearForm();
            closeModal(!openModal);
        } catch (err) {
            console.log('Error in submit: ' + err);
        }
    };

    return (
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
                        <h3 className="modal-title">Filters</h3>
                    </div>
                    <div className="new-room-modal-body">
                        <form onSubmit={onSubmit} id="filter-form">
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
                            >
                                {designers.map(
                                    (designer: string, index: number) => {
                                        return (
                                            <option
                                                key={index}
                                                value={
                                                    designer ==
                                                    'Select from designers..'
                                                        ? ''
                                                        : designer
                                                }
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
                                id="status"
                                name="status"
                                className="new-room-modal-inputs"
                                onChange={(e) => handleFormInput(e)}
                            >
                                {statuses.map(
                                    (status: string, index: number) => {
                                        return (
                                            <option
                                                defaultValue={'None'}
                                                key={index}
                                                value={
                                                    status ==
                                                    'Select a status..'
                                                        ? ''
                                                        : status
                                                }
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
                            >
                                {regions.map(
                                    (region: string, index: number) => {
                                        return (
                                            <option
                                                key={index}
                                                value={
                                                    region ==
                                                    'Select from regions..'
                                                        ? ''
                                                        : region
                                                }
                                            >
                                                {region}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                            <div className="new-room-modal-footer">
                                <button
                                    id="reset-button"
                                    className="reset-button"
                                    onClick={() => clearForm()}
                                    type="reset"
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="new-room-modal-button"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
