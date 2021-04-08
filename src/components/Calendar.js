import React ,{useState}from "react";
import {format} from "date-fns";
import {startOfWeek} from "date-fns";
import {addDays} from "date-fns"
import {startOfMonth} from "date-fns"
import {endOfMonth} from "date-fns"
import {endOfWeek} from "date-fns"
import {isSameDay} from "date-fns"
import {isSameMonth} from "date-fns"
import {addMonths} from "date-fns"
import {subMonths} from "date-fns"
import '../CSS/Calendar.css'

const Calendar=()=>{
     
        const [currentMonth,setCurrentMonth] = useState(new Date());
        const [selectedDate,setSelectedDate] = useState(new Date());

     

    const renderHeader=()=> {
      const dateFormat = "MMMM yyyy";
  
      return (
        <div className="header row flex-middle">
          <div className="col col-start">
            <div className="icon" onClick={prevMonth}>
            &#60;
            </div>
          </div>
          <div className="col col-center">
            <span>{format(currentMonth, dateFormat)}</span>
          </div>
          <div className="col col-end" onClick={nextMonth}>
            <div className="icon"> &#62; </div>
          </div>
        </div>
      );
    }
  
    const renderDays=()=> {
      const dateFormat = "	E";
      const days = [];
  
      let startDate = startOfWeek(currentMonth);
  
      for (let i = 0; i < 7; i++) {
        days.push(
          <div className="col col-center" key={i}>
            {format(addDays(startDate, i), dateFormat)}
          </div>
        );
      }
  
      return <div className="days row">{days}</div>;
    }
   
    const renderCells=()=> {
      
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(monthStart);
      const startDate = startOfWeek(monthStart);
      const endDate = endOfWeek(monthEnd);
        
      const dateFormat = "d";
      const rows = [];
  
      let days = [];
      let day = startDate;
      let formattedDate = "";
  
      while (day <= endDate) {

        for (let i = 0; i < 7; i++) {
          formattedDate = format(day, dateFormat);
          const cloneDay = day;
     
          days.push(
            <div
              className={`col cell ${
                !isSameMonth(day, monthStart)
                  ? "disabled"
                  : isSameDay(day, selectedDate) ? "selected" : ""
              }`}
              key={day} onClick={() => onDateClick(cloneDay)}
            >
              <span className="number">{formattedDate}</span>
            </div>
          );
          day = addDays(day, 1);
        }
        rows.push(
          <div className="row" key={day}>
            {days}
          </div>
        );
        days = [];
      }
      return <div className="Calbody">{rows}</div>;
    }
  
    const onDateClick = day => {
       
        setSelectedDate(day)
      
    };
  
    const nextMonth = () => {

      setCurrentMonth(addMonths(currentMonth,1))
    };
  
    const prevMonth = () => {

      setCurrentMonth(subMonths(currentMonth, 1))
    };
  
   // render() {
      return (
        <div className="calendar">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
      );
    }
 // }
  
  export default Calendar;