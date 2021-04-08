import React, { useState, createContext } from "react";

export const MusclesFigureContext = createContext();
export const MusclesListContext = createContext();

export const WorkoutListContext = createContext();

export const UserContext = createContext();
export const ContributerContext = createContext();
export const AdminContext = createContext();
export const ProfileContext = createContext();

export const MusclesProvider = props => {

    //context for user/roles
    const [user, setUser] = useState();
    const [contributer, setContributer] = useState();
    const [admin, setAdmin] = useState();

    const [hasProfile, setHasProfile] = useState();


    //context for SVG Figure
    const [musclegroup, setMusclegroup] = useState(["front"]);
    //context for excercise List
    const [musclesList, setMusclesList] = useState(["front"]);

    const [workoutList,setWorkoutList]=useState(['']);

    return (
        <AdminContext.Provider value={[admin, setAdmin]}>
            <ContributerContext.Provider value={[contributer, setContributer]}>
                <UserContext.Provider value={[user, setUser]}>
                    <ProfileContext.Provider value={[hasProfile, setHasProfile]}>

                    < WorkoutListContext.Provider value={[workoutList, setWorkoutList]}>

                        < MusclesFigureContext.Provider value={[musclegroup, setMusclegroup]}>
                            <MusclesListContext.Provider value={[musclesList, setMusclesList]}>
                                {props.children}
                            </MusclesListContext.Provider>
                        </ MusclesFigureContext.Provider>

                        </WorkoutListContext.Provider>
                    
                    </ProfileContext.Provider>
                </UserContext.Provider>
            </ContributerContext.Provider>
        </AdminContext.Provider>
    );
};

