import React from 'react';
import TextValues from '../tools/TextValues';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Container, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Home.css';

const Home = ({ lang }) => {
    return (
        <div className="Home">
            <Container className="Search" /*style={{ border: "1px solid black" }}*/>
                <h1>Liikelahjakuvasto</h1>
                <p>-----------------</p>
                <p>Räätälöitynä yrityksellesi</p>
                <Row noGutters={true} className="Input">
                    <Col sm={10}>
                        <InputGroup className="mb-3">
                            <FormControl
                                style={{ width: "100%" }}
                                placeholder="Company Name"
                                aria-label="Company Name"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={2}>
                        <Button style={{ width: "100%" }} variant="outline-dark">
                            <Link to="/results">Search</Link>
                        </Button>
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