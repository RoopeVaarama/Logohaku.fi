import React, { useState } from 'react';
import TextValues from '../../tools/TextValues';
import { Link, useHistory } from 'react-router-dom';
import { Col, InputGroup, FormControl, Form } from 'react-bootstrap';
import { Button, Grid, Card, CardContent } from '@material-ui/core';
import { Wrapper, HomeDiv, Title, Title2 } from './Home.styles';

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
                <Title>Liikelahjakuvasto</Title>
                <p>-----------------</p>
                <p>Räätälöitynä yrityksellesi</p>
                <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        spacing={2}
                    >
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
                </Grid>
            </Wrapper>
            <Wrapper>
                <CardContent>
                    <Title2>Miten homma toimii?</Title2>
                    <p>Selaa yrityksellenne räätälöityn kuvaston tuotteista sopivimmat vaihtoehdot ja kysy tarkempaa tarjousta! Kuvaston esimerkkihinnat ovat alv 0%, ja tyypillisesti 1-väripainatuksella tai lasermerkkauksella. Suosittelemme logollenne ja tuotteelle parhaita vaihtoehtoja varsinaisen tarjouksen yhteydessä vuosikymmenten kokemuksella..</p>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item>
                            <Title2>aSA</Title2>
                            <p>asd</p>
                            <p>asd</p>
                        </Grid>
                        <Grid item>
                            <Title2>aSA</Title2>
                            <p>asd</p>
                        </Grid>
                        <Grid item>
                            <Title2>aSA</Title2>
                            <p>asd</p>
                        </Grid>

                    </Grid>

                </CardContent>
            </Wrapper>
            <Wrapper>
                <CardContent>
                    <Title2>Miten homma toimii?</Title2>
                    <p>Tekstiä...</p>


                </CardContent>
            </Wrapper>
        </HomeDiv>

    )
}

export default Home;