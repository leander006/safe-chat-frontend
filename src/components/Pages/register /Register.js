import axios from 'axios';
import { useState } from 'react';

import './register.css'
import Navbar from '../../Navbar /Navbar';
import Footer from '../../footer/Footer';

import { Link, useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [email, setEmail] = useState("");

  // const [img, setImg] = useState(null);
  // const [url, setUrl] = useState("");
  // const [uploading, setUploading] = useState(false);
  // const toast = useToast()

// const handleImageValidation = async (e) =>{
//     const file = e.target.files[0]
//     if(file.size>1048576)
//     {
//       setImg(null)
//       return toast({

//         description: "Cannot upload image",
//         status: 'warning',
//         duration: 5000,
//         isClosable: true,
//       })
//     }
//     else{
//       setImg(file)
//     }


// }

// const uploadImg = async (e) =>{
//   e.preventDefault()
//   if(!img)
//   {
//     setUrl("")
//     return
//   }
//   const data = new FormData();
//   data.append("file",img)
//   data.append("upload_preset",'blogwebsite')
//   setUploading(true)
//   fetch("https://api.cloudinary.com/v1_1/dj-sanghvi-college/image/upload",{
//     method:'post',
//     body:data
//   }).then((res) => res.json())
//     .then((data) =>{
//       setUploading(true)
//       setUrl(data.url)
//       toast({

//         description: "image upload successfully",
//         status: 'success',
//         duration: 5000,
//         isClosable: true,
//       })
//     }).catch((err) =>{
//       setUploading(false)
//       console.log(err);
//     })
//   }
const handlSubmit = async(e) =>{
  e.preventDefault();

  try {
    const res= await axios.post('http://localhost:4000/api/auth/register',{
      username,
      email,
      password,
    });


    // toast({

    //   description: "Login successfully",
    //   status: 'success',
    //   duration: 5000,
    //   isClosable: true,
    // }) 
    
    setUsername("");
    setPassword("");
    setEmail("");

    navigate('/login');



  } catch (error) {
    // if(!username)
    // {
    //   toast({
    //   description: "Enter Username ",
    //   status: 'error',
    //   duration: 5000,
    //   isClosable: true,
    // })

    // }
    // if(!password)
    // {
    //   toast({
    //   description: "Enter Password ",
    //   status: 'error',
    //   duration: 5000,
    //   isClosable: true,
    // })

    // }
    // else{
//     toast({  

//       description: "Wrong Credentials",
//       status: 'warning',
//       duration: 5000,
//       isClosable: true,
//     })
//   }
  }
}

  return (
    <>
    <Navbar/>
    <section>
        <div className="register">
        <div className="col-2">
                 <h1 id='h1'>Create an account and </h1>
                 <h1 id='h2'>spill out all your secrets</h1>
            </div>
            <div className="col-1">
                <form id='form' className='flex flex-col'onSubmit={handlSubmit} >
                <h2>Sign In</h2>
                <span>Register and let's go</span>
               <div className="input-box">
                  <i className="fas fa-2xl fa-user"></i>
                  <input type="text" placeholder="Enter your name" onChange={e=>setUsername(e.target.value)}   required/>
                </div>

                <div className="input-box">
                <i className="fas fa-2xl fa-envelope"></i>
                <input type="text" placeholder="Enter your email" onChange={e=>setEmail(e.target.value)}  required/>
                </div>

                <div className="input-box">
                <i className="fas fa-2xl fa-lock"></i>
                <input type="password" placeholder="Enter your password" onChange={e=>setPassword(e.target.value)} required/>
                </div>
                    <button className='btn'>Sign In</button>
                    <p className="sign-up-text">Have a acocunt?<Link to='/login'><label >Login now</label></Link></p>
                </form>

            </div>
        </div>
    </section>
<Footer/>
</>
  )
}

export default Register