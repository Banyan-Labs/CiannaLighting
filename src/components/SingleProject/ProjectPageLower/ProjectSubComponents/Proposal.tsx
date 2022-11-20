import React, { FC, useState } from 'react';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style/proposal.scss';
// import DatePicker, { DayValue, DayRange, Day } from 'react-modern-calendar-datepicker'
// import "react-modern-calendar-datepicker/lib/DatePicker.css";
import 'react-quill/dist/quill.snow.css';

interface Schedule {
    date: Date | null;
    description: string;
    duration: string;
}

const Proposal: FC = () => {
    const [header, setHeader] = useState<string>('')
    const [startDate, setStartDate] = useState(new Date());
    const [description, setDescription] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [schedule, setSchedule] = useState<Schedule[]>([]);
    const [value, setValue] = useState<string>(''); // this is the RTF

    const setSection = (e: any): void => {
        const val = e.currentTarget.value;
        const name = e.currentTarget.name;
        if (name == 'description') {
            setDescription(val);
        } else if (name == 'duration') {
            setDuration(val);
        }
    };

    const addToSchedule = (e: any): void =>{
        e.preventDefault()
        const section: Schedule = {
            date: startDate,
            description: description,
            duration: duration
        }
        setSchedule([
            section,
            ...schedule
        ])
        setStartDate(new Date());
        setDescription('');
        setDuration('');
    }
    console.log('quillValue: ', value);
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            ['clean'],
        ],
    };
    /**
     * <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user._id} className="user-table-row">
                            <th>{user.name}</th>
                            <td>{user.email}</td>
                            <td>
                                {Object.entries(ROLES).map((role) => {
                                    if (role[1] === user.role) {
                                        if (role[0] === 'Cmd') {
                                            return 'Admin';
                                        } else if (role[0] === 'Int') {
                                            return 'Employee';
                                        } else {
                                            return role[0];
                                        }
                                    }
                                })}
                            </td>
                            <td className="button-td">
                                <button className="user-options-button">
                                    <BsThreeDots />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
     */
    console.log('Day: ', startDate);
    return (
        <div className="proposal-container">
            <div> 
                <h2 className='editor-label'> Request Header</h2>
            <ReactQuill
                theme="snow"
                value={header}
                onChange={setHeader}
                modules={modules}
            />
            <div className="ql-editor" dangerouslySetInnerHTML={{__html: header}}></div>
            </div>
            <div>
            <h2 className='editor-label'>Schedule Input</h2>
            <div className="schedule-input">
                <div className="input-container">
                    <div className="input-label">START DATE</div>
                    <div className="date-pick-container">
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                            popperClassName="some-custom-class"
                            popperPlacement="top-end"
                            popperModifiers={[
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [5, 10],
                                    },
                                },
                                {
                                    name: 'preventOverflow',
                                    options: {
                                        rootBoundary: 'viewport',
                                        tether: false,
                                        altAxis: true,
                                    },
                                },
                            ]}
                            className="date-picker"
                        />
                    </div>
                </div>
                <div className="input-container extra-marg">
                    <div className="input-label">DESCRIPTION</div>
                    <textarea
                        className="decription"
                        value={description}
                        rows={2}
                        cols={49}
                        wrap="soft"
                        maxLength={250}
                        name="description"
                        onChange={(e) => setSection(e)}
                    ></textarea>
                </div>
                <div className="input-container extra-marg">
                    <div className="input-label">DURATION</div>
                    <input
                        className="duration"
                        name="duration"
                        type="text"
                        value={duration}
                        onChange={(e) => setSection(e)}
                    ></input>
                </div>
                <button className="schedule-add" onClick={(e)=> addToSchedule(e)}>ADD</button>
            </div>
            <table className="users-table">
                <thead>
                    <tr className="users-table-headers">
                        <td>Date</td>
                        <td>Description</td>
                        <td>Duration</td>
                        {/* <td></td> */}
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((cell, index) => {
                        const date = cell.date
                            ?.toISOString()
                            .split('T')[0]
                            .split('-');
                        const formatDate = date
                            ? [date[1], date[2], date[0]].join('/')
                            : '';

                        return (
                            <tr key={index} className="user-table-row">
                                <th>{formatDate}</th>
                                <td>{cell.description}</td>
                                <td>{cell.duration}</td>
                                {/* <td className="button-td">
                                <button className="user-options-button">
                                    <BsThreeDots />
                                </button>
                            </td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
            <div>
                <h2 className='editor-label'>Request Body</h2>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
            />
            <div className="ql-editor" dangerouslySetInnerHTML={{__html: value}}></div>
            </div>
            <div>
            <h2 className='editor-label'>Attachments</h2>
            </div>
        </div>
    );
};

export default Proposal;
