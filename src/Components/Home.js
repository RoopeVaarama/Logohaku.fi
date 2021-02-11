import React from 'react';
import TextValues from '../tools/TextValues';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import './Home.css';
import FormControl from 'react-bootstrap/FormControl';

//<p>{TextValues.home(lang)}</p>
const Home = ({ lang }) => {
    return (
        <div>
        <Container className="Search" /*style={{ border: "1px solid black" }}*/>
            <h1>Liikelahjakuvasto</h1>
            <p>-----------------</p>
            <p>Räätälöitynä yrityksellesi</p>
                <Row noGutters={true} className="Input">
                    <Col sm={10}>
                        <InputGroup className="mb-3">
                            <FormControl
                                style={{width:"100%"}}
                                placeholder="Company Name"
                                aria-label="Company Name"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={2}>
                        <Button style={{width:"100%"}} variant="outline-dark">
                            <Link to="/tilaus">Search</Link>
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

        </Container>
        </div>

    )
}

export default Home;