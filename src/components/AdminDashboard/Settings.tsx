import React, { FC, useEffect, useState } from 'react';
import { axiosPrivate } from '../../api/axios';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Settings: FC = () => {
    const [status, setStatus] = useState<string[]>([]);
    const [region, setRegion] = useState<string[]>([]);
    const [newStatus, setNewStatus] = useState<string>('');
    const [newRegion, setNewRegion] = useState<string>('');

    const setSections = async () => {
        const axiosPriv = await axiosPrivate();
        try {
            const statusCall = await axiosPriv.post('/public/s_r', {
                label: 'status',
            });
            const regionCall = await axiosPriv.post('/public/s_r', {
                label: 'region',
            });
            setStatus(statusCall.data.data);
            setRegion(regionCall.data.data);
            setNewStatus('');
            setNewRegion('');
        } catch (error: any) {
            console.log('error sr: ', error.message);
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
        const axiosPriv = await axiosPrivate();
        try {
            const submitted = await axiosPriv.post('/internal/new-sr', {
                label: section,
                value: submitVal,
            });
            console.log('submitted: ', submitted);
        } catch (error: any) {
            console.log('error submitNew: ', error.message);
        }
        setSections();
    };
    const removeSR = async (e: any, section: string, value: string) => {
        e.preventDefault();
        const axiosPriv = await axiosPrivate();
        try {
            const submitted = await axiosPriv.post('/internal/delete-sr', {
                label: section,
                value: value,
            });
            console.log('submitted delete: ', submitted);
        } catch (error: any) {
            console.log('error submitNew: ', error.message);
        }
        setSections();
    };

    /**
     * /public/s_r
     * */
    useEffect(() => {
        setSections();
    }, []);
    return (
        <div style={{ marginTop: '100px' }}>
            <input
                type="text"
                placeholder="Add to status here..."
                value={newStatus}
                onChange={(e) => handleChange(e, 'status')}
            ></input>
            <button onClick={(e) => handleSubmit(e, 'status')}>submit</button>
            <table className="users-table">
                <thead>
                    <tr className="users-table-headers">
                        <td>Status</td>
                        <td></td>
                        <td></td>
                        <td className="remove-td">Remove</td>
                    </tr>
                </thead>
                <tbody>
                    {status?.map((label, index) => {
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
            <input
                type="text"
                placeholder="Add to region here..."
                value={newRegion}
                onChange={(e) => handleChange(e, 'region')}
            ></input>
            <button onClick={(e) => handleSubmit(e, 'region')}>submit</button>
            <table className="users-table">
                <thead>
                    <tr className="users-table-headers">
                        <td>Region</td>
                        <td></td>
                        <td></td>
                        <td className="remove-td">Remove</td>
                    </tr>
                </thead>
                <tbody>
                    {region?.map((label, index) => {
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
