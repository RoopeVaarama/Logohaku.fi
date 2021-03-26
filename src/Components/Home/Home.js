import React, { useState } from 'react';
import TextValues from '../../tools/TextValues';
import { Link, useHistory } from 'react-router-dom';
import { Col, Row, InputGroup, FormControl, Form } from 'react-bootstrap';
import { Button, Grid, Card, CardContent } from '@material-ui/core';
import { Wrapper, HomeDiv } from './Home.styles';

const Home = ({ lang }) => {
    const history = useHistory();
    console.log('Language: ', lang);


    const [value, setValue] = useState(""),
        onInput = ({ target: { value } }) => setValue(value),
        submitForm = e => {
            if (value !== "") {
                console.log("value ", value)
                setValue()
                history.push('/tulokset/' + value);
            } else {
                e.preventDefault();
            }
        }

    return (
        <HomeDiv>
            <Wrapper>
                <h1>Liikelahjakuvasto</h1>
                <p>-----------------</p>
                <p>Räätälöitynä yrityksellesi</p>
                <Row noGutters={true} style={{padding: "2%"}}>
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
                                    <Button variant="outline-dark" type="submit"> Search
                            </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </Wrapper>
            <Wrapper>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Card style={{ width: "50%", alignContent: "center" }} variant="outlined" >
                        <CardContent style={{ width: "50%" }}>12</CardContent>

                    </Card>

                </Grid>
            </Wrapper>
            <Wrapper
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Card style={{ width: "50%", alignContent: "center" }} variant="outlined" >
                        <CardContent style={{ width: "50%" }}>12</CardContent>

                    </Card>

                </Grid>
            </Wrapper>
        </HomeDiv>

    )
}

export default Home;

/*<h1>Miten homma toimii?</h1>
                <p>Tekstiä...</p>
                <Row>
                    <Col>1</Col>
                    <Col>2</Col>
                    <Col>3</Col>
                </Row>
            </Container>*/