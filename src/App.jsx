import { useState,useEffect } from 'react'
import {Navigate,BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import User from './user'
import UserAdd from './addUser'
import UserContext from './ReactContext/context'



import './App.css'

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


const apiConstants = {
    initial:"INITIAL",
    success:"SUCCESS",
    failure:"FAILURE",
    inProgress:'IN-PROGRESS'
}

const App = (props) =>{

    
    
    const [usersList,setUserList] = useState()
    const [isEdit,setIsEdit] = useState(false)
    const [apiStatus,setApiStatus] = useState(apiConstants.initial)

    useEffect(()=>{
        setApiStatus(apiConstants.inProgress)
        try{
            fetch('https://my-json-server.typicode.com/venkat7git/AjackusAss2/users')
        .then((response) => response.json())
        .then((json) =>{
            setApiStatus(apiConstants.success)
            setUserList(json)
            console.log(json)
        }).catch((err)=>{
            console.log(err)
        });
        }catch(err){
            console.log(err)
        }
        
    },[])

    const onUpdateUser = async (user,id)=>{
        setUserList(()=>{
            return usersList.map(eachUser=>{
                if(eachUser.id === id){
                    return user
                }
                return eachUser
            })
        })

        try{
            const url = `https://my-json-server.typicode.com/venkat7git/AjackusAss2/users/${id}`
             const options = {
                method:"PUT",
                body:JSON.stringify(user)
             }

             const response = await fetch(url,options)
             const dbResp = await response.json()
             console.log("Updated Successfully")

        }catch(e){
            console.log(e)
        }


    }

    const onAddUser = (user)=>{
        console.log(user)
        setUserList([...usersList,user])

    }
    

    const editUser = (id)=>{
       setIsEdit(true)
        
    }

    const deleteUser = async (id)=>{
        const filteredData = usersList.filter(eachUser => eachUser.id != id)
        setUserList(filteredData)
        try{
            const url = `https://my-json-server.typicode.com/venkat7git/AjackusAss2/users/${id}`
             const options = {
                method:"DELETE"
             }

             const response = await fetch(url,options)
             const dbResp = await response.json()
             console.log("Deleted Success")

        }catch(e){
            console.log(e)
        }
    }

   
    return (
        <UserContext.Provider value={{apiConstants,apiStatus,isEdit,onUpdateUser,usersList,onAddUser,editUser,deleteUser}}>
            <Router>
                <Routes>
                <Route exact path="/" element = {<User/>}/>
                <Route exact path="/user" element = {<User/>}/>
                <Route exact path="/addUser" element={<UserAdd/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </Router>
        </UserContext.Provider>
        

    ) 
}
    

export default App
