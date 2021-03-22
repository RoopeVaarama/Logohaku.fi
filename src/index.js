import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@babylonjs/loaders/glTF';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Home from './Components/Home';
import AboutUs from './Components/AboutUs';
import Footer from './Components/Footer';
import Order from './Components/Order';
import NotFound from './Components/NotFound';
import TextValues from './tools/TextValues';
import Results from './Components/Results';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckSquare, faCoffee, faIndustry, faCog, faCogs, faTasks,
  faStream, faDraftingCompass, faShip, faProjectDiagram, faBook,
  faChessBoard, faCheck, faBarcode, faAngleRight, faAngleDown,
  faLink, faArrowDown, faArrowUp, faExpandAlt, faDownload, faLaptopMedical,
  faEnvelope, faExclamation, faVideo, faLock, faPrint, faInfo, faComments,
  faFileContract, faUpload, faCloudUploadAlt, faTools, faTrashAlt, faFirstAid,
  faThumbtack, faExclamationTriangle, faFileImport, faFilter, faStopwatch, faSearch,
  faBell, faBellSlash, faShoppingCart
} from '@fortawesome/free-solid-svg-icons'
library.add(faCheckSquare, faCoffee, faIndustry, faCog, faCogs, faTasks,
    faStream, faDraftingCompass, faShip, faProjectDiagram, faBook,
    faChessBoard, faCheck, faBarcode, faAngleRight, faAngleDown,
    faLink, faArrowDown, faArrowUp, faExpandAlt, faDownload, faLaptopMedical,
    faEnvelope, faExclamation, faVideo, faLock, faPrint, faInfo, faComments,
    faFileContract, faUpload, faCloudUploadAlt, faTools, faTrashAlt, faFirstAid,
    faThumbtack, faExclamationTriangle, faFileImport, faFilter, faStopwatch,
    faBell, faBellSlash, faSearch, faShoppingCart)

const App = () => {
    let lang = localStorage.getItem("lang")

    return (
        
        <div className="App">
            <Header />
            <div className="Content">
                <Switch>
                    <Route exact path="/tilaus">
                        <Order lang={lang} />
                    </Route>
                    <Route exact path="/about">
                        <AboutUs lang={lang} />
                    </Route>
                    <Route exact path="/">
                        <Home lang={lang} />
                    </Route>
                    <Route 
                    exact path="/results/:id" 
                    children={<Results lang={lang}/>}>
                    </Route>
                    <Route>
                        <NotFound lang={lang} />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

ReactDOM.render(<Router> <App /> </Router>, document.getElementById('root'))