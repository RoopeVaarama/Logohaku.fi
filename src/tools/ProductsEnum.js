import textValues from './TextValues';

const ProductsObjects = ({lang}) => {
    console.log('productsobjects ' + lang);
    const products = {
        TSHIRT: {
            URL: "tshirt.gltf",
            SIZE: 20,
            POSITION: {
                X: 0,
                Y: 0,
                Z: 0
            },
            NAME: textValues.tshirt(lang),
            THUMB: "placeholder thumbnail"
        },
        MASK: {
            URL: "mask.gltf",
            SIZE: 1,
            POSITION: {
                X: 0,
                Y: 0,
                Z: 0
            },
            NAME: textValues.mask(lang),
            THUMB: "placeholder thumbnail"
        },
        PEN: {
            URL: "pen.gltf",
            SIZE: 10,
            POSITION: {
                X: 0,
                Y: -200,
                Z: 0
            },
            NAME: textValues.pen(lang),
            THUMB: "placeholder thumbnail"
        }}

    return products
};


export default ProductsObjects;