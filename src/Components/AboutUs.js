import React from 'react';
import TextValues from '../tools/TextValues';
import { Col, Row, Container } from 'react-bootstrap';
import "./AboutUs.css";


const AboutUs = ({lang}) => {
    return (
        <div className="About">
            <Container className="Box1">
                <h1>Miten homma toimii?</h1>
                <p>Tekstiä...</p>
                <Row>
                    <Col>1</Col>
                    <Col>2</Col>
                    <Col>3</Col>
                </Row>
            </Container>
            <Container className="Box2">
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
export default AboutUs;