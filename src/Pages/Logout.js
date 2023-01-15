import { useContext, useEffect } from "react"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import UserContext from "../UserContext"





export default function Logout(){
    const {setCurrentUser, currentUser} = useContext(UserContext)
    sessionStorage.setItem("token", null)
    setCurrentUser({
        id: null,
        name: null,
        username: null,
        email: null,
        password: null,
        plan: null
    })
    


    return(
        <Redirect path="/"/>
    )
}