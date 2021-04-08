import { useEffect,useContext,useState } from 'react'
import { getWorkouts } from '../../utills/CRUD'

import WorkoutComponent from './WorkoutComponent'
import { WorkoutListContext } from '../exercises/MuscleContext';

import '../../CSS/Workout.css'
const Workout = () => {

   // const [workoutList, setWorkoutList] = useState([]);
    const [workoutList,setWorkoutList]= useContext(WorkoutListContext);
    const [isWorkout,setIsWorkout]=useState(false)

    const fetchWorkouts = async () => {
        try {
            let token =  await localStorage.getItem('jwtToken');
            const workouts = await getWorkouts(token);
       
            setWorkoutList(workouts);
        } catch (error) {
            console.error(error);
        }
    }
    // eslint-disable-next-line 
    useEffect(() => { fetchWorkouts(); }, []);
   
    //If url path is workouts restrict width of component
    useEffect(() => {
        let path = (new URL(document.location)).pathname; 
       if(path==="/workouts"){
        setIsWorkout(true)
       }
       
       },[isWorkout]);

     

    return (
        
        <div className={isWorkout ? 'workoutWrap' : ''}>
            <ul className="Workoutlist">

                {workoutList.map((workouts, index) => <WorkoutComponent key={index} exercises={workouts} />)}
            </ul>
        </div> 
    )
}
export default Workout