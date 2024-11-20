import { useNavigate,Link } from "react-router-dom";
import './index.css';
import { useState } from "react";

import UserContext from "../ReactContext/context";
let userId = 1000;
const UserAdd = (props)=>{
    
    const {onSendUser} = props

    const navigate = useNavigate()

    const [userFirstName,setFirstname] = useState("");
    const [userLastName,setLastName] = useState("");
    const [userEmail,setEmail] = useState("")
    const [userDepartment,setDepartment] = useState("")
    const [isSuccess,setisSucces] = useState(false)
    const [successMsg,setSuccessMsg] = useState()


    const onChangeFirstName = (event)=>{
        setFirstname(event.target.value)
        
    }
    
    const onChangeLastName = (event)=>{
        setLastName(event.target.value)
    }

    const onChangeDepartment = (event)=>{
        setDepartment(event.target.value)
    }

    const onChangeEmail = (event)=>{
        setEmail(event.target.value)
    }
    
    
    return (
        <UserContext.Consumer>
            { value =>{
                const {newUser,onAddUser} = value
                
                const onSubmitForm = async (event)=>{

                    event.preventDefault()
                    userId += 1
                    
                    const newUserobj = {
                        id:userId,
                        firstName:userFirstName,
                        lastName:userLastName,
                        email:userEmail,
                        department:userDepartment
                    }

                    try{
                        const url = "https://my-json-server.typicode.com/venkat7git/AjackusAss2/users"
                        const options = {
                            method : "POST",
                            body:JSON.stringify(newUserobj)
                        }

                        const response = await fetch(url,options)
                        const dbResp = await response.json()
                        console.log(dbResp)
                        console.log("success")
                        setSuccessMsg("User added Successfully")

                    }catch(e){
                        console.log(e)
                        setSuccessMsg("post request failed")
                    }
                    

                    console.log(newUserobj)
                    onAddUser(newUserobj)
                    setisSucces(true)
                    
                }
                return (
                    <div className="add-user-container">
                <form onSubmit={onSubmitForm} className="user-form">
                    
                    <h1 className='add-user-heading'>Add User</h1>
                    <div className='input-container'>
                        <label htmlFor='firstName'>First Name</label>
                        <br/>
                        <input placeholder="Enter First Name" onChange={onChangeFirstName} value={userFirstName} type="text" id="firstName" required/>
                    </div>
                    <div className='input-container'>
                        <label htmlFor='lastName'>Last Name</label>
                        <br/>
                        <input placeholder="Enter Last Name" onChange={onChangeLastName} value={userLastName} type="text" id="lastName" required/>
                    </div>
                    <div className='input-container'>
                        <label htmlFor='email'>Email</label>
                        <br/>
                        <input placeholder="Enter email" onChange={onChangeEmail} value={userEmail} type="email" id="email" required/>
                    </div>
                    <div className='input-container'>
                        <label htmlFor='department'>Department</label>
                        <br/>
                        <input placeholder="Enter Department" onChange={onChangeDepartment} value={userDepartment} type="text" id="department" required/>
                    </div>
                    <button type="submit" className='add-user-button'>Add</button>
                    {isSuccess && <div className="success-message">
                        <p className="success-para">{successMsg}</p>
                        <Link to='/'>User list</Link>
                    </div>}
                    
                </form>
            </div>
                )
            }
                
            }
            
        </UserContext.Consumer>
        
        
    )
}

export default UserAdd