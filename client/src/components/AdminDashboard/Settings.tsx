import React, { FC, useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';

import { axiosPrivate } from '../../api/axios';

const Settings: FC = () => {
    const [region, setRegion] = useState<string[]>([]);
    const [newRegion, setNewRegion] = useState<string>('');
    const [sortedRegion, setSortedRegion] = useState<string[]>([]);
    const [regionSort, setRegionSort] = useState<number>(0);

    const setSections = async () => {
        const axiosPriv = axiosPrivate();
        try {
            const regionCall = await axiosPriv.post('/public/s_r', {
                label: 'region',
            });

            if (regionCall) {
                setRegion(regionCall.data.data);
                setSortedRegion(regionCall.data.data);
            }

            setNewRegion('');
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
    const handleChange = (e: any, section: string) => {
        if (section == 'region') {
            setNewRegion(e.currentTarget.value);
        }
    };
    const handleSubmit = async (e: any, section: string) => {
        e.preventDefault();

        const submitVal = section === 'region' ? newRegion : '';
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
    const sortDisplay = () => {
        const directionCall: any = {
            0: '',
            1: <FaChevronUp className="sort-chevron" />,
            2: <FaChevronDown className="sort-chevron" />,
        };

        return directionCall[regionSort];
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

        setSortedRegion(sorted[direction]);
        setRegionSort(direction);
    };
    const triggerDirection = (field: string) => {
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
    };

    /**
     * /public/s_r
     * */
    useEffect(() => {
        setSections();
    }, []);
    return (
        <div className="dashboard-all-projects">
            <div className="add__materials">
                <div className="list__group field">
                    <input
                        className="form__field"
                        type="text"
                        value={newRegion}
                        onChange={(e) => handleChange(e, 'region')}
                    />
                    <label htmlFor="description" className="form__label">
                        Add region
                    </label>
                </div>
                <button
                    className={`new-material-button ${
                        newRegion.length < 1 ? 'disabled' : ''
                    }`}
                    onClick={(e) => handleSubmit(e, 'region')}
                >
                    <FaPlus className="submit-icon" />
                    Submit
                </button>
            </div>
            <table className="dashboard-all-projects-table">
                <thead className="table-headers">
                    <tr
                        className="rows"
                        onClick={() => triggerDirection('region')}
                    >
                        <td className="projects-table-name">Region</td>
                        <td className="projects-table-dots text-center">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {sortedRegion?.map((label, index) => {
                        return (
                            <tr key={index} className="projects-table-dynamic-row">
                                <td className="projects-table-dynamic-name">{label}</td>
                                <td className="projects-table-dynamic-dots text-center">
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
