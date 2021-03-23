import textValues from './TextValues';

const ProductsObjects = ({lang}) => {
    console.log('productsobjects ' + lang);
    const products = {
        TSHIRT: {
            ID: 1,
            URL: "tshirt.gltf",
            SIZE: 10,
            POSITION: {
                X: 0,
                Y: 2,
                Z: 0
            },
            NAME: textValues.tshirt(lang),
            THUMB: "placeholder thumbnail"
        },
        MASK: {
            ID: 2,
            URL: "mask.gltf",
            SIZE: 0.015,
            POSITION: {
                X: 0,
                Y: -10,
                Z: -10
            },
            NAME: textValues.mask(lang),
            THUMB: "placeholder thumbnail"
        },
        PEN: {
            ID: 3,
            URL: "pen.gltf",
            SIZE: 1.5,
            POSITION: {
                X: 0,
                Y: -2,
                Z: 0
            },
            NAME: textValues.pen(lang),
            THUMB: "placeholder thumbnail"
        }}

    return products
};


export default ProductsObjects;