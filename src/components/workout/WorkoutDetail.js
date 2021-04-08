import {useState,useEffect} from 'react'
import WorkoutDetailComponent from './WorkoutDetailComponent'

const Workoutdetail=props=>{


const [detail,setDetail]=useState();

useEffect(() => {
  setDetail(props.detail);
}, [props]);

    return(
      <ul className="exlist">
        
   {detail && detail.map((details, index) => <WorkoutDetailComponent key={index} thedetail={details} order={index}/>)}  
    </ul>
    )
}

export default Workoutdetail