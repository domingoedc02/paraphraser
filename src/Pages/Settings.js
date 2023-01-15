import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import '../Design/Settings.css'
import UserContext from '../UserContext'




export default function Settins(){
    const {currentUser} = useContext(UserContext)
    const [name, setName] = useState(currentUser.name)
    const [email, setEmail] = useState(currentUser.email)
    const [username, setUsername] = useState(currentUser.username)

    document.title = 'Paraphraser | Settings'

    useEffect(() => {
        setUsername(currentUser.username)
        setName(currentUser.name)
        setEmail(currentUser.email)
    }, [currentUser.username, currentUser.name, currentUser.email])

    return(
        <Container>
            <Row className='settingRow'>
                <h2>Settings</h2>
                <Col>
                    <Form className='formSetting'>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={name} onChange={(e) => setName(e.target.value)} placeholder="Input Name"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Input Username"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Input Email"/>
                        </Form.Group>
                        <Button className='update'>Update</Button>
                    </Form>
                    <Form className='formSetting'>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputPassword5">Current Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputPassword5">New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputPassword5">Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                />
                        </Form.Group>
                        <Button className='update'>Update Password</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}