import { useState, useEffect, useContext } from 'react'
import { getExercises, createExercises } from '../../utills/CRUD'
import ExercisesComponent from './ExercisesComponent'
import { ContributerContext,MusclesListContext } from './MuscleContext';


const ExcrecisesList = () => {
    const [contributer] = useContext(ContributerContext);

    const [exerciseslist, setExerciseslist] = useState([]);
    // eslint-disable-next-line 
    const [musclesList] = useContext(MusclesListContext);

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
    const fetchExercises = async () => {
        console.log("Fetchingh")
        try {
            let token =  await localStorage.getItem('jwtToken');
            let exercises = await getExercises(token);

            if (exercises) {

                setExerciseslist(exercises)
                setCount(count + 1)
            }


        } catch (error) {
            console.error(error);
        }
    }
    // eslint-disable-next-line 
    useEffect(() => { fetchExercises(); }, []);

    //a muscles group have been clicked in the SVG figure now sort the excercise List
    const sortExcerciseList = (sortOn) => {
        let classname = document.getElementsByClassName('excercise');

        let divs = [];
        for (var i = 0; i < classname.length; ++i) {
            divs.push(classname[i]);
        }
        divs.sort(function (a, b) {
            var an = a.getAttribute('data-muscl'),
                bn = sortOn;

            if (an !== bn)
                return 1;
            if (an === bn)
                return -1;
            return 0;
        });


        let ul = document.querySelector(".exlist");

        divs.forEach(function (el) {
            ul.appendChild(el);
        });


    }

    //a muscles group have been clicked in the SVG figure now sort the excercise List
    useEffect(() => {
        sortExcerciseList(musclesList);
    }, [musclesList]);

    const addExercise = async () => {

        try {
            let req = {
                name: "A Exercises name",
                description: "A description",
                targetMuscleGroup: "ABC target muscle group",
                image: null,
                videoUrl: null
            }
            const token = localStorage.getItem('jwtToken');
            let res = await createExercises(req,token)

            if (res === 201) {
                fetchExercises()
            }

        } catch (error) {
            console.error(error);
        }


    }


    return (

        <div className="">
            {contributer && <button onClick={addExercise}>Add new Exercise</button>}
            {refresh ? <ul className="exlist">
                {exerciseslist.map((exercises, index) => <ExercisesComponent key={index} exercises={exercises} />)}
            </ul> : null}
        </div>
    )

}

export default ExcrecisesList
