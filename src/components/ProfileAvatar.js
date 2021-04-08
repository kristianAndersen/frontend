
import '../CSS/Profileavatar.css'
import davatar from '../assets/images/default-avatar.png'
import { useState } from 'react'

const Profileavatar =()=>{
    const [avatar,SetAvatar]=useState(davatar);
  //  const [file,SetFile]=useState('');

    const uploadAvatar =(e)=> {
        console.log("wuu")
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
          //  SetFile(file)
            SetAvatar(reader.result)
        }
        reader.readAsDataURL(file);
      }

return(

    <div className="avatarWrap">
        <img  src={avatar} alt="default avatar" />
        
        <label htmlFor="file-upload" className="fileInput">
             <p className="uploadIcon"><span>&#8673;</span></p>
            </label>
        <input id="file-upload" type="file" onChange={(e)=>uploadAvatar(e)} />
    </div>
)
}

export default Profileavatar