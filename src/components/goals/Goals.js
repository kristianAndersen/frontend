
import { useState, useEffect } from 'react'
import { getGoals } from '../../utills/CRUD'
import GoalComponent from './GoalComponent'
import '../../CSS/Goal.css'
import {addNewGoal} from '../../utills/CRUD'
const Goals = () => {
   // const [token, setToken] = useState()
    const [goals,setGoals]=useState([])
    const [endDate,setEndDate] =useState()
    const [startDate,setStartDate]=useState()
    const [refresh, setRefresh] = useState(1);
    const [count, setCount] = useState(1);
    

     // eslint-disable-next-line 
     const fetchGoals = async () => {
        console.log("Fetchingh Goals")
        try {

            let token =  await localStorage.getItem('jwtToken');
            let goalsList= await  getGoals(token)
            //if user has goals
            if (goalsList) {
                
                setGoals(goalsList)
                setCount(count + 1)
            }else{
                console.log("buuuh you suck")
            }
            

        } catch (error) {
            console.error(error);
        }
    }
    // eslint-disable-next-line 
    useEffect(() => { fetchGoals(); }, []);

   
    useEffect(() => {
        if (refresh === 0) {
            setRefresh(1);
        }
    }, [refresh])
    useEffect(() => {
        setRefresh(0);
    }, [count]);



const startDateChange=(e)=>{
    const sdate = e.target.value;
    setStartDate(sdate)
}
const endDateChange=(e)=>{
    const edate = e.target.value;
    setEndDate(edate)
}    



const addAgoal = async () => {

    try {
        let req={
            "endDate": endDate,
            "startDate": startDate
        }
        const token = localStorage.getItem('jwtToken');
        let res = await addNewGoal(token,req)
        console.log(res)
        if (res === 201) {
            fetchGoals()
        }

    } catch (error) {
        console.error(error);
    }


}





return(
    <div className="goalWrap">
    <div className="datepicker-toggle gwDP1">
         <input type="date" className="datepicker-input" onChange={startDateChange}/>
    </div>
    <div className="datepicker-toggle gwDP2">
         <input type="date" className="datepicker-input" onChange={endDateChange}/>
    </div>
        <button className="goalCTA" onClick={addAgoal}>Add a goal</button>

        {refresh ? <div> {goals.map((id, index) => <GoalComponent key={index} goal={goals[index]}/>)} </div>: null}

    </div>
)

}


export default Goals
///api/v1/goals/1/goalworkouts