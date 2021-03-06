import React, {Suspense, useState, useEffect} from 'react';
import TextValues from '../tools/TextValues';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import "./Results.css";
import SceneComponent from './SceneComponent';
import ProductsList from './ProductsList';
import PresetsList from './PresetsList';
import Button from 'react-bootstrap/Button'
import ProductsObjects from '../tools/ProductsEnum';
import {
  Vector3
} from "@babylonjs/core";

/**
 * Contains the Babylon.js code for rendering the 3D preview window on the results page.
 * 
 * @author Topias Peiponen
 * @since 03.02.2021
 */

// API return is 404 because only Vanno Oy domains are allowed as of now
const postCompany = async (url = "", searchTerm = "") => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'authority': 'api.logohaku.fi',
      'method': 'POST',
      'path': '/get',
      'scheme': 'https'
      
    },
    redirect: 'follow',
    referrerPolicy: 'strict-origin-when-cross-origin', 
    formData: {
      'company': searchTerm,
      'type': 'input'
    }
  })
  return response.json
}

const Results = ({lang}) => {
    const { id } = useParams();
    console.log('Params: ', id);
    console.log('Language: ', {lang})
    const [loading, setLoading] = useState(true);
    const [productsList, setProductsList] = useState(true)
    const [presetsList, setPresetsList] = useState(true)

    useEffect(() => {
      postCompany('https://api.logohaku.fi/get', id)
      .then(data => {
        console.log('Fetch request data: ', data);
      })
    })


    // Create the products object and use default model (T-shirt)
    const productsObjects = ProductsObjects({lang})
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [model, setModel] = useState(null)

    const selectModel = (selectedModel, decal) => {
      if (model != null) {
        model.dispose();
        console.log('rootmesh ', selectedModel)
        for (var i=0; i <selectedModel.meshes.length; i++) {
          console.log('looping ', selectedModel.meshes[i].scaling)
        }
      }
      if (decal != null) {
        decal.dispose();
      }
      setModel(selectedModel)
    }

    const selectProduct = (product) => {
      console.log('Setting product', (Object.values(product))[0].URL)
      setSelectedProduct(product)
    }

    const toggleProductsList = () => {
      setProductsList(!productsList);
      if (presetsList === false) {
        setPresetsList(true)
      };
    };

    const togglePresetsList = () => {
      setPresetsList(!presetsList);
      if (productsList === false) {
        setProductsList(true)
      };
    };

    return (
        <div>
            <h1>{TextValues.results(lang)}</h1>
            <div className="PreviewerWindow">
              <div className="ButtonPanel">
                <Button className="CatalogButton" onClick={toggleProductsList}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor" className="CatalogIcon" viewBox="0 0 16 16">
                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2zm8.5 0v8H15V2H8.5zm0 9v3H15v-3H8.5zm-1-9H1v3h6.5V2zM1 14h6.5V6H1v8z"/>
                  </svg>
                  <div className="CatalogText">Catalog</div>
                </Button>
                <Button className="PresetsButton" onClick={togglePresetsList}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor" className="PresetsIcon" viewBox="0 0 16 16">
                    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                  <div className="PresetsText">Presets</div>
                </Button>
              </div>
              <div className="Products" hidden={productsList}>
                <ProductsList productsObjects={productsObjects} selectProduct={selectProduct}></ProductsList>
              </div>
              <div className="Presets" hidden={presetsList}>
                <PresetsList></PresetsList>
              </div>
              <div className="CanvasHolder">
                <SceneComponent 
                logo={'DuckCM.png'} 
                model={selectedProduct ? (Object.values(selectedProduct))[0] : productsObjects.TSHIRT} 
                selectModel={selectModel}/>
              </div>
            </div>
        </div>
    )
}

export default Results;