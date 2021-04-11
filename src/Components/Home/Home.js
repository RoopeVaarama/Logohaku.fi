import React, { useState } from 'react';
import TextValues from '../../tools/TextValues';
import { Link, useHistory } from 'react-router-dom';
import { Button, Grid, CardContent, Input } from '@material-ui/core';
import { Wrapper, HomeDiv, Title, Title2, Form } from './Home.styles';
import useWindowDimensions from '../../Hooks/WindowDimentions'


const Home = ({ lang }) => {
    const history = useHistory();
    console.log('Language: ', lang);
    const { height, width } = useWindowDimensions();



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
                <Form style={{ alignItems: 'center' }} onSubmit={submitForm}>
                    <Grid container
                        direction="row"
                    >
                        <Grid item xs={10}>
                            <Input style={{ width: '100%', paddingTop: '10px' }} variant="outlined" id="name" placeholder="Company Name" aria-label="Company Name" aria-describedby="basic-addon1" onChange={onInput} value={value} />
                        </Grid>
                        <Grid item xs={2}>
                            <Button style={{ width: '100%', padding: '10px' }} variant="contained" type="submit"> Search
                        </Button>
                        </Grid>

                    </Grid>
                </Form>
            </Wrapper>
            <Wrapper>
                <CardContent>
                    <Title2>Miten homma toimii?</Title2>
                    <p>Selaa yrityksellenne räätälöityn kuvaston tuotteista sopivimmat vaihtoehdot ja kysy tarkempaa tarjousta! Kuvaston esimerkkihinnat ovat alv 0%, ja tyypillisesti 1-väripainatuksella tai lasermerkkauksella. Suosittelemme logollenne ja tuotteelle parhaita vaihtoehtoja varsinaisen tarjouksen yhteydessä vuosikymmenten kokemuksella..</p>
                    {width > 850 ?
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid
                                item
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
                        : <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid
                                item
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

                        </Grid>}
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