import { Col, Container, Row } from "react-bootstrap";
import '../Design/Account.css'
import profile from '../Images/profile.jpg'
import { MDBRipple } from 'mdb-react-ui-kit';
import { useContext } from "react";
import UserContext from "../UserContext";





export default function Account(){
    const {currentUser} = useContext(UserContext)
    document.title = 'Paraphraser | Account'


    return(
        <Container>
            <Row className="accountRow">
                <Col>
                    <h2 className="txt">Account</h2>
                    <Container>
                        <Row>
                            <Col>
                                <MDBRipple rippleTag='a'>
                                    <img
                                        src={profile}
                                        className='img-fluid rounded profile'
                                        alt='example'
                                    />
                                </MDBRipple>
                            </Col>
                            <Col>
                                <h5>NAME: {currentUser.name} </h5>
                                <h5>USERNAME: {currentUser.username} </h5>
                                <h5>EMAIL: {currentUser.email} </h5>
                                <h5>ADDRESS: none   </h5>
                            
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row className="lastRow">
                <Col>
                    <h5>Service: {currentUser.plan}</h5>
                    <h5>Mode of Payment: none </h5>
                    <h5>Billing Address: none</h5>
                </Col>
            </Row>
        </Container>
    )
}