import React, {useState} from 'react';
import TextValues from '../tools/TextValues';
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, Row, Container, InputGroup, FormControl, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Home.css';

const Home = ({ lang }) => {
    const history = useHistory();
    console.log('Language: ', lang);
    const [value, setValue] = useState(""),
        onInput = ({target:{value}}) => setValue(value),
        submitForm = e => {
          if (value !== "") {
          console.log("value ", value)
          setValue()
            history.push('/results/' + value);
          } else {
              e.preventDefault();
          }
        }

    return (
        <div className="Home">
            <Container className="Search" /*style={{ border: "1px solid black" }}*/>
                <h1>Liikelahjakuvasto</h1>
                <p>-----------------</p>
                <p>Räätälöitynä yrityksellesi</p>
                <Row noGutters={true} className="Input">
                    <Col sm={10}>
                        <Form onSubmit={submitForm}>
                        <InputGroup className="mb-3">  
                            <FormControl
                                id="name"
                                style={{ width: "80%" }}
                                placeholder="Company Name"
                                aria-label="Company Name"
                                aria-describedby="basic-addon1"
                                onChange={onInput} 
                                value={value}
                            />
                            <InputGroup.Append>
                            <Button variant="outline-dark" type="submit">
                            </Button>
                            </InputGroup.Append>
                        </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Container className="Info">
                <h1>Miten homma toimii?</h1>
                <p>Tekstiä...</p>
                <Row>
                    <Col>1</Col>
                    <Col>2</Col>
                    <Col>3</Col>
                </Row>
            </Container>
            <Container className="Contact">
                <h1>Yhteystiedot</h1>
                <Row>
                    <Col>1</Col>
                    <Col>2</Col>
                    <Col>3</Col>
                    <Col>4</Col>
                </Row>
                <Row>
                    <Col>1</Col>
                    <Col>2</Col>
                    <Col>3</Col>
                    <Col>4</Col>
                </Row>
                <Row>
                    <Col>1</Col>
                    <Col>2</Col>
                    <Col>3</Col>
                    <Col>4</Col>
                </Row>
            </Container>
        </div>

    )
}

export default Home;