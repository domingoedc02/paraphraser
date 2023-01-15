import { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import '../Design/Login.css'
import UserContext from "../UserContext";



export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState('')
    const [alert, setAlert] = useState(false)
    const {currentUser, setCurrentUser} = useContext(UserContext)
    // const tempUser = [{name: "Edson John Domingo", username: "jdomingo02", email: "admin@yahoo.com", password: "admin", plan: "Beta"}]

    document.title = 'Paraphraser | Login'


    useEffect(() => {
        fetch('https://pharaphraser-laravel.domingoec.net/api/users')
        .then(response => response.json())
        .then(data => setUserData(data['data']))

        if(currentUser.username !== null){
            sessionStorage.setItem("token", currentUser.id)
            window.location.href = `/home`
        }
        
    }, [email, password, currentUser.username])

    const login = (e) => {
        e.preventDefault()

        userData.map(user => {
            if(email === user.email && password === user.password){
                setCurrentUser({
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    plan: user.plan
                })
                
                setAlert(false)
            } else{
                setAlert(true)
            }
        })
        
    }

    return(
        <>
            <Container>
                <Row>
                    <Col xs={6} className="layout">
                        
                        <div className="loginPage">
                            <h1 className="loginText">Login</h1>

                            <Form>
                                {(alert? <Alert variant="danger">Wrong email or password. Please try again</Alert> : <></>)}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                         We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                                </Form.Group>
                                <Button onClick={login} className="submitBtn" variant="primary" type="submit">
                                    LOGIN
                                </Button>
                                <a className="temp" href="/forget-password">Forget Password?</a>
                                <a className="temp" href="/register">don't have an account?</a>
                                {/* <Button className="forgetPassBtn">
                                    Forget Password?
                                </Button>
                                <Button href="/register" className="signupBtn">
                                    don't have an account?
                                </Button> */}
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}