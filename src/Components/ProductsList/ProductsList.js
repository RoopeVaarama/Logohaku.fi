import React, { useState } from 'react';
import { Image } from "react-bootstrap";
import { Card } from 'semantic-ui-react'
import { Typography, makeStyles, } from '@material-ui/core';
import TextValues  from '../../tools/TextValues';

import './ProductsList.css';

/**
 * Contains the component for showing the previewable products
 * 
 * @author Topias Peiponen
 * @since 08.02.2021
 */

const renderProductButtons = (productEntries, selectProduct) => {
    // Receives an array with each object as an array. Array index [0] is the product entry and [1] is the product values.
    return productEntries.map((product) => (
        <Card key={product[1].NAME}
            //className="ProductsCard"
            fluid
            style={{ textAlign: `center`, margin: `0px`, display: `table` }}>

            <button onClick={() => onClick(product, selectProduct)} >
                <Image src={"/" + product[1].THUMB} style={{ width: '100px', height: 'auto' }} />
            </button>
        </Card>
    ))
}

const styles = makeStyles({
    root: {
        marginTop: '8px',
        marginBottom: '8px'
    }
})

const onClick = (product, selectProduct) => {
    const selectedProduct = Object.fromEntries([product])
    selectProduct(selectedProduct)
}


const ProductsList = ({ productsObjects, selectProduct, lang}) => {
    const productEntries = Object.entries(productsObjects)
    const [products, setProducts] = useState(renderProductButtons(productEntries, selectProduct));

    const style = styles();

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