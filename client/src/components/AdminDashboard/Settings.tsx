import React, { FC, useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';

import { axiosPrivate } from '../../api/axios';

const Settings: FC = () => {
    const [status, setStatus] = useState<string[]>([]);
    const [region, setRegion] = useState<string[]>([]);
    const [newStatus, setNewStatus] = useState<string>('');
    const [newRegion, setNewRegion] = useState<string>('');
    const [sortedStatus, setSortedStatus] = useState<string[]>([]);
    const [sortedRegion, setSortedRegion] = useState<string[]>([]);
    const [statusSort, setStatusSort] = useState<number>(0);
    const [regionSort, setRegionSort] = useState<number>(0);

    const setSections = async () => {
        const axiosPriv = axiosPrivate();
        try {
            const statusCall = await axiosPriv.post('/public/s_r', {
                label: 'status',
            });
            const regionCall = await axiosPriv.post('/public/s_r', {
                label: 'region',
            });

            if (statusCall) {
                setStatus(statusCall.data.data);
                setSortedStatus(statusCall.data.data)
            }

            if (regionCall) {
                setRegion(regionCall.data.data);
                setSortedRegion(regionCall.data.data)
            }

            setNewStatus('');
            setNewRegion('');
        } catch (error: any) {
            throw new Error(error.message)
        }
    };
    const handleChange = (e: any, section: string) => {
        if (section == 'status') {
            setNewStatus(e.currentTarget.value);
        } else if (section == 'region') {
            setNewRegion(e.currentTarget.value);
        }
    };
    const handleSubmit = async (e: any, section: string) => {
        e.preventDefault();

        const submitVal =
            section === 'status'
                ? newStatus
                : section === 'region'
                    ? newRegion
                    : '';
        const axiosPriv = axiosPrivate();

        try {
            const submitted = await axiosPriv.post('/internal/new-sr', {
                label: section,
                value: submitVal,
            });

            if (submitted) {
                setSections();
            }

            return submitted;
        } catch (error: any) {
            throw new Error(error.message);
        }

    };
    const removeSR = async (e: any, section: string, value: string) => {
        e.preventDefault();

        const axiosPriv = axiosPrivate();

        try {
            const submitted = await axiosPriv.post('/internal/delete-sr', {
                label: section,
                value: value,
            });

            if (submitted) {
                setSections();
            }

            return submitted;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
    const sortDisplay = (field: string) => {
        const directionCall: any = {
            0: '',
            1: <FaChevronUp className="sort-chevron" />,
            2: <FaChevronDown className="sort-chevron" />,
        };

        if (field == 'status') {
            return directionCall[statusSort];
        } else {
            return directionCall[regionSort];
        }
    };
    const setUpSortTrigger = (field: string, direction: number) => {
        const utilizedData: any = field == 'status' ? status : region;
        const sorted: any = {
            0: utilizedData,
            1: utilizedData.slice().sort((a: any, b: any) => {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            }),
            2: utilizedData.slice().sort((a: any, b: any) => {
                if (b < a) {
                    return -1;
                }
                if (b > a) {
                    return 1;
                }
                return 0;
            }),
        };

        if (field == 'status') {
            setSortedStatus(sorted[direction]);
            setStatusSort(direction);
        } else {
            setSortedRegion(sorted[direction]);
            setRegionSort(direction)
        }
    };
    const triggerDirection = (field: string) => {
        if (field == 'status') {
            if (statusSort == 0) {
                setStatusSort(1);
                setUpSortTrigger(field, 1);
            } else if (statusSort == 1) {
                setStatusSort(2);
                setUpSortTrigger(field, 2);
            } else {
                setStatusSort(0);
                setUpSortTrigger(field, 0);
            }
        } else {
            if (regionSort == 0) {
                setRegionSort(1);
                setUpSortTrigger(field, 1);
            } else if (regionSort == 1) {
                setRegionSort(2);
                setUpSortTrigger(field, 2);
            } else {
                setRegionSort(0);
                setUpSortTrigger(field, 0);
            }
        }
    };

    /**
     * /public/s_r
     * */
    useEffect(() => {
        setSections();
    }, []);
    return (
        <div className="settings_container">
            <div className="add__materials">
                <div className="list__group field">
                    <input
                        className="form__field"
                        placeholder="Add to status"
                        type="text"
                        value={newStatus}
                        onChange={(e) => handleChange(e, 'status')}
                    />
                    <label htmlFor="description" className="form__label">
                        Add to status
                    </label>
                </div>
                <button
                    className="new-material-button"
                    onClick={(e) => handleSubmit(e, 'status')}
                >
                    <FaPlus />
                    Submit
                </button>
            </div>
            <table className="users-table">
                <thead >
                    <tr className="users-table-headers settings-head" onClick={() => triggerDirection('status')}>
                        <td>Status</td>
                        <td>{sortDisplay('status')}</td>
                        <td>click to sort</td>
                        <td className="remove-td">Remove</td>
                    </tr>
                </thead>
                <tbody>
                    {sortedStatus?.map((label, index) => {
                        return (
                            <tr key={index} className="user-table-row">
                                <th>{label}</th>
                                <td></td>
                                <td></td>
                                <td className="remove-button-td">
                                    <button
                                        className="user-options-button"
                                        onClick={(e) =>
                                            removeSR(e, 'status', label)
                                        }
                                    >
                                        <AiOutlineCloseCircle />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="add__materials">
                <div className="list__group field">
                    <input
                        className="form__field"
                        placeholder="Add to region"
                        type="text"
                        value={newRegion}
                        onChange={(e) => handleChange(e, 'region')}
                    />
                    <label htmlFor="description" className="form__label">
                        Add to region
                    </label>
                </div>
                <button
                    className="new-material-button"
                    onClick={(e) => handleSubmit(e, 'region')}
                >
                    <FaPlus />
                    Submit
                </button>
            </div>
            <table className="users-table">
                <thead>
                    <tr className="users-table-headers settings-head" onClick={() => triggerDirection('region')}>
                        <td>Region</td>
                        <td>{sortDisplay('region')}</td>
                        <td>click to sort</td>
                        <td className="remove-td">Remove</td>
                    </tr>
                </thead>
                <tbody>
                    {sortedRegion?.map((label, index) => {
                        return (
                            <tr key={index} className="user-table-row">
                                <th>{label}</th>
                                <td></td>
                                <td></td>
                                <td className="remove-button-td">
                                    <button
                                        className="user-options-button"
                                        onClick={(e) =>
                                            removeSR(e, 'region', label)
                                        }
                                    >
                                        <AiOutlineCloseCircle />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Settings;
