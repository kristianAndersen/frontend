import React, {
    memo,
    useState,
    useEffect,
  } from "react";
import '../CSS/Slider.css'
const RangeSlider = memo( ({ classes, label, metric, onChange, value, ...sliderProps }) => {
      const [sliderVal, setSliderVal] = useState(0);
      const [mouseState, setMouseState] = useState(null);
  
      useEffect(() => {
        setSliderVal(value);
      }, [value]);
  
      const changeCallback = e => {
        setSliderVal(e.target.value);
      };
  
      useEffect(() => {
        if (mouseState === "up") {
          onChange(sliderVal);
        }
      }, [mouseState, onChange, sliderVal]);
    
      return (
        <div className="range-slider">
          <p>{label} {sliderVal} {metric}</p>
       
          <input
            type="range"
            value={sliderVal}
            {...sliderProps}
            className={`slider ${classes}`}
            id="myRange"
            onChange={changeCallback}
            onMouseDown={() => setMouseState("down")}
            onMouseUp={() => setMouseState("up")}
          />
        </div>
      );
    }
  );
  export default RangeSlider;