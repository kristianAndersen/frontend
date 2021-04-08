import { useState } from "react"
import Progress from '../Progress'

import '../../CSS/GoalComponent.css'

const GoalComponent= props => {

    const [goal]=useState(props.goal)
    const [endDate]=useState(props.goal.endDate)
    const [startDate]=useState(props.goal.startDate)
    const [completed]=useState(props.goal.completed)
    const [goalWorkouts]=useState(props.goal.goalWorkouts)
    
    
    return(
        <div className="GCWrap">
            <div className="gID">{goal.id}</div>
            {completed && <div className="completeicon">&#x2713;</div>}
           {completed===false && <Progress startdate={startDate} enddate={endDate}/>}
           {goalWorkouts.map((id, index) => <p  key={index}>{goalWorkouts[index].workout}</p>)}

        </div>
    )
}
export default GoalComponent