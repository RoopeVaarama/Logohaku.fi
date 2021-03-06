const TextValues = {

    home: function(langcode){
        switch (langcode) {
            case "fi":
                return "Koti";
            default:
                return "Home";
        }
    },
    results: function(langcode){
        switch (langcode) {
            case "fi":
                return "Tulokset";
            default:
                return "Results";
        }
    },
    header: function(langcode){
        switch (langcode) {
            case "fi":
                return "Hederi";
            default:
                return "Header";
        }
    },
    aboutUs: function(langcode){
        switch (langcode) {
            case "fi":
                return "Yhteystiedot";
            default:
                return "About us";
        }
    },
    footer: function(langcode){
        switch (langcode) {
            case "fi":
                return "Footeri";
            default:
                return "Footer";
        }
    },
    order: function(langcode){
        switch (langcode) {
            case "fi":
                return "Tilaussivu";
            default:
                return "Ordar page";
        }
    },
    notFound: function(langcode){
        switch (langcode) {
            case "fi":
                return "Errori 404: Sivua ei löytynyt!";
            default:
                return "Error 404: Page not found!";
        }
    },
    langButton: function(langcode){
        switch (langcode) {
            case "fi":
                return "Fin";
            default:
                return "Eng";
        }
    },
    tshirt: function(langcode){
        switch (langcode) {
            case "fi":
                return "T-paita";
            default:
                return "T-shirt";
        }
    },
    mask: function(langcode){
        switch (langcode) {
            case "fi":
                return "Maski";
            default:
                return "Mask";
        }
    },
    pen: function(langcode){
        switch (langcode) {
            case "fi":
                return "Kynä";
            default:
                return "Pen";
        }
    },
    bag: function(langcode){
        switch (langcode) {
            case "fi":
                return "Kassi";
            default:
                return "Bag";
        }
    },
}
export default TextValues;