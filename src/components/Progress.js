import {useState,useEffect} from 'react'
import '../CSS/Progress.css'

const Progress= props =>{
    const [endDate]=useState(props.enddate)
    const [startDate]=useState(props.startdate)
    const [percentWidth,setPercentWidth]=useState()


    
    useEffect(() => { 
        let start = new Date(startDate);
        let end = new Date(endDate);
        let today = new Date();
     
        let elapsed = today - start;
        let percent = (elapsed / (end - start)) * 100;

        if(Math.sign(percent)===-1){
            setPercentWidth(0)
        } else if (percent >= 100) {
            percent=100
        }else {
            setPercentWidth(percent)
        }
       
       // console.log('elapsed', elapsed, ' ms', percent, ' % complete');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 
return(
    <div className="progresswrap">
        
        <div className="progress_start_end clearfix">
            <div className="stardate">{startDate}<br/>|</div>
            <div className="enddate">{endDate}<br/>|</div>
        </div>

        <div className="progress ">
            <div className="progressbar" style={{width:percentWidth+"%"}}></div>
        </div>

    </div>
)
}
export default Progress