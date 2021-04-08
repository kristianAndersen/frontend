
import axios from 'axios'
import { API_URL, API_EXERCISES, API_WORKOUTS ,API_PROFILES,API_USERS,API_GOALS} from './APICalls'

export const getExercises = (token) => {
    return axios.get(API_URL + API_EXERCISES,{
        headers: {"Authorization" : `Bearer ${token}`} 
     })
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        })
}

export const getExercisesById = (idNum,token) => {
    return axios.get(API_URL + API_EXERCISES + idNum,{
        headers: {"Authorization" : `Bearer ${token}`} 
     })
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        })
}

export const updateExercises = (idNum, req,token) => {
   
    return axios.patch(API_URL + API_EXERCISES + idNum, req,{
        headers: {"Authorization" : `Bearer ${token}`} 
     })
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        })
}

export const addExercisesToGoal = (req,token) => {
    return axios.post(API_URL + API_EXERCISES, req,{
        headers: {"Authorization" : `Bearer ${token}`} 
     })
        .then(response => response.status)
        .catch((error) => {
            console.log(error);
        })
}



export const createExercises = (req,token) => {
    return axios.post(API_URL + API_EXERCISES, req,{
        headers: {"Authorization" : `Bearer ${token}`} 
     })
        .then(response => response.status)
        .catch((error) => {
            console.log(error);
        })
}

export const deleteExercises = (idNum,token) => {
    return axios.delete(API_URL+API_EXERCISES+idNum,{
        headers: {"Authorization" : `Bearer ${token}`} 
     })
        .then(response => response)
        .catch((error) => {
            console.log(error);
        })
}


export const getWorkouts = (token) => {
    return axios.get(API_URL + API_WORKOUTS,{
        headers: {"Authorization" : `Bearer ${token}`} 
     })
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        })
}


export const getWorkoutsWithId = (url,token) => {
    return axios.get(API_URL + url,{
        headers: {"Authorization" : `Bearer ${token}`} 
     })
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        })
}



export const getUsers = (token)=>{
    return axios.get(API_URL+API_USERS,{
        headers: {"Authorization" : `Bearer ${token}`} 
     })
    .then(response => response.data)
    .catch((error) => {
        console.log(error);
    })
}



export const getProfile = (token)=>{
    
    return axios.get(API_URL+API_PROFILES,{
         headers: {"Authorization" : `Bearer ${token}`} 
      })
    .then(response => response.data)
    .catch((error) => {
        console.log(error);
        return false
    })
}


export const updateProfile = (idNum,req,token)=>{
 
    return axios.patch(API_URL+API_PROFILES+idNum,req,{
         headers: {"Authorization" : `Bearer ${token}`} 
      })
    .then(response => response.data)
    .catch((error) => {
        console.log(error);
        return false
    })
}



export const createProfile = (token,req)=>{
    return axios.post(API_URL + API_PROFILES,req,{
        headers: {"Authorization" : `Bearer ${token}`} 
     })
    .then(response => response.data)
    .catch((error) => {
        console.log(error);
    })
}


export const getGoals = (token)=>{
    
    return axios.get(API_URL+API_GOALS,{
         headers: {"Authorization" : `Bearer ${token}`} 
      })
    .then(response => response.data)
    .catch((error) => {
        console.log(error);
 
    })
}



export const addNewGoal = (token,req)=>{
  
        return axios.post(API_URL+API_GOALS,req,{
             headers: {"Authorization" : `Bearer ${token}`} 
          })
        .then(response => response.status)
        .catch((error) => {
            console.log(error);
        
        })
    }

export const addWorkoutToGoal = (idNum,req,token)=>{

    return axios.post(API_URL+API_GOALS+idNum+'/goalworkouts/',req,{
         headers: {"Authorization" : `Bearer ${token}`} 
      })
    .then(response => response.data)
    .catch((error) => {
        console.log(error);
    
    })
}