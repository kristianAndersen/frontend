import {useState}from "react";

import {format} from "date-fns";
import {startOfWeek} from "date-fns";
import {addDays} from "date-fns"


import ProgramComponent from './programs/ProgramComponent'
import Workout from './workout/Workout'
import Goals from './goals/Goals'

import '../CSS/Dashboard.css'


const Dashboard =() => {
    
  // eslint-disable-next-line
    const [currentMonth,setCurrentMonth]=useState(new Date())
   
    const renderDays=()=> {
        const dayFormat = "E";
     
        const days = [];
    
        let startDay = startOfWeek(currentMonth);
  
        for (let i = 0; i < 7; i++) {
            let day=format(addDays(startDay, i), dayFormat)
        
          days.push(
            <div className="col col-center" key={i}>
              {day}
            </div>
          );
        }
    
        return <div className="days row">{days}</div>;
      }

    return(
        <div className="row">
              {renderDays()}
            <div className="column c1">
              <Goals/>
            </div>
            <div className="column c2">
            <ProgramComponent/>
            </div>
                <div className="column c3">
            <Workout/>
            </div>
      
       </div>

    );
}

export default Dashboard