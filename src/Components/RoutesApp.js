import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import AppNavbar from "./AppNavbar";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Signup from "../Pages/Signup"
import Footer from "./Footer";
import ErrorPage from "../Pages/ErrorPage";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import UserHome from "../Pages/UserHome";
import UserNavbar from "./UserNavbar";
import Account from "../Pages/Account";
import Settins from "../Pages/Settings";
import Logout from "../Pages/Logout";

export default function RoutesApp(){
    const {currentUser} = useContext(UserContext)
    const [userLoggedin, setUserLoggedIn] = useState(false)

    useEffect(() => {
        if(currentUser.username !== null){
            setUserLoggedIn(true)
        } else{
            setUserLoggedIn(false)
        }
    }, [currentUser])

    

    return(
        <BrowserRouter>
            <AppNavbar/>
            <Container>
                <Switch>
                    <Route exact path="/home" component={Home}>
                        {/* {(userLoggedin? <Redirect to={`/${currentUser.username}`}/>: <Home/>)} */}
                    </Route>
                    <Route exact path="/" component={Home}>
                        {/* {(userLoggedin? <Redirect to={`/${currentUser.username}`}/>: <Home/>)} */}
                    </Route>
                    <Route exact path="/login" component={Login}>
                        {(userLoggedin? <Redirect to={`/`} component={Home}/> : <Login/>)}
                    </Route>
                    <Route exact path="/register" component={Signup}>
                        {(userLoggedin? <Redirect to={`/`} />: <Signup/>)}
                    </Route>
                    {/* <Route exact path={`/${currentUser.username}`} component={UserHome}>
                        {(userLoggedin? <UserHome/>: <Redirect to={`/home`} />)}
                    </Route> */}
                    <Route exact path={'/logout'} component={Logout}/>
                    <Route exact path={'/account'} component={Account}></Route>
                    <Route exact path={'/settings'} component={Settins}></Route>
                    <Route component={ErrorPage}/>
                </Switch>
            </Container>
            <Footer/>
        </BrowserRouter>
    )
}