const TextValues = {

    home: function(langcode){
        switch (langcode) {
            case "fi":
                return "Koti";
            default:
                return "Home";
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
                return "fi";
            default:
                return "eng";
        }
    },
}
export default TextValues;