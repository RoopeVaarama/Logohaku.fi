import React, { useState } from 'react';
import { Image } from "react-bootstrap";
import { Card } from 'semantic-ui-react'
import { Typography, makeStyles, CardContent, Button} from '@material-ui/core';
import TextValues  from '../../tools/TextValues';

import './ProductsList.css';

/**
 * Contains the component for showing the previewable products
 * 
 * @author Topias Peiponen
 * @since 08.02.2021
 */

const renderProductButtons = (productEntries, selectProduct, style) => {
    // Receives an array with each object as an array. Array index [0] is the product entry and [1] is the product values.
    return productEntries.map((product) => (
        <Card key={product[1].NAME}
            //className="ProductsCard"
            fluid
            variant="outlined"
            className={style.cardFlex}>
            <CardContent classes={{ 
                root: style.cardContent,
            }}>
                <Button onClick={() => onClick(product, selectProduct)} className={style.cardBtn}>
                    <Image src={"/" + product[1].THUMB} style={{ width: '100%', height: 'auto' }} />
                </Button>
            </CardContent>
        </Card>
    ))
}

const styles = makeStyles(theme => ({
    root: {
        paddingTop: '8px',
        paddingBottom: '8px',
        borderRadius: '3px',
        borderColor: 'black'
    },
    cardBtn: {
        width: '100%',
        height: '100%'
    },
    cardFlex: {
        flexGrow: '1',
        [theme.breakpoints.down('md')]: {
            flexBasis: '50%',
            maxWidth: '50%'
        },
        [theme.breakpoints.up('md')]: {
            flexBasis: '33.3%',
            maxWidth: '33.3%'
        },
        borderRadius: '0'
    },
    cardContent: {
        width: '100%',
        height: '100%',
        padding: '0 !important'
    }
}));

const onClick = (product, selectProduct) => {
    selectProduct(product[1])
}


const ProductsList = ({ productsObjects, selectProduct, lang}) => {
    const productEntries = Object.entries(productsObjects)
    const style = styles();
    //eslint-disable-next-line no-unused-vars
    const [products, setProducts] = useState(renderProductButtons(productEntries, selectProduct, style));

    return (
        <>
        <Typography variant="h5" className={style.root} >
            {TextValues.catalog(lang)}
        </Typography>
        <div className="ProductsList">
            {products}
        </div>
        </>
    )
}

export default ProductsList;