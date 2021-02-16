import React, {useState} from 'react';
import './ProductsList.css';

/**
 * Contains the component for showing the previewable products
 * 
 * @author Topias Peiponen
 * @since 08.02.2021
 */

const array = ["Mask", "T-shirt", "Hoodie", "Pen", "Bag"]
const renderProductButtons = () => {
    return array.map((product) => (
        <button key={product}>{product}</button>
    ))
}


const ProductsList = ({lang}) => {
    const [products, setProducts] = useState(renderProductButtons);
    

    return (
        <div className="ProductsList">
            {products}
        </div>
    )
}

export default ProductsList;