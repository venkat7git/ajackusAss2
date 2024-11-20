import UserContext from '../ReactContext/context'
import './index.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const UsersList = (props)=>{
    const {id,firstName,lastName,email,department} = props.userDetails
    
    const [isEdit,setIsEdit] = useState(false)
    const [newFirstName,setFirstname] = useState(firstName)
    const [newLastName,setLastname] = useState(lastName)
    const [newEmail,setEmail] = useState(email)
    const [newDepartment,setDepartment] = useState(department)

    const onChangeFirstName = (event)=>{
        setFirstname(event.target.value)
    }
    const onChangeLastName = (event)=>{
        setLastname(event.target.value)
    }

    const onChangeDepartment = (event)=>{
        setDepartment(event.target.value)
    }
    const onChangeEmail = (event)=>{
        setEmail(event.target.value)
    }

    

    return (
        <UserContext.Consumer>
            {value =>{
                const {editUser,deleteUser,onUpdateUser} = value

               
                const onEditUser = ()=>{
                    setIsEdit(true)
                }

                const onClickSave = ()=>{
                    
                    const updatedValues = {
                        id:id,
                        firstName:newFirstName,
                        lastName:newLastName,
                        email:newEmail,
                        department:newDepartment
                    }
                    onUpdateUser(updatedValues,id)
                    setIsEdit(false)
                }

                const onDeleteUser = ()=>{
                    deleteUser(id)
                }
            
               


            return (
                <li className='list-item'>
            <p className='id'><span>Id: </span>{id}</p>
            {isEdit?<>
            <div className='input-container'>
            <label className='input-label' htmlFor='firstname'>First name</label>
            <br/>
            <input type='text' id='firstname' placeholder={firstName} onChange={onChangeFirstName} value={newFirstName} className='name-input'/>
            </div>
            <div className='input-container'>
            <label className='input-label' htmlFor='lastname'>Last name</label>
            <br/>
            <input type='text' id='lastname' placeholder={lastName} onChange={onChangeLastName} value={newLastName} className='name-input'/>
            </div>
            </>:<p className="name"><span>Name: </span>{`${firstName} ${lastName}`}</p>}

            {isEdit?
            <div className='input-container'>
            <label className='input-label' htmlFor='email'>Email</label>
            <br/><input id='email' placeholder={department} type='text' onChange={onChangeEmail} value={newEmail} className='department-input'/>
            </div>:<p className="department"><span>Email: </span>{email}</p>}
            {isEdit?<div className='input-container'><label className='input-label' htmlFor='department'>Department</label><br/><input id="department" placeholder={department} type='text' onChange={onChangeDepartment} value={newDepartment} className='department-input'/></div>:<p className="department"><span>Dept: </span>{department}</p>}
             

             <div className="buttons-container">
                {isEdit?<button type='button' onClick={onClickSave} className="edit-button">Save</button>:<button type='button' onClick={onEditUser} className="edit-button">Edit</button>
            
            }
                
                <button type='button' onClick={onDeleteUser} className="delete-button">Delete</button>
             </div>
    
            </li>
            )
                
            }}
        </UserContext.Consumer>
        
        
    )
    
}

export default UsersList