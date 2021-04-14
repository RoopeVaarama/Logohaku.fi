import textValues from './TextValues';

const ProductsObjects = ({lang}) => {
    console.log('productsobjects ' + lang);
    const products = {
        TSHIRT: {
            ID: 1,
            URL: "tshirt.gltf",
            SIZE: 10,
            LOGO_SIZE: 1,
            LOGO_ROTATION: 0,
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
                    POSITION_VECTOR: [2.7212504056391147,-0.02931333206036646,0.15560433672520413],
                    NORMAL_VECTOR: [0.8999160450163824,0.31412616543059707,0.3024497712248131],
                    MESH_NAME: "node4",
                    NAME: textValues.left_sleeve(lang) 
                },
                RIGHT_SLEEVE : {
                    POSITION_VECTOR: [-2.785737750227538,-0.030337012576966638,0.07884861454423535],
                    NORMAL_VECTOR: [-0.9364788905693066,0.29345564834988624,0.1920704817759068],
                    MESH_NAME: "node4",
                    NAME: textValues.right_sleeve(lang) 
                },
                RIGHT_CHEST : {
                    POSITION_VECTOR: [-0.934399674135531,0.09907772593946501,0.35824059407679165],
                    NORMAL_VECTOR: [-0.07915897305910648,0.0943848460791338,0.9923836747018997],
                    MESH_NAME: "node4",
                    NAME: textValues.right_chest(lang) 
                },
                LEFT_CHEST : {
                    POSITION_VECTOR: [0.7964816356928968,-0.0007038721827088423,0.4382402053095067],
                    NORMAL_VECTOR: [0.10271508858928287,0.11699758061258765,0.9878062445170596],
                    MESH_NAME: "node4",
                    NAME: textValues.left_chest(lang) 
                },
                MIDDLE_CHEST : {
                    POSITION_VECTOR: [-0.10347046028137882,0.1291215527664218,0.387581981001329],
                    NORMAL_VECTOR: [-0.04745515227051538,0.12240544742041982,0.9913450029958233],
                    MESH_NAME: "node4",
                    NAME: textValues.middle_chest(lang) 
                    },
                MIDDLE_FRONT : {
                    POSITION_VECTOR: [-0.10136383558730544,-1.4369835423589075,0.4941136350173174],
                    NORMAL_VECTOR: [-0.06849193408187101,0.0366896544829316,0.9969767922171748],
                    MESH_NAME: "node4",
                    NAME: textValues.middle_front(lang) 
                },
                MIDDLE_BACK : {
                    POSITION_VECTOR: [0.010017060244142673,-0.33193853128834494,-0.711474442851288],
                    NORMAL_VECTOR: [-0.02067865364099621,0.05666163803740875,-0.9981792684976549],
                    MESH_NAME: "node4",
                    NAME: textValues.middle_back(lang) 
                },
            },
            MAX_LOGO_AMOUNT: 2,
            NAME: textValues.tshirt(lang),
            THUMB: "tpaita.png"
        },
        MASK: {
            ID: 2,
            URL: "mask.gltf",
            SIZE: 0.010,
            LOGO_SIZE: 1,
            LOGO_ROTATION: 0,
            POSITION: {
                X: 0,
                Y: -4,
                Z: 0
            },
            LOGO_POSITION_FREE: {
                X: 0,
                Y: 0,
                Z: 0
            },
            LOGO_POSITIONS: {
                MIDDLE : {
                    POSITION_VECTOR: [0.0727394443335112,0.3973345592340993,1.8686937556983452],
                    NORMAL_VECTOR: [0.23174295436632594,-0.23121455727136095,0.9448994822770174],
                    MESH_NAME: "Plane.001_Cloth3_0",
                    NAME: textValues.middle(lang) 
                },
                LEFT : {
                    POSITION_VECTOR: [1.4139807756704799,0.3638255541461928,0.7603435062918944],
                    NORMAL_VECTOR: [0.7190444124961486,-0.0810990309088972,0.6902159662335452],
                    MESH_NAME: "Plane.001_Cloth3_0",
                    NAME: textValues.left(lang) 
                },
                RIGHT : {
                    POSITION_VECTOR: [-1.5072057971793527,0.8451468006995733,0.45337926892394087],
                    NORMAL_VECTOR: [-0.7552172437413125,0.09338902340151788,0.6487876425024492],
                    MESH_NAME: "Plane.001_Cloth3_0",
                    NAME: textValues.right(lang) 
                }
            },
            MAX_LOGO_AMOUNT: 2,
            NAME: textValues.mask(lang),
            THUMB: "maski.png"
        },
        PEN: {
            ID: 3,
            URL: "pen.gltf",
            SIZE: 1.5,
            LOGO_SIZE: 0.3,
            LOGO_ROTATION: Math.PI / 2,
            POSITION: {
                X: 0,
                Y: -2,
                Z: 0
            },
            LOGO_POSITION_FREE: {
                X: 0,
                Y: 0,
                Z: 0
            },
            LOGO_POSITIONS: {
                HANDLE : {
                    POSITION_VECTOR: [-0.12522563126903807,-0.9497311281936887,0.09154900954939871],
                    NORMAL_VECTOR: [-0.8072747152732028,9.325805535235553e-9,0.5901758501333049],
                    MESH_NAME: "pen_lambert4_0",
                    NAME: textValues.handle(lang) 
                },
                SHAFT : {
                    POSITION_VECTOR: [-0.13544163983626678,1.2891259726378081,-0.05820637767186254],
                    NORMAL_VECTOR: [-0.9176209799275236,0.008708735644044646,-0.39736116458498255],
                    MESH_NAME: "pen_lambert5_0",
                    NAME: textValues.shaft(lang) 
                },
            },
            MAX_LOGO_AMOUNT: 2,
            NAME: textValues.pen(lang),
            THUMB: "kyna.png"
        }}

    return products
};


export default ProductsObjects;