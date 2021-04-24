// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState, useEffect } from "react";
import { Tools } from "@babylonjs/core";
import TextValues from "../../tools/TextValues";
//import PickerDialog from "../PickerDialog/PickerDialog";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import "./Results.css";
import { HighlightOff, Edit } from '@material-ui/icons';
import { Typography, Button, IconButton, Box, Card, CardContent } from '@material-ui/core';
import SceneComponent from "../SceneComponent";
import ProductsList from "../ProductsList/ProductsList";
//import PresetsList from "../PresetsList/PresetsList";
import ProductsObjects from "../../tools/ProductsEnum";
//import { Vector3 } from "@babylonjs/core";
import { Table, Image } from "react-bootstrap";
import {
  paistoBaseResponse,
  metropoliaBaseResponse,
  vannoBaseResponse,
} from "../../tools/ExampleResponses";
import EditLogoDialog from '../PickerDialog/EditLogoDialog';
import EditColorDialog from '../PickerDialog/EditColorDialog';
import NewLogoDialog from '../PickerDialog/NewLogoDialog';
import NewColorDialog from '../PickerDialog/NewColorDialog';
import { makeStyles } from "@material-ui/core";
import ScrollLock from 'react-scrolllock';
import useWindowDimensions from '../../Hooks/WindowDimentions'

/**
 * Contains the Babylon.js code for rendering the 3D preview window on the results page.
 *
 * @author Topias Peiponen
 * @since 03.02.2021
 */

// API return is 404 because only Vanno Oy domains are allowed as of now
const postCompany = async (url = "", searchTerm = "") => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      authority: "api.logohaku.fi",
      method: "POST",
      path: "/get",
      scheme: "https",
    },
    redirect: "follow",
    referrerPolicy: "strict-origin-when-cross-origin",
    formData: {
      company: searchTerm,
      type: "input",
    },
  });
  return response.json;
};

const baseUrl = "https://api.logohaku.fi/data/"

const useStyles = makeStyles({
  pickerIconEdit: {
    position: 'absolute',
    right: 0,
    top: 22
  },
  pickerIconRemove: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  infoCard: {
    flexBasis: '15%',
    maxWidth: '20%',
    marginBottom: '8px',
    marginRight: '32px',
    padding: '16px'
  },
  pickerTable: {
    flexBasis: '80%'
  }
})

const Results = ({ lang, handleAddToCart }) => {
  const { id } = useParams();
  //const [imageURL, setImageURL] = useState("");

  // UI component states
  const [logoPickerDialogOpen, setLogoPickerDialogOpen] = useState(false);
  const [colorPickerDialogOpen, setColorPickerDialogOpen] = useState(false);
  const [newLogoPickerDialogOpen, setNewLogoPickerDialogOpen] = useState(false);
  const [newColorPickerDialogOpen, setNewColorPickerDialogOpen] = useState(false);
  const [productsList, setProductsList] = useState(true);
  const [presetsList, setPresetsList] = useState(true);
  const [presetPosition, setPresetPosition] = useState(1);
  const [model, setModel] = useState(null);
  //const [loading, setLoading] = useState(true);
  const [lockScroll, setLockScroll] = useState(false);

  const [logoPosition, setLogoPosition] = useState(null);

  // Brand (color and logo) states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedEditableLogo, setSelectedEditableLogo] = useState(null);
  const [selectedEditableColor, setSelectedEditableColor] = useState({
    color: "",
    index: 0
  });
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);

  // States for the Babylon scene and engine
  const [scene, setScene] = useState(null);
  const [engine, setEngine] = useState(null);
  const [activeCamera, setActiveCamera] = useState(null);

  const styles = useStyles();

  const [response, setResponse] = useState(() => {
    // Set JSON response based on search parameter (in place of API usage)
    switch (id) {
      case "metropolia":
        return metropoliaBaseResponse;
      case "paisto":
        return paistoBaseResponse;
      case "vanno":
        return vannoBaseResponse;
      default:
        return metropoliaBaseResponse;
    }
  });
  const [logos, setLogos] = useState(() => {
    // Set logos response based on search parameter (in place of API usage)
    switch (id) {
      case "metropolia":
        return metropoliaBaseResponse.visible;
      case "paisto":
        return paistoBaseResponse.visible;
      case "vanno":
        return vannoBaseResponse.visible;
      default:
        return metropoliaBaseResponse.visible;
    }
  });
  const [colors, setColors] = useState(() => {
    // Set colors response based on search parameter (in place of API usage)
    switch (id) {
      case "metropolia":
        return metropoliaBaseResponse.colors;
      case "paisto":
        return paistoBaseResponse.colors;
      case "vanno":
        return vannoBaseResponse.colors;
      default:
        return metropoliaBaseResponse.colors;
    }
  });

  useEffect(() => {
    //console.log("Responses here! ", response);
    //const imageUrl = baseUrl + response.code + "/"
    //console.log('Imageurl ', imageUrl);
    //setImageURL(imageUrl);
    setSelectedLogo(logos[0].image);
    setSelectedColor(colors[0]);
    /*postCompany('https://api.logohaku.fi/get', id)
    .then(data => {
      console.log('Fetch request data: ', data);
    })*/
  }, []);

  // Create the products object and use default model (T-shirt)
  const productsObjects = ProductsObjects({ lang });

  const selectModel = (selectedModel, decal) => {
    if (model != null) {
      model.dispose();
      //console.log("rootmesh ", selectedModel);
      for (var i = 0; i < selectedModel.meshes.length; i++) {
        //console.log("looping ", selectedModel.meshes[i].scaling);
      }
    }
    if (decal != null) {
      decal.dispose();
    }
    setModel(selectedModel);
  };

  const selectProduct = (product) => {
    //console.log("Setting product", Object.values(product)[0]);
    setSelectedProduct(product);
  };

  const toggleProductsList = () => {
    setProductsList(!productsList);
    if (presetsList === false) {
      setPresetsList(true);
    }
  };

  const togglePresetsList = () => {
    setPresetsList(!presetsList);
    if (productsList === false) {
      setProductsList(true);
    }
  };

  const print = (img) => {
    //console.log("Seleted logo here", img);
    setSelectedLogo(img);
  };
  const printC = (color) => {
    //console.log("SELECTED COLOR ", color);
    setSelectedColor(color);
  };

  const handleLogoEdit = (item, index) => {
    //console.log("HandleLogoEdit ", item, index);
    setSelectedEditableLogo([item, index]);
    setLogoPickerDialogOpen(true);
  };
  const handleColorEdit = (item, index) => {
    //console.log('HandleColorEdit ', item);
    setSelectedEditableColor({
      color: item,
      index: index
    });
    setColorPickerDialogOpen(true);
  }

  const handleLogoRemove = (index) => {
    const newLogos = logos;
    newLogos.splice(index)
    setLogos(newLogos);
  };

  const handleColorRemove = (index) => {
    const newColors = colors;
    newColors.splice(index);
    setColors(newColors);
  };

  // Creates screenshots of the current canvas from the front and back (Z-axis)
  // https://doc.babylonjs.com/typedoc/classes/babylon.screenshottools#createscreenshotusingrendertargetasync
  const createScreenshot = async () => {
    const screenshotFront = await new Tools.CreateScreenshotUsingRenderTargetAsync(engine, activeCamera[0], 1600);
    const screenshotBack = await new Tools.CreateScreenshotUsingRenderTargetAsync(engine, activeCamera[1], 1600);
    return ({ screenshotFront: screenshotFront, screenshotBack: screenshotBack })
  }

  const { /*height,*/ width } = useWindowDimensions();
  let productsWidth = "300px"
  if (width < 1000 ){
    productsWidth = "150px";
  }
  if (width > 1000) {
    productsWidth = "350px"
  }
  if (width > 2000) {
    productsWidth = "450px"
  }

  const mapLogos = () => {
    const logoArray = logos
    //console.log("Logo Arrays ", logoArray);
    //console.log('Imageurl ', imageURL);
    return logoArray.map((item, index) => (
      <td className="LogoContainer">
        <Button
          className="LogoPickerImgBtn"
          variant="outline-light"
          onClick={(e) => print(item.image, e)}
        >
          <Image src={item.image} fluid className="LogoPickerItem" />
          <IconButton
            className={styles.pickerIconRemove}
            color="primary"
            aria-label="delete logo"
            onClick={(e) => handleLogoRemove(index)}
          >
            <HighlightOff />
          </IconButton>
          <IconButton
            className={styles.pickerIconEdit}
            color="primary"
            aria-label="edit logo"
            onClick={(e) => handleLogoEdit(item.image, index)}
          >
            <Edit />
          </IconButton>
        </Button>
      </td>
    ));
  };

  const mapColors = () => {
    //console.log("colors: ", colors);
    return colors.map((color, index) => (
      <td className="ColorContainer">
        <Button
          className="LogoPickerImgBtn"
          variant="outline-light"
          onClick={(e) => printC(color, e)}
        >
          <Box bgcolor={color} p={5} className="ColorPickerItem">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-palette"
              viewBox="0 0 16 16"
            >
              <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z" />
            </svg>
          </Box>
          <IconButton
            className={styles.pickerIconRemove}
            color="primary"
            aria-label="delete logo"
            onClick={(e) => handleColorRemove(index)}
          >
            <HighlightOff />
          </IconButton>
          <IconButton
            className={styles.pickerIconEdit}
            color="primary"
            aria-label="edit logo"
            onClick={(e) => handleColorEdit(color, index)}
          >
            <Edit />
          </IconButton>
        </Button>
      </td>
    ));
  };

  const addToCart = () => {
    let product = Object.values(selectedProduct)[0];
    createScreenshot().then((res) => {
      let screenshotFront = res.screenshotFront
      let screenshotBack = res.screenshotBack
      handleAddToCart(product.ID, product.NAME, logoPosition, screenshotFront, screenshotBack);
    });
  };

  const handleCloseLogos = (value, index) => {
    //console.log('Handlecloselogos in results ', value, index)

    if (value !== null) {
      const newLogos = logos;
      newLogos[index] = {
        image: value,
        colors: []
      }
      //console.log('NEW LOGOS ', newLogos)
      setLogos(newLogos);
    }

    setLogoPickerDialogOpen(false);
  };

  const handleCloseNewLogo = (value, index) => {
    //console.log('HandleCLoseNewLogo ', value, index);
    if (value !== null) {
      const newLogos = logos;
      newLogos.push({
        image: value,
        colors: []
      })
      setLogos(newLogos);
    }
    setNewLogoPickerDialogOpen(false);
  }

  const handleCloseNewColor = (value) => {
    if (value !== null) {
      const newColors = colors;
      newColors.push(value);
      setColors(newColors);
    }
    setNewColorPickerDialogOpen(false);
  }

  const handleCloseColors = (value, index) => {
    //console.log('handleclosecolors ', value, index)
    if (value !== null) {
      const newColors = colors;
      newColors[index] = value
      setColors(newColors);
    }
    setColorPickerDialogOpen(false);
  };
  const noScroll = () => {
    setLockScroll(true)
  }

  const scroll = () => {
    setLockScroll(false)
  }

  return (
    <ScrollLock isActive={lockScroll}>
      <div>
        <div className="PickerContainer">
          <Card className={styles.infoCard}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {TextValues.logoPickerInfo(lang).title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {TextValues.logoPickerInfo(lang).info}
              </Typography>
            </CardContent>
          </Card>
          <Table striped bordered className="LogoPicker">
            <tbody>
              <tr>
                {mapLogos()}
                <EditLogoDialog
                  selectedValue={selectedEditableLogo}
                  open={logoPickerDialogOpen}
                  onClose={handleCloseLogos}
                  ytunnus={response.code}
                />
                <td>
                  <Button className="LogoPickerButton" onClick={() => setNewLogoPickerDialogOpen(true)}>+</Button>
                  <NewLogoDialog
                    selectedValue={response.files}
                    open={newLogoPickerDialogOpen}
                    onClose={handleCloseNewLogo}
                    ytunnus={response.code}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="PickerContainer">
          <Card className={styles.infoCard}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {TextValues.colorPickerInfo(lang).title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {TextValues.colorPickerInfo(lang).info}
              </Typography>
            </CardContent>
          </Card>
          <Table striped bordered className="ColorPicker">
            <tbody>
              <tr>
                {mapColors()}
                <EditColorDialog
                  selectedValue={selectedEditableColor}
                  palette={response.palette}
                  open={colorPickerDialogOpen}
                  onClose={handleCloseColors}
                  ytunnus={response.code}
                />
                <td>
                  <Button className="LogoPickerItem" onClick={() => setNewColorPickerDialogOpen(true)}>+</Button>
                  <NewColorDialog
                    palette={response.palette}
                    open={newColorPickerDialogOpen}
                    onClose={handleCloseNewColor}
                    ytunnus={response.code}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div /*onMouseOver={noScroll} onMouseLeave={scroll}*/ style={{ width: '95%' }} className="PreviewerWindow">
          <div style={{ position: 'relative', width: productsWidth}} className="Products">
            <ProductsList
              productsObjects={productsObjects}
              selectProduct={selectProduct}
            ></ProductsList>
            <div style={{ width: '100%', height: "100px", position: "absolute", bottom: "0", }}>
              <div style={{ width: '100%', height: "60%" }}>
                <p>div for amount?</p>
              </div>
              {selectedProduct ?
                <Button variant="contained" color="primary" style={{ width: '100%', height: '40%' }} onClick={() => addToCart()}>{TextValues.addToCart(lang)}</Button> : null}
            </div>
          </div>
          <SceneComponent
            lang={lang}
            logo={selectedLogo}
            color={selectedColor}
            model={
              selectedProduct
                ? Object.values(selectedProduct)[0]
                : productsObjects.TSHIRT
            }
            selectModel={selectModel}
            setEngine={setEngine}
            setScene={setScene}
            setActiveCamera={setActiveCamera}
            logoPosition={logoPosition}
            setLogoPosition={setLogoPosition}
          />
        </div>
      </div>
      <div className="PlaceholderDiv"></div>

    </ScrollLock>
  );
};

export default Results;


/*<div className="ButtonPanel">
            <Button variant="contained" color="secondary" className="CatalogButton" onClick={toggleProductsList}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50%"
                height="50%"
                fill="currentColor"
                className="CatalogIcon"
                viewBox="0 0 16 16"
              >
                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2zm8.5 0v8H15V2H8.5zm0 9v3H15v-3H8.5zm-1-9H1v3h6.5V2zM1 14h6.5V6H1v8z" />
              </svg>
              <div className="CatalogText">{TextValues.catalog(lang)}</div>
            </Button>
          </div>*/