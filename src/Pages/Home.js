import { Fragment, useContext, useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import '../Design/Home.css'
import axios from "axios";
import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBCardGroup,
  MDBBtn
} from 'mdb-react-ui-kit';
import studentLogo from '../Images/student-logo.png'
import premium from '../Images/premium.png'
import standard from '../Images/standard.png'
import contactBanner from '../Images/contact.png'
import UserContext from "../UserContext";
import UserHome from "./UserHome";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";



export default function Home(){
    const [textArea, setTextArea] = useState("");
    const [count, setCount] = useState(0);
    const [disable, setDisable] = useState(false)
    const [ip, setIP] = useState('');
    const [browser, setBrowser] = useState('');
    const [visitor, setVisitor] = useState({
        userIp: {},
        userBrowser: '',
        typeOfUsing: '',
        userCount: '0'
    });
    let tempUser = JSON.parse(localStorage.getItem("Temporary User"));
    let tempCount = JSON.parse(localStorage.getItem("userCount"))
    const [isLogin, setIsLogin] = useState(false)
    const {currentUser} = useContext(UserContext)

    document.title = 'Paraphraser | Paraphrase and Summarize'

    useEffect(() => {
        if(currentUser.username !== null){
            setIsLogin(true)
        } else{
            setIsLogin(false)
        }
    }, [currentUser.username])


    //Detect the browser info
    let userAgent = navigator.userAgent;
    
    const getBrowser = () => {
        if(userAgent.match(/chrome|chromium|crios/i)){
            setBrowser("chrome")
        } else if (userAgent.match(/firefox|fxios/i)){
            setBrowser("firefox")
        }  else if (userAgent.match(/safari/i)){
            setBrowser("safari")
        } else if (userAgent.match(/opr\//i)){
            setBrowser("opera")
        } else if (userAgent.match(/edg/i)){
            setBrowser("edge")
        } else {
             setBrowser("No browser detection")
        }
    }

    useEffect(() => {
        getData()
        getBrowser()
        console.log(window.location.pathname)
    })

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv4)
    }

    useEffect(() => {
        const temp = textArea.split(' ')
        setCount(temp.length)
        if(count > 250){
            setDisable(true)
        } else{
            setDisable(false)
        }
    }, [textArea, count])

    const submitBtn = (e) =>{
        e.preventDefault()
        
    }

    const publicHome = () => {
        return (
            <Container fluid>
                <Row className="banner">
                    <div className="jumbotron jumbotron-fluid">
                        
                    </div>
                    <Container>
                            <Row>
                                <Col>
                                    <div className="animated-title">
                                        <div className="text-top">
                                            <div>
                                            <span>Summarize</span>
                                            <span>Paraphrase</span>
                                            </div>
                                        </div>
                                        <div className="text-bottom">
                                            <div ><a className="registerNow" href="/register">Register Now!</a></div>
                                            
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                
                                </Col>
                            </Row>
                            
                        </Container>
                    
                </Row>
                {/* <Row>
                    <div>
                        <p className="quote mt-1">Explore fresh rephrase suggestions to diversify your language and level-up your writing. Innovative AI-technology helps you adjust tone and formality while retaining meaning. Saves Time. Paraphrase Your Text. Rewrite In One Click.<br></br><p>Paraphrase and summary are different writing strategies that ask you to put another author’s argument in your own words. This can help you better understand what the writer of the source is saying, so that you can communicate that message to your own reader without relying only on direct quotes.
                    Paraphrases are used for short passages and specific claims in an argument, while summaries are used for entire pieces and focus on capturing the big picture of an argument. Both should be cited using the appropriate format</p> </p>
                    </div>
                </Row>
                <Row>
                    <Col>
                        
                        <div className="center-align"> 
                            <input type="radio" name="size" id="size_1" value="paraphrase" checked />
                            <label htmlFor="size_1">Paraphrase</label>
                            
                            <input type="radio" name="size" id="size_2" value="summarize" />
                            <label htmlFor="size_2">Summarize</label>
                            
                        </div>
                        <Form className="inputForm">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                
                                <Form.Control onChange={(e) => setTextArea(e.target.value)} className="inputTextArea" as="textarea" rows={3} />
                                <Form.Label style={{color: 'white', backgroundColor: "#3D8361"}}>{count}/250</Form.Label>
                                <Button onClick={(e) => submitBtn(e)} disabled={disable} className="goBtn">Submit</Button>
                            </Form.Group>
                            
                        </Form>
                    </Col>
                    <Col>
                        <h4 className="paraphraseOutput">Output</h4>
                        <Form className="inputForm">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                
                                <Form.Control disabled className="inputTextArea" as="textarea" rows={3} />
                                <Form.Label style={{color: 'white', backgroundColor: "#3D8361"}}>0/250</Form.Label>
                            </Form.Group>
                            
                        </Form>
                    </Col>
                </Row> */}
                <Row className="aboutRow">
                    <Col>
                        <h3 className="aboutTitle">What is this?</h3>
                        <h5 className="aboutTitle">Pharaphrase and Summarize</h5>
                        <p>When writing a research paper, you, the writer, must incorporate into the paper the information and ideas you have learned in the course of your research that come from primary and secondary sources. Occasionally, it is appropriate to quote, but, usually, it is better to either paraphrase or summarize what you have learned. This task may seem simple; how often have we heard a teacher or instructor tell us to put what we have read “into our own words”? Yet, while easy to say, it is not so easy to do.</p>
                        <p>It is important to be able to summarize and paraphrase correctly in order to effectively integrate your research into your essay without relying on direct quotation or committing plagiarism.</p>
                        <Container fluid>
                            <Row >
                                <Col>
                                    <h5 className="aboutTitle">Paraphrase</h5>
                                    <p>Paraphrasing <span>means rewriting something in your own words, giving the same level of detail as the source and at roughly the same length as the original</span>. You may choose to paraphrase details or particular evidence and/or examples.</p>
                                </Col>
                                <Col>
                                    <h5 className="aboutTitle">Summarize</h5>
                                    <p>Summarizing means rewriting something in your own words but shortening it by stating only the main idea and the supporting points you need for your purposes. <span>A summary can be just one sentence or it can be much longer</span>, depending on whether you are presenting a broad overview or a more thorough outline.</p>
                                </Col>
                                <p>The choice between summarizing and paraphrasing depends on how much detail from the source you need for your paper. When you need the source’s main argument and/or supporting points, summarize. Or,<span> you may summarize a section or part of a source, by identifying the section’s main point or idea. When you want all the details from a particular passage or section of a source, paraphrase</span>. (Don’t try to paraphrase an entire source.)
                                </p>
                                <p><span>Whether you decide to summarize or paraphrase a source, the process is similar. You just can’t cut and paste a chunk of text   into your essay draft and then change a few words here and there</span>. You will remain too close to the source’s organization, sentence structure and phrasing. Instead follow these six steps.</p>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="mt-5 priceTable">
                    <h1 className="pricingText">Pricing</h1>
                    <MDBCardGroup className="priceGroup">
                        <MDBCard>
                            <MDBCardImage src={studentLogo} alt='...' position='top' />
                            <MDBCardBody>
                            <MDBCardTitle>National University Student Plan</MDBCardTitle>
                            <MDBCardText>
                                Free for all Student in National University - Manila
                                <br/>
                                <strong>Features</strong>
                                <br/>
                                <ul>
                                    <li>Unlimited Use</li>
                                    <li>800 words per paraphrase</li>
                                    <li>800 words per summarize</li>
                                    <li>Maximum of 5 devices</li>
                                    <li>Customer support 24/7</li>
                                    <li>Free access to all platform</li>
                                </ul>
                                <br/>
                                *Valid for 4 years or until you graduate.
                            </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter>
                                <MDBBtn className="Button">
                                    REGISTER
                                </MDBBtn>
                            </MDBCardFooter>
                        </MDBCard>

                        <MDBCard>
                            <MDBCardImage src={standard} alt='...' position='top' />
                            <MDBCardBody>
                            <MDBCardTitle>Standard Plan</MDBCardTitle>
                            <MDBCardText>
                                Standard Plan is free for those who register in our website.
                                <br/>
                                <strong>Features</strong>
                                <br/>
                                <ul>
                                    <li>Unlimited Use</li>
                                    <li>250 words per paraphrase</li>
                                    <li>250 words per summarize</li>
                                    <li>Maximum of 2 devices</li>
                                </ul>
                                <br/>
                                
                            </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter>
                                <MDBBtn className="Button">
                                    REGISTER
                                </MDBBtn>
                            </MDBCardFooter>
                        </MDBCard>

                        <MDBCard>
                            <MDBCardImage src={premium} alt='...' position='top' />
                            <MDBCardBody>
                            <MDBCardTitle>Premium Plan</MDBCardTitle>
                            <MDBCardText>
                                Premium plan can access all platform and other features in our website and to incoming features.
                                <br/>
                                <strong>Features</strong>
                                <br/>
                                <ul>
                                    <li>Unlimited Use</li>
                                    <li>unlimited words per paraphrase</li>
                                    <li>unlimited words per summarize</li>
                                    <li>Maximum of 5 devices</li>
                                    <li>Customer support 24/7</li>
                                    <li>Free access to all platform</li>
                                </ul>
                                <br/>
                                For only <strong style={{textDecoration: "underline"}}>Php 150.00</strong> you can avail this all features
                            </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter>
                                <MDBBtn className="Button">
                                    Subscribe
                                </MDBBtn>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCardGroup>
                </Row>
                
                <Row className="mt-4">
                    <Col>
                        <img className="contactImage" src={contactBanner} alt="..."/>
                    </Col>
                    <Col>
                        
                        <Form className="contactForm2">
                            <h1 className="contactText">Contact Us</h1>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="form-label">Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="form-label">Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="form-label">Phone number</Form.Label>
                                <Form.Control type="text" placeholder="Enter phone number" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Button className="contactBtn">Submit</Button>
                        </Form>
                        {/* <form className="contactForm">
                            
                            <div className="form-outline mb-4">
                                <input type="text" id="form4Example1" className="form-control" />
                                <label className="form-label" htmlFor="form4Example1">Name</label>
                            </div>

                            
                            <div className="form-outline mb-4">
                                <input type="email" id="form4Example2" className="form-control" />
                                <label className="form-label" htmlFor="form4Example2">Email address</label>
                            </div>

                            
                            <div className="form-outline mb-4">
                                <textarea className="form-control" id="form4Example3" rows="10"></textarea>
                                <label className="form-label" htmlFor="form4Example3">Message</label>
                            </div>

                            

                            
                            <button type="submit" className="btn btn-block mb-4">Send</button>
                        </form> */}
                    </Col>
                </Row>
            </Container>
        )
    }

    return(
        <Container fluid className="homeContainer">
            {(isLogin? <UserHome/>: publicHome())}
        </Container>
    )
}