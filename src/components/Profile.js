
import { useState, useEffect,useRef, useContext } from "react"
import { UserContext, ContributerContext } from './exercises/MuscleContext';
import { createProfile,getProfile,updateProfile,getUsers } from '../utills/CRUD'
import Profileavatar from './ProfileAvatar'

import '../CSS/Profile.css'
const Profile = (props) => {
    // eslint-disable-next-line 
    const [user, setUser] = useContext(UserContext);
    // eslint-disable-next-line 
    const [contributer, setContributer] = useContext(ContributerContext);


    const formRef = useRef(null);

    const [hasProfile, setIsProfile] = useState('')
   

    //Can change--
    const [inputDisabled, setInputDisabled] = useState(true)
    //  const [avatar, setAvatar] = useState();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [adress1, setAdress1] = useState('');
    const [adress2, setAdress2] = useState('');
    const [adress3, setAdress3] = useState('');
    const [postalcode, setPostalcode] = useState('');
    const [city, setCity] = useState('');




    //Can change--
    //ftness attributes 
    const [heightval, setHeightval] = useState();
    const [weightval, setWeightval] = useState();
    const [BMI, setBMI] = useState(0);

    useEffect(() => {
        const fetchProfile = async () => {
            let token =await getToken()
            let userHasprofile = await getProfile(token)
            setIsProfile(userHasprofile)

            if(userHasprofile!==false){
                setAdress1(userHasprofile.address.addressLine1)
                setAdress2(userHasprofile.address.addressLine2)
                setAdress3(userHasprofile.address.addressLine3)
                setPostalcode(userHasprofile.address.postalCode)
                setCity(userHasprofile.address.city)
                setHeightval(userHasprofile.height)
                setHeightval(userHasprofile.weight)
            }
        }
        fetchProfile()
      }, [])

      //calculate BMI
      useEffect(() => {
        let BMI = (weightval / ((heightval * heightval) / 10000)).toFixed(2);
        setBMI(BMI);
    }, [heightval, weightval])







    useEffect(() => {
        console.log(user)
        setUsername(user.given_name)
        setEmail(user.email)
    }, [user])


    const onNameChange = (e) => {
        const name = e.target.value;
        setUsername(name);
    };
    const onEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onPasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
     
    const onHeightChange = (e) => {
        const height = e.target.value;
        setHeightval(height);
    };

    const onWeightChange = (e) => {
        const weight = e.target.value;
        setWeightval(weight);
    };

    const onAdress1Change = (e) => {
        const adress1 = e.target.value;
        setAdress1(adress1);
    };
    const onAdress2Change = (e) => {
        const adress2 = e.target.value;
        setAdress2(adress2);
    };
    const onAdress3Change = (e) => {
        const adress3 = e.target.value;
        setAdress3(adress3);
    };
    const onPostalcodeChange = (e) => {
        const postalcode = e.target.value;
        setPostalcode(postalcode);
    };
    const onCityChange = (e) => {
        const city = e.target.value;
        setCity(city);
    };


    //change profile settings
    const changeSettings = (e) => {
        e.preventDefault();

        const inputs = document.querySelectorAll('.cssgridform input')
        const updateBTN=document.querySelector('.updateBTN')
        const saveBTN=document.querySelector('.saveBTN')

        if (inputs[0].className === "") {
            setInputDisabled(false)
            inputs.forEach(input => {
                input.classList.add("inputEnabled");
                input.disabled = { inputDisabled }
        
              
            });
                updateBTN.innerHTML="Cansel";
                updateBTN.style.background="rgba(var(--lightreyblue),1)"
                saveBTN.style.display="block"
        } else {
            inputs.forEach(input => {
                setInputDisabled(true)
                input.classList.remove("inputEnabled")
                input.disabled = { inputDisabled }
                
                //Sweet hack for resetting styles on input after autocomplete
                let ev = new Event('change');
                let val=input.value
                input.value=val;
                input.dispatchEvent(ev);

            });
            formRef.current.blur()
            updateBTN.innerHTML="Update profile"
            updateBTN.style.background="rgba(var(--petrolium),1)"
            saveBTN.style.display="none"
        }

    }
    const ask=(e)=>{
        e.preventDefault();

    }
    const getToken=()=> {
        // Retrieves the user token from localStorage
        return localStorage.getItem('jwtToken');
      }
    
    const handleSumbit = async (e) => {
        //get the user 
        try {
            let token =await getToken()
            let user = await getUsers(token)
            //set the request for profile creation
            let reqCreate={
                userId: user.id,
                address: {
                addressLine1: adress1,
                addressLine2: adress2,
                addressLine3: adress3,
                postalCode: postalcode,
                city: city,
                country: "country"
                },
                weight: weightval,
                height: heightval
            }
            //set the request for profile update
            let reqUpdate={
                address: {
                addressLine1: adress1,
                addressLine2: adress2,
                addressLine3: adress3,
                postalCode: postalcode,
                city: city,
                country: "country"
                },
                weight: weightval,
                height: heightval
            }
          
            //if a user has no profile create it
            if(hasProfile===false){
            
            // eslint-disable-next-line no-unused-vars
            const res = await createProfile(token,reqCreate)
            const userProfile = await getProfile(token)
                if (userProfile!==false) {
                    console.log("userProfile from profile")
                    console.log(userProfile)
                    let ev = new Event('change');
                    changeSettings(ev);
                }

            
            }

            if(hasProfile!==false){ 
                const userProfileid = await getProfile(token)
               updateProfile(userProfileid.id,reqUpdate,token)
               let ev = new Event('change');
               changeSettings(ev);
                }
       

        } catch (error) {
            console.error(error);
        }


    }

   





    //return BMI type
    const whatTheBMI = (bmi) => {
        if (isNaN(bmi))
            return { __html: `<span class="normal"></span>` };
        if (bmi < 18.6)
            return { __html: `<span class="under">your BMI is ${bmi}<br> what do you call a thin T-Rex?<br>Ano-Rex...</span>` };
        else if (bmi >= 18.6 && bmi < 24.9)
            return { __html: `<span class="normal">your BMI is ${bmi} <br>You must be working out</span>` };
        else if (bmi >= 24.9 && bmi < 29.9)
            return { __html: `<span class="over">your BMI is ${bmi} <br><strong>Fatty Fatty boom-batty</strong></span>` };
        else
            return { __html: `<span class="obese">your BMI is ${bmi} <br><strong>You’re so fat, even Thanos couldn’t wipe you.</strong></span>` };
    }

    return (
        <div className="profileWrap">
            <div className="profile">
                <Profileavatar />
             
                    <form  ref={formRef} className="cssgridform" >
                        <div className="info">
                            <div className="name">
                                <input type="text" name="Name"
                              
                                    placeholder={"username: "}
                                    onChange={onNameChange}
                                    value={username}
                                    disabled={inputDisabled} />
                            </div>

                            <div className="email">
                                <input type="email" name="Email"
                                
                                    placeholder={email}
                                    onChange={onEmailChange}
                                    value={email}
                                    disabled={inputDisabled} />
                            </div>

                            <div className="password">
                                <input type="password" name="password"
                                
                                    placeholder={"password:"}
                                    onChange={onPasswordChange}
                                    value={password}
                                    disabled={inputDisabled} />
                            </div>
                            <div className="height">
                                <input type="txt" name="height"
                                
                                    placeholder={"height:"}
                                    onChange={onHeightChange}
                                    value={heightval}
                                    disabled={inputDisabled} />
                            </div>
                            <div className="weight">
                                <input type="txt" name="weight"
                                
                                    placeholder={"weight:"}
                                    onChange={onWeightChange}
                                    value={weightval}
                                    disabled={inputDisabled} />
                            </div>
                    
                        </div>



                        <div className="addresses">
                            <div className="Address1">
                                <input type="address" name="Address1"
                                    placeholder={"adress:"}
                                    onChange={onAdress1Change}
                                    value={adress1}
                                    disabled={inputDisabled} />
                            </div>

                            <div className="Address2">
                                <input type="address" name="Address2"
                                    placeholder={'adress:'}
                                    onChange={onAdress2Change}
                                    value={adress2}
                                    disabled={inputDisabled} />
                            </div>

                            <div className="Address3">
                                <input type="address" name="Address3"
                                    placeholder={'adress:'}
                                    onChange={onAdress3Change}
                                    value={adress3}
                                    disabled={inputDisabled} />
                            </div>

                            <div className="postal">
                                <input type="txt" name="postal"
                                    placeholder={'postalcode:'}
                                    onChange={onPostalcodeChange}
                                    value={postalcode}
                                    disabled={inputDisabled} />
                            </div>

                            <div className="city">
                                <input type="txt" name="city"
                                    placeholder={'city:'}
                                    onChange={onCityChange}
                                    value={city}
                                    disabled={inputDisabled} />
                            </div>
                        </div>




                    </form>
                    <div className="bmi" dangerouslySetInnerHTML={whatTheBMI(BMI)} /> 
                   {user.roles.includes("ROLE_CONTRIBUTOR")===false && <button className="PCTA contributerBTN" onClick={ask}>want to contribute ?</button>}
                    <button className="PCTA updateBTN" onClick={changeSettings}>Update profile</button>
                    <button className="PCTA saveBTN" style={{display:'none'}} onClick={handleSumbit}>SAVE PROFILE</button>
               
                
            </div>
        </div>
    );

}

export default Profile