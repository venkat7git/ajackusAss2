import { useState ,useEffect} from "react";
import UsersList from "../usersList";
import { useNavigate } from "react-router-dom";
import "./index.css"
import UserContext from "../ReactContext/context";

const usersListApi = [
    {
        id:"1232",
        firstName:"santhosh",
        lastName:"sirivennela",
        department:"computers"
    },
    {
        id:"1233",
        firstName:"sandhya",
        lastName:"sirivennela",
        department:"computers"
    }
]

const User = (props)=>{

    const navigate = useNavigate()

    const onClickAddUser = ()=>{
        navigate('/addUser')
    }
    
    return (
        <UserContext.Consumer>
            {value =>{
                const {usersList,apiStatus,apiConstants} = value

                const apiView =()=>{
                    switch(apiStatus){
                        case apiConstants.success:
                            return successView()
                        case apiConstants.failure:
                            return null
                        case apiConstants.inProgress:
                            return null
                        default:
                            return null
                    }
                }
                

                const successView = ()=>{
                    return (
                        <div className="main-container">
                <img className="user-image" src="https://res.cloudinary.com/dbb5puzve/image/upload/v1732102163/group_bjsdvp.png"/>
                {/* <h1 className="app-heading">User Details</h1> */}
    
                <div className="list-add-container">
                    <h1 className="users-list-heading">Users List</h1>
                    <button type="button" onClick={onClickAddUser} className="add-user-btn">Add</button>
                </div>
                <hr className="hori-line"/>
                <ul className="user-list-container">
                    {usersList.map(eachUser=>(<UsersList key = {eachUser.id} userDetails = {eachUser}/>))}
                </ul>
                
            </div>
                    )
                }

                return (
                <>
                    {apiView()}
                </>
                    
                )
                
            }}
            
        </UserContext.Consumer>
        

    )
}

export default User