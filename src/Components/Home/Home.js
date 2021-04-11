import React, { useState } from 'react';
import TextValues from '../../tools/TextValues';
import { Link, useHistory } from 'react-router-dom';
import { Col, InputGroup, FormControl, Form } from 'react-bootstrap';
import { Button, Grid, Card, CardContent, /*FormControl,*/ Input, InputLabel, FormHelperText } from '@material-ui/core';
import { Wrapper, HomeDiv, Title, Title2 } from './Home.styles';


/*<Grid
                        item
                        xs={10}>
                        <FormControl>
                            <InputLabel htmlFor="my-input">First Name</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" />
                            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        xs={2}>
                        <Button variant="outline-dark" type="submit"> Search
                            </Button>
                    </Grid>*/
const Home = ({ lang }) => {
    const history = useHistory();
    console.log('Language: ', lang);


    const [value, setValue] = useState(""),
        onInput = ({ target: { value } }) => setValue(value),
        submitForm = e => {
            if (value !== "") {
                if (value == "metropolia" || value == "paisto" || value == "vanno") {
                    console.log("value ", value)
                    setValue()
                    history.push('/tulokset/' + value);
                }
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
                        <Grid
                            item="true"
                            xs={4}
                        >

                            <Title2>Tarjouspyyntö</Title2>
                            <p>Valitse kiinnostavat tuotteet sekä niille sopivat logot ja lähetä tarjouspyyntö meille.
                                Palaamme soveltuvien merkkaustapojen ja tarjouksen kanssa tyypillisesti 2 arkipäivän sisällä.</p>
                        </Grid>
                        <Grid
                            item
                            xs={4}>
                            <Title2>Vedos</Title2>
                            <p>Lähetämme tehtaan sähköisen vedoksen hyväksyttäväksi tyypillisesti 2 arkipäivän sisällä.
                                Kuvastossa esitettyjen tuotteiden ja painatusten värit voivat poiketa todellisesta.</p>
                        </Grid>
                        <Grid
                            item
                            xs={4}>
                            <Title2>Toimitus</Title2>
                            <p>Tyypillinen toimitusaika tuotteille on 2-3 viikkoa tuotteesta ja määrästä riippuen.
                                Jos kaipaat nopeampaa toimitusta niin mainitse asiasta tarjouspyynnössä.</p>
                        </Grid>

                    </Grid>

                </CardContent>
            </Wrapper>
            <Wrapper>
                <CardContent>
                    <Title2>Yhteystiedot</Title2>
                    <p>Tekstiä...</p>


                </CardContent>
            </Wrapper>
        </HomeDiv>

    )
}

export default Home;