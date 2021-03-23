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
import { Table, Image } from 'react-bootstrap';

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
  const exampleResponse = 
    {
      "code":"2811867-6",
      "name":"Paisto Oy",
      "url":"paisto.fi",
      "original":"paisto",
      "files":[
         "0b.png",
         "0c.svg",
         "1b.jpg",
         "1c.svg",
         "2b.jpg",
         "2c.jpg",
         "3b.jpg",
         "3c.jpg",
         "3d.png",
         "4d.png",
         "1588104097.png",
         "1588104165.png",
         "1588104219.png"
      ],
      "visible":{
         "0b.png":{
            "#000000":"0"
         },
         "0c.svg":{
            "#000000":"0"
         },
         "4d.png":{
            "#000000":"0"
         }
      },
      "thumb":true,
      "colors":[
         "#E2602F",
         "#000000",
         "#50F028"
      ],
      "palette":[
         "#000000",
         "#282828",
         "#f0f0f0",
         "#000028",
         "#505050",
         "#c8c8c8",
         "#f05028",
         "#787878",
         "#a0a0a0",
         "#50f028"
      ],
      "time":0.320000000000000006661338147750939242541790008544921875
   }
    const { id } = useParams();
    console.log('Params: ', id);
    console.log('Language: ', {lang})
    const [loading, setLoading] = useState(true);
    const [productsList, setProductsList] = useState(true)
    const [presetsList, setPresetsList] = useState(true)
    
    const [selectedLogo, setSelectedLogo] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const testLogos = {
      "logo1": "0b.png",
      "logo2": "0b.png",
      "logo3": "0b.png",
      "logo4": "0b.png",
      "logo5": "0c.svg"
    }
    const testColors = {
      "color1": "#D32A05",
      "color2": "#15D305",
      "color3": "#0556D3",
      "color4": "#D305D3",
      "color5": "#D30566"
    }
    const [logos, setLogos] = useState(testLogos);
    const [colors, setColors] = useState(testColors);
    useEffect(() => {
      setSelectedLogo(testLogos.logo1);
      setSelectedColor(testColors.color1);
      setLogos(testLogos);
      setColors(colors);
      console.log('logos: ', colors);
      /*postCompany('https://api.logohaku.fi/get', id)
      .then(data => {
        console.log('Fetch request data: ', data);
      })*/
    }, [])


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

    const print = (img) => {
      console.log(img)
      setSelectedLogo(img);
    }
    const printC = (color) => {
      console.log(color)
      setSelectedColor(color);
    }

    const mapLogos = () => {
      const logoArray = Object.entries(logos)
      return logoArray.map((image) => (
        <td className="LogoContainer">
          <Button className="LogoPickerImgBtn" variant="outline-light" onClick={(e) => print(image, e)}>
            <Image src={"/"+ image[1]} fluid className="LogoPickerLogo"/>
          </Button>
        </td>
      ))
    }

    const mapColors = () => {
      const colorArray = Object.entries(colors);
      console.log('colors: ', colors);
      return colorArray.map((color) => (
        <td className="ColorContainer">
          <Button className="LogoPickerImgBtn" variant="outline-light" onClick={(e) => printC(color, e)}>
          <div className="ColorPickerItem" style={ {backgroundColor:color[1]} }>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette" viewBox="0 0 16 16">
              <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"/>
            </svg>
          </div>
          </Button>
        </td>
      ))
    }

    return (
        <div>
            <h1>{TextValues.results(lang)}</h1>
              <Table striped bordered className="LogoPicker">
                <tbody>
                  <tr>
                    {mapLogos()}
                    <td>
                      <Button className="LogoPickerButton">
                        +
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table striped bordered className="ColorPicker">
                <tbody>
                  <tr>
                    {mapColors()}
                    <td>
                    <Button className="LogoPickerItem">
                      +
                    </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
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
                logo={selectedLogo}
                color={selectedColor} 
                model={selectedProduct ? (Object.values(selectedProduct))[0] : productsObjects.TSHIRT} 
                selectModel={selectModel}/>
              </div>
            </div>
        </div>
    )
}

export default Results;