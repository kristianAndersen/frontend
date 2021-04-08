/**Exercises view*/



import ExcrecisesList from './ExercisesList'
import '../../CSS/Exercises.css'
import MuscleFigure from '../MuscleFigure'


const Exercises =()=>{

return(

    <div className="ExercisesWrap clearfix">
       
            <div className="exList">
          
                <ExcrecisesList/>
            </div>
            <div className="exFigure">
            
            <MuscleFigure/>
            </div>
    
    </div>

)
}

export default Exercises