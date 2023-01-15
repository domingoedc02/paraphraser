import { MDBRadio, MDBBtnGroup } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Row, Container, Col, Form, Button } from "react-bootstrap";
import '../Design/UserHome.scss'




export default function UserHome(){
    const [value, setValue] = useState('Paraphrase')
    const [textInput, setTextInput] = useState('')
    const [count, setCount] = useState(0)
    const [isDisable, setIsDisable] = useState(false)
    const [textOutput, setTextOutput] = useState('')

    document.title = 'Paraphraser | Paraphrase and Summarize'

    useEffect(() => {
        const tempCount = textInput.split(' ')
        if(textInput !== ''){
            setCount(tempCount.length)
        } else{
            setCount(0)
        }
        if(count > 500){
            setIsDisable(true)
        } else{
            setIsDisable(false)
        }
    }, [textInput])

    const submitBtnsss = () => {
        if(value === 'Summarize'){
            fetch('http://127.0.0.1:5000/summarize', {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Text: textInput
                })
            })
            .then(response => response.json())
            .then(data => {
                setTextOutput(data)
            })
        } else if(value === 'Paraphrase'){
            fetch('http://127.0.0.1:5000/paraphrase', {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Text: textInput
                })
            })
            .then(response => response.json())
            .then(data => {
                setTextOutput(data)
            })
        }
    }

    return(
        <Container fluid>
            <Row className='para-row'>
                <Col className="">
                    <h2 className='typeText'>{value}</h2>
                    <MDBBtnGroup className='btnGroup'>
                        <MDBRadio btnColor='success' btn id='btn-radio' name='options' wrapperTag='span' label='Paraphrase' defaultChecked value={'Paraphrase'} onClick={(e) => setValue(e.target.value)}/>
                        <MDBRadio
                            btn
                            btnColor='success'
                            className='typeBtn'
                            id='btn-radio2'
                            name='options'
                            wrapperClass='mx-2'
                            wrapperTag='span'
                            label='Summarize'
                            value={'Summarize'}
                            onClick={(e) => setValue(e.target.value)}
                            
                        />
                    </MDBBtnGroup>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control className='txt-area' as="textarea" rows={10} value={textInput} onChange={(e) => setTextInput(e.target.value)} />
                            
                        </Form.Group>
                        <Form.Text muted className='textCount'>{count} / 500</Form.Text>
                        <Button className='submitBtnss' onClick={() => submitBtnsss()} disabled={isDisable}>Submit</Button>
                    </Form>
                </Col>
                <Col>
                    <h2 className='output'>Output</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control value={textOutput} className='output-area' as="textarea" rows={10} disabled/>
                            
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

        </Container>
    )
}