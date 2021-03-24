import textValues from './TextValues';

const ProductsObjects = ({lang}) => {
    console.log('productsobjects ' + lang);
    const products = {
        TSHIRT: {
            URL: "tshirt.gltf",
            SIZE: 10,
            POSITION: {
                X: 0,
                Y: 2,
                Z: 0
            },
            LOGO_POSITION_FREE: {
                X: 0,
                Y: 0,
                Z: 0
            },
            LOGO_POSITIONS: {
                LEFT_SLEEVE : {
                    X: 2.722446051611998, 
                    Y:-0.016363421535263045, 
                    Z:0.14728683386042563
                },
                RIGHT_SLEEVE : {
                    X: -2.817993753848298,
                    Y:-0.1267343150424325,
                    Z:0.06785163897279473
                },
                RIGHT_CHEST : {
                    X: -0.843734770227969, 
                    Y:0.12587239475791856, 
                    Z:0.3626111943531667
                },
                LEFT_CHEST : {
                    X: 0.8227750598403809,
                    Y:0.4277899350707217,
                    Z:0.3761474320560536},
                MIDDLE_CHEST : {
                    X: -0.0588015719696901,
                    Y:0.33717364339438727,
                    Z:0.35915801371933753
                    },
                MIDDLE_FRONT : {
                    X: -0.06386086923660922,
                    Y:-0.6452210072020752,
                    Z:0.45587053109095965
                },
                MIDDLE_BACK : {
                    X: -0.024075078393368365,
                    Y:-0.12889941334292992,
                    Z:-0.695998651023447
                },
            },
            MAX_LOGO_AMOUNT: 2,
            NAME: textValues.tshirt(lang),
            THUMB: "placeholder thumbnail"
        },
        MASK: {
            URL: "mask.gltf",
            SIZE: 0.010,
            POSITION: {
                X: 0,
                Y: -6,
                Z: -10
            },
            CAMERA_POSITION: {
                X: 0,
                Y: -10,
                Z: -10
            },
            LOGO_POSITIONS: {

            },
            MAX_LOGO_AMOUNT: 2,
            NAME: textValues.mask(lang),
            THUMB: "placeholder thumbnail"
        },
        PEN: {
            URL: "pen.gltf",
            SIZE: 1.5,
            POSITION: {
                X: 0,
                Y: -2,
                Z: 0
            },
            LOGO_POSITIONS: {

            },
            MAX_LOGO_AMOUNT: 2,
            NAME: textValues.pen(lang),
            THUMB: "placeholder thumbnail"
        }}

    return products
};


export default ProductsObjects;