import React from 'react';
import TextValues from '../../tools/TextValues';
import './Order.css';
import { Container, Row, Col } from 'react-bootstrap';

const Order = ({ lang }) => {

    return (
        <div className="purchase-card">
            <Container>
                <Row>
                    <Col xs={6}>Tuote1: </Col>
                    <Col xs={6}>T-paita </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={6}>Tuote2: </Col>
                    <Col xs={6}>Maski </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={6}>Tuotteet: </Col>
                    <Col xs={6}>2 </Col>

                </Row>
                <hr/>
                <Row>
                    <Col xs={6}>Hinta: </Col>
                    <Col xs={6}>35€</Col>

                </Row>
            </Container>
        </div>
    )
}


export default Order;