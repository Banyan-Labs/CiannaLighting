import React, { FC, useState } from 'react';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import "./style/proposal.scss"
// import DatePicker, { DayValue, DayRange, Day } from 'react-modern-calendar-datepicker'
// import "react-modern-calendar-datepicker/lib/DatePicker.css";
import 'react-quill/dist/quill.snow.css';

interface Schedule {
    date: Date | null;
    description: string;
    duration: string;
}


const Proposal: FC = () => {
    const [value, setValue] = useState('');
    const [schedule, setSchedule] = useState<Schedule[]>([])
    
    const [startDate, setStartDate] = useState(new Date());
    // const [selectedDay, setSelectedDay] = React.useState<DayValue>(null);
    // const [dayRange, setDayRange] = React.useState<DayRange>({
    //   from: null,
    //   to: null
    // });
    // const [days, setDays] = React.useState<Day[]>([]);
    console.log("quillValue: ",value)
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
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
    console.log("Day: ", startDate)
    return (<div className="proposal-container">
    <h1>Scedule input</h1>
    <div className='schedule-input'>
        <DatePicker
      selected={startDate}
      onChange={(date: Date) => setStartDate(date)}
      popperClassName="some-custom-class"
      popperPlacement="bottom-end"
      popperModifiers={[
        {
          name: "offset",
          options: {
            offset: [5, 10],
          },
        },
        {
          name: "preventOverflow",
          options: {
            rootBoundary: "viewport",
            tether: false,
            altAxis: true,
          },
        },
      ]}
      className='date-picker'
    />
    <textarea className='decription'></textarea>
    <input className='duration' type="text"></input>

    </div>
    <table className='users-table'>
    <thead>
                    <tr className="users-table-headers">
                        <td>Date</td>
                        <td>Description</td>
                        <td>Duration</td>
                        {/* <td></td> */}
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((cell,index) => {
                        const date = cell.date?.toISOString().split("T")[0].split("-");
                        const formatDate = date ? [date[1], date[2], date[0]].join('/') : ''
                        
                        
                        return (
                        <tr key={index} className="user-table-row">
                            <th>{formatDate}</th>
                            <td>{cell.description}</td>
                            <td>
                                {cell.duration}
                            </td>
                            {/* <td className="button-td">
                                <button className="user-options-button">
                                    <BsThreeDots />
                                </button>
                            </td> */}
                        </tr>
                    )})}
                </tbody>


    </table>
    <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} /></div>);
};

export default Proposal;
