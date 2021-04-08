
import { useContext, useState,useEffect } from 'react'
import { ContributerContext } from '../exercises/MuscleContext';
import {addWorkoutToGoal,getGoals} from '../../utills/CRUD'

import '../../CSS/WorkoutComponent.css'
import WorkoutDetail from './WorkoutDetail'
const WorkoutComponent = props => {
       let workout=props.exercises;

        const [contributer] = useContext(ContributerContext);
        const [theDate,setTheDate] = useState()
        //get goals id
        const [goals,setGoals]=useState([])

        const [refresh, setRefresh] = useState(1);
        const [count, setCount] = useState(1);
       
        useEffect(() => {
            if (refresh === 0) {
                setRefresh(1);
            }
        }, [refresh])
        useEffect(() => {
            setRefresh(0);
        }, [count]);
   
// eslint-disable-next-line 
const fetchGoals = async () => {
  
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




        const dateChange=(e)=>{
                const date = e.target.value;
                setTheDate(date)
        }
 
       
        const addToGoal = async (e) => {

                try {
                        
                let goalId=e.target.value
                const token = localStorage.getItem('jwtToken');
                const req=[{"workoutId": workout.id,"endDate": theDate}]
                let res = await addWorkoutToGoal(goalId,req,token)
        
                    if (res === 201) {
                        fetchGoals()
                    }
        
                } catch (error) {
                    console.error(error);
                }
        
            }



        return (
                <div className="workout">

                        <div className="workouthead">
                                <p>{workout.name}</p>
                                <p>{contributer}</p>
                        </div>

                        {refresh ?  <div className="addtoGoals clearfix">
                              {/*  <button className="CTA" onClick={addToGoal}>Add to Goals </button>*/}
                                <select name="action" id="action" className="wCTA"  onChange={addToGoal}> 
                                

                                {goals.map((id, index) => <option  key={index} value={goals[index].id}>{goals[index].id}</option>)}
                                </select> 
                               
                                <div className="datepicker-toggle">
                                        <input type="date" className="datepicker-input" onChange={dateChange}/>
                                </div>
                        </div>: null}

                        {contributer && (<div className="NewExercise">
                                add new Exercise<span className="addNewExercise">+</span>
                        </div>)}

                        <hr className="clearfix"></hr>

                        <div className="divider">
                                <WorkoutDetail className="workoutDetail" detail={workout.exerciseSets}/>

                        </div>
                        <span className="tri">▲</span>
                </div>


        )
}
export default WorkoutComponent