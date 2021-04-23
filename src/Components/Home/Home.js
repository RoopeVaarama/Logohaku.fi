import React, { useRef } from 'react';
//import TextValues from '../../tools/TextValues';
import { useHistory } from 'react-router-dom';
import { Button, Grid, CardContent, Input } from '@material-ui/core';
import { Wrapper, HomeDiv, Title, Title2, Form } from './Home.styles';
import useWindowDimensions from '../../Hooks/WindowDimentions'


const Home = ({ lang }) => {
    const history = useHistory();
    console.log('Language: ', lang);
    const { /*height,*/ width } = useWindowDimensions();
    const companyNameRef = useRef();
    let direction = "row"
    if (width > 850) {
        direction = "row";
    } else {
        direction = "column";
    }


    const submitForm = (e) => {
        let value = companyNameRef.current.value;
        if (value !== "") {
            //console.log(value)
            if (value === "metropolia" || value === "paisto" || value === "vanno") {
                console.log("value ", value)
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
                            <Input style={{ width: '100%', paddingTop: '10px' }} type="text" placeholder="Company Name" inputRef={companyNameRef} />
                        </Grid>
                        <Grid item xs={2}>
                            <Button style={{ width: '100%' }} variant="contained" type="submit"> Search
                        </Button>
                        </Grid>

                    </Grid>
                </Form>
            </Wrapper>

            <Wrapper>
                <CardContent>
                    <Title2>Miten homma toimii?</Title2>
                    <p>Selaa yrityksellenne räätälöityn kuvaston tuotteista sopivimmat vaihtoehdot ja kysy tarkempaa tarjousta! Kuvaston esimerkkihinnat ovat alv 0%, ja tyypillisesti 1-väripainatuksella tai lasermerkkauksella. Suosittelemme logollenne ja tuotteelle parhaita vaihtoehtoja varsinaisen tarjouksen yhteydessä vuosikymmenten kokemuksella..</p>
                    <Grid
                        container
                        direction={direction}
                        justify="space-between"
                        alignItems="center"
                        spacing={2}>

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
                </CardContent>
            </Wrapper >

            <Wrapper>
                <CardContent>
                    <Title2>Yhteystiedot</Title2>
                    <p>Tekstiä...</p>
                </CardContent>
            </Wrapper>
        </HomeDiv >

    )
}

export default Home;