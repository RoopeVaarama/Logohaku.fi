import textValues from './TextValues';

// Contains product information
const ProductsObjects = ({lang}) => {
    const products = {
        TSHIRT: {
            ID: 1,
            URL: "tshirt.gltf",
            FILE_TYPE: ".gltf",
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
            CUSTOM_COLOR_ON: true,
            COLOR_DEFAULTS: {
                BLACK: "#000000",
                WHITE: "#FFFFFF",
                NONE: ""
            },
            COLORABLE_MESHES: ["node4"],
            MAX_LOGO_AMOUNT: 2,
            NAME: textValues.tshirt(lang),
            THUMB: "tpaita.png"
        },
        MASK: {
            ID: 2,
            URL: "mask.gltf",
            FILE_TYPE: ".gltf",
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
            CUSTOM_COLOR_ON: true,
            COLOR_DEFAULTS: {
                BLACK: "#000000",
                WHITE: "#FFFFFF",
                NONE: ""
            },
            COLORABLE_MESHES: ["Plane.001_Cloth3_0"],
            MAX_LOGO_AMOUNT: 2,
            NAME: textValues.mask(lang),
            THUMB: "maski.png"
        },
        PEN: {
            ID: 3,
            URL: "pen.gltf",
            FILE_TYPE: ".gltf",
            SIZE: 1.5,
            LOGO_SIZE: 0.3,
            LOGO_ROTATION: 90,
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
            CUSTOM_COLOR_ON: true,
            COLOR_DEFAULTS: {
                BLACK: "#000000",
                WHITE: "#FFFFFF",
            },
            COLORABLE_MESHES: ["pen_lambert4_0", "pen_lambert5_0"],
            MAX_LOGO_AMOUNT: 2,
            NAME: textValues.pen(lang),
            THUMB: "kyna.png"
        },
        VAN: {
            ID: 4,
            URL: "van.gltf",
            FILE_TYPE: ".gltf",
            SIZE: 0.05,
            LOGO_SIZE: 1.25,
            LOGO_ROTATION: 0,
            POSITION: {
                X: 0,
                Y: -1,
                Z: 0
            },
            LOGO_POSITION_FREE: {
                X: 0,
                Y: 0,
                Z: 0
            },
            LOGO_POSITIONS : {
                DRIVER_SIDE_MIDDLE_WALL : {
                    POSITION_VECTOR: [-1.273094225254664,2.1012258748154236,1.6688976229873402],
                    NORMAL_VECTOR: [-0.004966310100764375,0.17480631286207318,0.9845903151806592],
                    MESH_NAME: "body_chvan_body_0",
                    NAME: textValues.driver_side_middle_wall(lang)
                },
                DRIVER_SIDE_BACK_WALL : {
                    POSITION_VECTOR: [-2.7012842810263984,2.154943348947418,1.652569557064166],
                    NORMAL_VECTOR: [-0.008388614892717276,0.1854939706908834,0.9826095959115764],
                    MESH_NAME: "body_chvan_body_0",
                    NAME: textValues.driver_side_back_wall(lang)
                },
                PASSENGER_SIDE_MIDDLE_WALL : {
                    POSITION_VECTOR: [0.09240839443492957,2.115235800643772,-1.6735496897737017],
                    NORMAL_VECTOR: [-0.004479315388928243,0.16270311376063862,-0.986664903858569],
                    MESH_NAME: "panel_door_chvan_body_0",
                    NAME: textValues.passenger_side_middle_wall(lang)
                },
                PASSENGER_SIDE_BACK_WALL : {
                    POSITION_VECTOR: [-2.665593128189671,2.154210382436276,-1.6532170595547244],
                    NORMAL_VECTOR: [-0.007623587461638424,0.18506830343959524,-0.9826960893257919],
                    MESH_NAME: "body_chvan_body_0",
                    NAME: textValues.passenger_side_back_wall(lang)
                },
                FRONT_HOOD : {
                    POSITION_VECTOR: [4.3794504583466605,1.45747968038045,0.010198650977888149],
                    NORMAL_VECTOR: [0.37229828960880296,0.928113113246344,0.00018048417896857001],
                    MESH_NAME: "body_chvan_body_0",
                    NAME: textValues.front_hood(lang)
                },
                BACK_DOOR_LEFT : {
                    POSITION_VECTOR: [-5.034980166687404,1.0055645917878377,0.6369751721489694],
                    NORMAL_VECTOR: [-0.9994225806395689,-0.03355486064595444,0.005345711811798844],
                    MESH_NAME: "body_chvan_body_0",
                    NAME: textValues.back_door_left(lang)
                },
                BACK_DOOR_RIGHT : {
                    POSITION_VECTOR: [-5.035351883080912,0.9834735961765246,-0.6349514922214529],
                    NORMAL_VECTOR: [-0.9994951622358891,-0.0313168406868736,-0.005355012273282066],
                    MESH_NAME: "body_chvan_body_0",
                    NAME: textValues.back_door_right(lang)
                }

            },
            CUSTOM_COLOR_ON: false,
            MAX_LOGO_AMOUNT: 2,
            NAME: textValues.van(lang),
            THUMB: "paku.png"
        },
        BOX: {
            ID: 5,
            URL: "box.gltf",
            FILE_TYPE: ".gltf",
            SIZE: 4,
            LOGO_SIZE: 1,
            LOGO_ROTATION: 0,
            POSITION: {
                X: 0,
                Y: 0,
                Z: 0
            },
            LOGO_POSITION_FREE: {
                X: 0,
                Y: 0,
                Z: 0
            },
            LOGO_POSITIONS: {
                SIDE1 : {
                    POSITION_VECTOR: [-0.037394202162782955,0.02353921300311146,1.222222339014209],
                    NORMAL_VECTOR: [0,0,1],
                    MESH_NAME: "CardboardBox_LP_lambert1_0",
                    NAME: textValues.side1(lang)
                },
                SIDE2 : {
                    POSITION_VECTOR: [1.5111111112435642,-0.03369836558780129,-0.0018200026175047013],
                    NORMAL_VECTOR: [1,0,0],
                    MESH_NAME: "CardboardBox_LP_lambert1_0",
                    NAME: textValues.side2(lang)
                },
                SIDE3 : {
                    POSITION_VECTOR: [0.04165303397475062,0.07918895792682723,-1.222222339014209],
                    NORMAL_VECTOR: [0,0,-1],
                    MESH_NAME: "CardboardBox_LP_lambert1_0",
                    NAME: textValues.side3(lang)
                },
                SIDE4 : {
                    POSITION_VECTOR: [-1.511111111243566,-0.06427192909584867,-0.06919523472539635],
                    NORMAL_VECTOR: [-1,0,0],
                    MESH_NAME: "CardboardBox_LP_lambert1_0",
                    NAME: textValues.side4(lang)
                }
            },
            CUSTOM_COLOR_ON: false,
            MAX_LOGO_AMOUNT: 2,
            NAME: textValues.box(lang),
            THUMB: "laatikko.png"
        }
    
    }

    return products
};


export default ProductsObjects;