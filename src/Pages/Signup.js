import { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Modal } from "react-bootstrap";
import '../Design/Signup.css'





export default function Signup(){
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [service, setService] = useState('Beta')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [passErr1, setPassErr1] = useState(false)
    const [passErr2, setPassErr2] = useState(false)
    const [serviceErr1, setServiceErr1] = useState(false)
    const [tempData, setTempData] = useState([])
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidUsername, setInvalidUsername] = useState(false)
    const [unableUsers, setUnableUsers] = useState('')
    const [unableEmails, setUnableEmails] = useState('')
    const [disableBtn, setDisableBtn] = useState(true)
    const [show, setShow] = useState(false);
    const [verification, setVerification] = useState('')
    const [userCode, setUserCode] = useState('')

    document.title = 'Paraphraser | Register'

    // const handleClose = (e) => {
    //     setShow(false)
    // };
    // const handleShow = (e) => {
    //     e.preventDefault()
    //     const givenSet = "0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZ";

    //     let code = "";
    //     for(let i=0; i<6; i++) {
    //         let pos = Math.floor(Math.random()*givenSet.length);
    //         code += givenSet[pos];
    //     }
    //     setVerification(code)

    //     fetch('https://email-server.herokuapp.com/api/verify-email', {
    //         method: "POST",
    //         headers:{
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             code: verification,
    //             email: email,
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
            
    //     })
    //     setShow(true)
    
    // };

    useEffect(() => {
        fetch('https://pharaphraser-laravel.domingoec.net/api/users')
        .then(response => response.json())
        .then(data => setTempData(data['data']))
        tempData.map(user => {
            if(username === user.username){
                setUnableUsers(user.username)
            }
            if(email === user.email){
                setUnableEmails(user.email)
            }
        })
        

    }, [email, username])

    useEffect(() => {
        if(username === ''){
            setInvalidUsername(false)
        }
        else if(username === unableUsers){
            setInvalidUsername(true)
        } else{
            setInvalidUsername(false)
        }
        if(email === ''){
            setInvalidEmail(false)
        }
        else if(email === unableEmails){
            setInvalidEmail(true)
        } else{
            setInvalidEmail(false)
        }
    }, [username, unableUsers, email, unableEmails])


    useEffect(() => {
        if(password.length === 0){
            setPassErr1(false)
        }else if(password.length < 8){
            setPassErr1(true)
        } else{
            setPassErr1(false)
        }
        if(confirmPass.length === 0){
            setPassErr2(false)
        }else if(password === confirmPass){
            setPassErr2(false)
        } else{
            setPassErr2(true)
        }
    }, [password, confirmPass])

    useEffect(() => {
        if(name === '', username === '', email === '', password === '', confirmPass === '' || invalidEmail === true || invalidUsername === true){
            setDisableBtn(true)
        } else{
            setDisableBtn(false)
        }
    }, [name, username, email, password, confirmPass])

    const verifyAccount = (e) => {
        // if(verification === userCode){
        //     console.log("matched")
        // } else{
        //     console.log("the code is: "+verification)
        // }
        e.preventDefault()
        fetch("https://pharaphraser-laravel.domingoec.net/api/create-user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                username: username,
                email: email,
                password: password,
                plan: service
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data !== null){
                window.location.href = '/login'
            }
        })
    }

    return(
        <>
            <Container>
                <Row>
                    <Col xs={6} className="layout">
                        <div className="signupBox">
                            <h1 className="signupText">Register</h1>
                            <Form>
                                <Form.Group className="mb-3" controlId="regisName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="regisUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)}/>
                                    {(invalidUsername? <Form.Text style={{color: 'red'}}>This username is already exist. Please try again</Form.Text>: <></>)}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="regisEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
                                    {(invalidEmail? <Form.Text style={{color: 'red'}}>This email is already exist. Please try again</Form.Text>: <></>)}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Service</Form.Label>
                                    <Form.Select  onChange={(e) => setService(e.target.value)}>
                                        <option value="Beta">Beta</option>
                                        {/* <option value="none">-</option>
                                        <option value="Standard">Standard</option>
                                        <option value="Student">National University Student</option>
                                        <option value="Premium">Premium</option> */}
                                    </Form.Select>
                                    {(serviceErr1? <Form.Text style={{color: 'red'}}>Please select services</Form.Text>: <></>)}

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="regisPassword" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                    {(passErr1? <Form.Text style={{color: 'red'}}>Please input at least 8 letters</Form.Text>: <></>)}
                                    {(passErr2? <Form.Text style={{color: 'red'}}>Password is not match</Form.Text>: <></>)}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="confirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPass(e.target.value)}/>
                                    {(passErr2? <Form.Text style={{color: 'red'}}>Password is not match</Form.Text>: <></>)}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check className="agreement" type="checkbox" label="Agree Terms and Condition" />
                                    <Form.Text className="text-muted">
                                         By signing in, you agree to Paraphraser Terms of Service and acknowledge that your personal information will be processed in accordance with Paraphraser Privacy Policy.
                                    </Form.Text>
                                </Form.Group>
                                <button onClick={verifyAccount} className="registerBtn" variant="primary" type="submit" disabled={disableBtn}>
                                    REGISTER
                                </button>
                                <a className="temp" href="/login">I have an account</a>
                                {/* <Button className="loginBtn">
                                    I have an account?
                                </Button> */}
                                {/* <Modal
                                    show={show}
                                    onHide={handleClose}
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header closeButton>
                                    <Modal.Title>Email Verification</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        We sent the verification code at your email <strong style={{textDecoration: 'underline'}}>{email}
                                        </strong>
                                        <Form>
                                            
                                            <Form.Control onChange={(e) => setUserCode(e.target.value)} className="w-75 mx-auto mt-4" type="text" placeholder="Enter Verification Code"/>
                                        </Form>
                                        <Button className="retryCodeBtn" >Didn't received code?</Button>
                                        
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button onClick={() => verifyAccount()} variant="success">Verify</Button>
                                    </Modal.Footer>

                                </Modal> */}
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}