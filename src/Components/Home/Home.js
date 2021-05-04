import React, { useRef } from 'react';
import TextValues from '../../tools/TextValues';
import { useHistory } from 'react-router-dom';
import { Button, Grid, CardContent, Input } from '@material-ui/core';
import { Image } from 'react-bootstrap';
import { Search } from '@material-ui/icons';
import { Wrapper, HomeDiv, Title, Title2, Form } from './Home.styles';
import './Home.css'
import useWindowDimensions from '../../Hooks/WindowDimentions';


const Home = ({ lang }) => {
    const history = useHistory();
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
                <Title>{TextValues.homeTitle(lang)}</Title>
                <p>-----------------</p>
                <p>{TextValues.homeTitleDescription(lang)}</p>
                <Form style={{ alignItems: 'center' }} onSubmit={submitForm}>
                    <Grid container
                        direction="row"
                    >
                        <Grid item xs={10}>
                            <Input style={{ width: '100%', paddingTop: '10px' }} type="text" placeholder="Company Name" inputRef={companyNameRef} />
                        </Grid>
                        <Grid item xs={2}>
                            <Button style={{ width: '100%' }} variant="contained" color="primary" type="submit">{TextValues.search(lang)}  <Search /> 
                        </Button>
                        </Grid>

                    </Grid>
                </Form>
            </Wrapper>

            <Wrapper>
                <CardContent>
                    <Title2>{TextValues.homeDescriptionHowItWorksTitle(lang)}</Title2>
                    <p>{TextValues.homeDescriptionHowItWorksText(lang)}</p>
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
                            <Image className="HomeDescriptionImg" src="https://kuvastot.vanno.fi/footer1.jpg" />
                            <Title2>{TextValues.homeDescriptionOfferTitle(lang)}</Title2>
                            <p className="HomeDescriptionParag">{TextValues.homeDescriptionOfferText(lang)}</p>
                            
                        </Grid>
                        <Grid
                            item
                            xs={4}>
                                <Image className="HomeDescriptionImg" src="https://kuvastot.vanno.fi/footer2.jpg" />
                            <Title2>{TextValues.homeDescriptionPrintTitle(lang)}</Title2>
                            <p className="HomeDescriptionParag">{TextValues.homeDescriptionPrintText(lang)}</p>
                            
                        </Grid>
                        <Grid
                            item
                            xs={4}>
                            <Image className="HomeDescriptionImg" src="https://kuvastot.vanno.fi/footer3.jpg" />
                            <Title2>{TextValues.homeDescriptionDeliveryTitle(lang)}</Title2>
                            <p className="HomeDescriptionParag">{TextValues.homeDescriptionDeliveryText(lang)}</p>
                            
                        </Grid>

                    </Grid>
                </CardContent>
            </Wrapper >

            <Wrapper>
                <CardContent>
                    <Title2>{TextValues.homeContactInformationTitle(lang)}</Title2>
                    <p>Tekstiä...</p>
                </CardContent>
            </Wrapper>
        </HomeDiv >

    )
}

export default Home;