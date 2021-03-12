import React, {useState} from 'react';
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
        <button key={product[1].NAME} onClick={() => onClick(product, selectProduct)}> {product[1].NAME} </button>
    ))
}

const onClick = (product, selectProduct) => {
    const selectedProduct = Object.fromEntries([product])
    selectProduct(selectedProduct)
}


const ProductsList = ({productsObjects, selectProduct}) => {
    const productEntries = Object.entries(productsObjects)
    const [products, setProducts] = useState(renderProductButtons(productEntries, selectProduct));
    
    return (
        <div className="ProductsList">
            {products}
        </div>
    )
}

export default ProductsList;