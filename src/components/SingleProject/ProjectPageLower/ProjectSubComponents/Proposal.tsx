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

    console.log('Day: ', startDate);
    return (
        <div className="proposal-container">
           <form>
            
            <input type="text" placeholder='...'/>
           </form>
        </div>
    );
};

export default Proposal;

// ID
// quantity: PRELIMINARY
//             QTY
//         *VERIFY COUNTS*
// ROOM
// DESCRIPTION
// FINISH:
//         *PROVIDE METAL, CRYSTAL,
//         AND FRONSTED ACRYLIC SAMPLES*
// (LAMPS)
//     LAMP TYPE

//     LAMP
//     COLOR

//     WATTS
//     PER

//     TOTAL
//     WATTS

//     TOTAL
//     LAMPS LUMENS  
// PRICE PER
// TOTALPRICE              