import React, { FC, useState } from 'react';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
// import DatePicker, { DayValue, DayRange, Day } from 'react-modern-calendar-datepicker'
// import "react-modern-calendar-datepicker/lib/DatePicker.css";
import 'react-quill/dist/quill.snow.css';


const Proposal: FC = () => {
    const [value, setValue] = useState('');
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
    //    let quill: any = null ;
    // const check = () => {
    //     if(quill){
    //     quill.getContent()
    //     }
    // }
    console.log("Day: ", startDate)
    return (<>
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
    />
    <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} /></>);
};

export default Proposal;
