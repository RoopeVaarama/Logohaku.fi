const TextValues = {

    home: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Koti";
            default:
                return "Home";
        }
    },
    results: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Tulokset";
            default:
                return "Results";
        }
    },
    header: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Hederi";
            default:
                return "Header";
        }
    },
    firstName: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Etunimi";
            default:
                return "First Name";
        }
    },
    lastName: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Sukunimi";
            default:
                return "Last Name";
        }
    },
    emailAddress: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Sähköposti";
            default:
                return "Email Address";
        }
    },
    companyName: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Yrityksen nimi";
            default:
                return "Company Name";
        }
    },
    shippingAddress: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Toimitusosoite";
            default:
                return "Shipping Address";
        }
    },
    postCode: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Postinumero";
            default:
                return "PostCode";
        }
    },
    phoneNumber: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Puhelinnumero";
            default:
                return "Phone Number";
        }
    },
    additionalInformation: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Lisätietoja";
            default:
                return "Additional Information";
        }
    },
    logoPosition: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Logon sijainti";
            default:
                return "Logo position";
        }
    },
    addToCart: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Lisää ostoskoriin";
            default:
                return "Add to cart";
        }
    },
    noItemsInCart: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Ei tuotteita ostoskorissa.";
            default:
                return "No items in cart.";
        }
    },
    amount: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Määrä";
            default:
                return "Amount";
        }
    },
    yourShoppingCart: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Ostoskori";
            default:
                return "Your Shopping Cart";
        }
    },
    orderButton: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Tilaa";
            default:
                return "Order";
        }
    },
    aboutUs: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Yhteystiedot";
            default:
                return "About us";
        }
    },
    footer: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Footeri";
            default:
                return "Footer";
        }
    },
    order: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Tilaussivu";
            default:
                return "Ordar page";
        }
    },
    notFound: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Errori 404: Sivua ei löytynyt!";
            default:
                return "Error 404: Page not found!";
        }
    },
    langButton: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Fin";
            default:
                return "Eng";
        }
    },
    catalog: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Tuotteet";
            default:
                return "Products";
        }
    },
    tshirt: function (langcode) {
        switch (langcode) {
            case "fi":
                return "T-paita";
            default:
                return "T-shirt";
        }
    },
    mask: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Maski";
            default:
                return "Mask";
        }
    },
    pen: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Kynä";
            default:
                return "Pen";
        }
    },
    bag: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Kassi";
            default:
                return "Bag";
        }
    },
    logo_positions: function (langcode) {
        switch (langcode) {
            case 'fi':
                return "Logo paikat";
            default:
                return "Logo positions"
        }
    },
    left_sleeve: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Vasen hiha";
            default:
                return "Left sleeve";
        }
    },
    right_sleeve: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Oikea hiha";
            default:
                return "Right sleeve";
        }
    },
    right_chest: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Oikea rinta";
            default:
                return "Right chest";
        }
    },
    left_chest: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Vasen rinta";
            default:
                return "Left chest";
        }
    },
    middle_chest: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Keskellä rintaa";
            default:
                return "Middle chest";
        }
    },
    middle_front: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Keskellä vatsaa";
            default:
                return "Middle of stomach";
        }
    },
    middle_back: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Keskellä selkää";
            default:
                return "Middle back";
        }
    },
    middle: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Keskellä";
            default:
                return "Middle";
        }
    },
    left: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Vasemmalla";
            default:
                return "Left";
        }
    },
    right: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Oikealla";
            default:
                return "Right";
        }
    },
    handle: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Kahva";
            default:
                return "Handle";
        }
    },
    shaft: function (langcode) {
        switch (langcode) {
            case "fi":
                return "Varsi";
            default:
                return "Shaft";
        }
    },

    logoPickerInfo: function (langcode) {
        switch (langcode) {
            case "fi":
                return {
                    title: "Yrityksesi logot",
                    info: "Älykäs logohakualgoritmimme hakee suoraan internetistä yrityksesi logot."
                };
            default:
                return {
                    title: "Logos of your company",
                    info: "Our smart logo searching algorithm fetches your company's logos straight from the internet."
                };
        }
    },
    colorPickerInfo: function (langcode) {
        switch (langcode) {
            case "fi":
                return {
                    title: "Yrityksesi teemavärit",
                    info: "Logohakualgoritmimme hakee myös suoraan internetistä yrityksesi väriteeman."
                };
            default:
                return {
                    title: "Color theme of your company",
                    info: "Our smart logo searching algorithm also fetches your company's color themes."
                };
        }
    }
}
export default TextValues;