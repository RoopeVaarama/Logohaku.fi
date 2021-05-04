// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState, useEffect } from "react";
import { Tools } from "@babylonjs/core";
import TextValues from "../../tools/TextValues";
//import PickerDialog from "../PickerDialog/PickerDialog";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import "./Results.css";
import { HighlightOff, Edit } from '@material-ui/icons';
import { Typography, Button, IconButton, Box, Card, CardContent, Input } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SceneComponent from "../SceneComponent";
import ProductsList from "../ProductsList/ProductsList";
//import PresetsList from "../PresetsList/PresetsList";
import ProductsObjects from "../../tools/ProductsEnum";
//import { Vector3 } from "@babylonjs/core";
import {  Image } from "react-bootstrap";
import {
  paistoBaseResponse,
  metropoliaBaseResponse,
  vannoBaseResponse,
} from "../../tools/ExampleResponses";
import EditLogoDialog from '../PickerDialog/EditLogoDialog';
import EditColorDialog from '../PickerDialog/EditColorDialog';
import NewLogoDialog from '../PickerDialog/NewLogoDialog';
import NewColorDialog from '../PickerDialog/NewColorDialog';
import { makeStyles, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import useWindowDimensions from '../../Hooks/WindowDimentions'
import nextId from "react-id-generator";
import calculateAspectRatios from 'calculate-aspect-ratio';
import LogoTable from '../LogoTable/LogoTable';
import ColorTable from '../ColorTable/ColorTable';

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
  },
  pickerItemBtn: {
    padding: '16px',
    height: '100%'
  },
  ColorPicker: {
    flexBasis: '60%',
  },
  ColorPickerDisabled: {
      tableLayout: 'fixed',
      flexBasis: '60%',
      pointerEvents: 'none',
      opacity: '50%',
      zIndex: '4',
  },
  colorPickerDisabledText: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  logoPickerImgBtnNormal: {
    border: "1px solid rgba(224, 224, 224, 1)",
    padding: '0px'
  },
  colorPickerImgBtnNormal: {
    border: "1px solid rgba(224, 224, 224, 1)",
    padding: '0px'
  },
  logoPickerImgBtnSelected: {
    backgroundColor: "rgba(155, 155, 155, 0.5)",
    padding: '0px'
  },
  colorPickerImgBtnSelected: {
    backgroundColor: "rgba(155, 155, 155, 0.5)",
    padding: '0px'
  },
  dialogBrandItems: {
    maxWidth: '40vw'
  },
  basicShadow: {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
  },
  basicShadowForImgPaper: {
    maxWidth: "100%",
    filter: 'drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))',
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
  },
  basicShadowForFluidImg: {
    maxWidth: "100%",
    height: "auto",
    filter: 'drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))'
  }
})

const Results = ({ lang, handleAddToCart, setLockScroll }) => {
  const { id } = useParams();
  const itemID = nextId('itemID-');
  //const [imageURL, setImageURL] = useState("");

  // UI component states
  const [logoPickerDialogOpen, setLogoPickerDialogOpen] = useState(false);
  const [colorPickerDialogOpen, setColorPickerDialogOpen] = useState(false);
  const [newLogoPickerDialogOpen, setNewLogoPickerDialogOpen] = useState(false);
  const [newColorPickerDialogOpen, setNewColorPickerDialogOpen] = useState(false);
  const [model, setModel] = useState(null);

  //const [productsList, setProductsList] = useState(true);
  //const [presetsList, setPresetsList] = useState(true);
  //const [presetPosition, setPresetPosition] = useState(1);
  //const [loading, setLoading] = useState(true);

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

  // Create the products object and use default model (T-shirt)
  const productsObjects = ProductsObjects({ lang });

  // Brand (color and logo) states
  const [selectedProduct, setSelectedProduct] = useState(productsObjects.TSHIRT);
  const [selectedEditableLogo, setSelectedEditableLogo] = useState(null);
  const [selectedEditableColor, setSelectedEditableColor] = useState({
    color: "",
    index: 0
  });
  const [selectedColor, setSelectedColor] = useState(() => {
    return colors[0];
  });
  const [selectedLogo, setSelectedLogo] = useState(() => {
    return logos[0];
  });
  const [selectedLogoIndex, setSelectedLogoIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [usableColors, setUsableColors] = useState(true);
  const [logoRotation, setLogoRotation] = useState(0);
  const [logoPosition, setLogoPosition] = useState(() => {
    return null
  });
  const [logoSize, setLogoSize] = useState(1);
  const [logoAspectRatios, setLogoAspectRatios] = useState({});
  const [logoLabel, setLogoLabel] = useState(null);
  const [freePick, setFreePick] = useState(false);
  const [itemAmount, setItemAmount] = useState(1);

  // States for the Babylon scene and engine
  //const [scene, setScene] = useState(null);
  const [engine, setEngine] = useState(null);
  const [activeCamera, setActiveCamera] = useState(null);

  const styles = useStyles();

  

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

  useEffect(() => {
    console.log('Useeffect logos ', logos)
  }, [logos])
  

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
    console.log('select product ', product)
    setSelectedProduct(product);
  };

  /*
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
  };*/

  const setLogo = (img) => {
    setSelectedLogo(img);
  };
  const setColor = (color) => {
    setSelectedColor(color);
  };

  const handleLogoEdit = (item, index) => {
    setSelectedEditableLogo([item, index]);
    setLogoPickerDialogOpen(true);
  };
  const handleColorEdit = (item, index) => {
    setSelectedEditableColor({
      color: item,
      index: index
    });
    setColorPickerDialogOpen(true);
  }

  const handleLogoRemove = (index) => {
    const newLogos = logos;

    // If logo to remove is selected logo, set selected logo state to null
    if (newLogos[index].image === selectedLogo) {
      setSelectedLogo(null);
      setSelectedLogoIndex(null);
    }

    newLogos.splice(index, 1)

    setLogos([...newLogos]);
  };

  const handleColorRemove = (index) => {
    const newColors = colors;
    console.log('colors ', colors)
    // If color to remove is selected color, set selected color state to null
    if (newColors[index] === selectedColor) {
      setSelectedColor(null);
      setSelectedColorIndex(null);
    }

    newColors.splice(index, 1);
    setColors([...newColors]);
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
  if (width < 960) {
    productsWidth = "200px";
  }
  if (width > 960) {
    productsWidth = "350px"
  }
  if (width > 2000) {
    productsWidth = "450px"
  }

  const addToCart = () => {
    let product = Object.values(selectedProduct)[0];
    let logoPos = logoPosition;
    createScreenshot().then((res) => {
      let screenshotFront = res.screenshotFront
      let screenshotBack = res.screenshotBack
      handleAddToCart(itemID, product.NAME, logoPos, logoLabel, itemAmount, screenshotFront, screenshotBack, selectedLogo);
    });
  };

  const handleCloseLogos = (value, index) => {
    // console.log('Handlecloselogos in results ', value, index)

    if (value !== null) {
      const newLogos = logos;

      // If the edited logo was selected logo, update selected logos
      if (index === selectedLogoIndex) {
        setSelectedLogo(value);
      }

      newLogos[index] = {
        image: value,
        colors: []
      }
      // console.log('NEW LOGOS ', newLogos, index)
      setLogos([...newLogos]);
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

  const handleCloseColors = (value, index) => {
    //console.log('handleclosecolors ', value, index)
    if (value !== null) {
      const newColors = colors;

      // If the edited color was selected color, update selected colors
      if (index === selectedColorIndex) {
        setSelectedColor(value);
      }

      newColors[index] = value
      setColors([...newColors]);
    }
    setColorPickerDialogOpen(false);
  };

  const handleCloseNewColor = (value) => {
    if (value !== null) {
      const newColors = colors;
      newColors.push(value);
      setColors(newColors);
    }
    setNewColorPickerDialogOpen(false);
  }


  return (
    <>
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
          <TableContainer striped bordered className="LogoPicker">
            <Table className="LogoTable">
              <TableBody className="LogoContainer">
                <LogoTable 
                lang={lang}
                logos={logos}
                selectedLogoIndex={selectedLogoIndex}
                setSelectedLogoIndex={setSelectedLogoIndex}
                setLogo={setLogo}
                calculateAspectRatios={calculateAspectRatios}
                logoAspectRatios={logoAspectRatios}
                setLogoAspectRatios={setLogoAspectRatios}
                handleLogoRemove={handleLogoRemove}
                handleLogoEdit={handleLogoEdit} 
                styles={styles}
                />
                <EditLogoDialog
                  selectedValue={selectedEditableLogo}
                  open={logoPickerDialogOpen}
                  onClose={handleCloseLogos}
                  ytunnus={response.code}
                  lang={lang}
                  styles={styles}
                />
                <TableCell alignRight>
                  <IconButton onClick={() => setNewLogoPickerDialogOpen(true)}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <NewLogoDialog
                    selectedValue={response.files}
                    open={newLogoPickerDialogOpen}
                    onClose={handleCloseNewLogo}
                    ytunnus={response.code}
                    lang={lang}
                    styles={styles}
                  />
                </TableCell>
              </TableBody>
            </Table>
          </TableContainer>
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
          <TableContainer className={usableColors ? 'ColorPicker' : 'ColorPickerDisabled'}>
            <Table className="ColorTable">
              <TableBody className="ColorContainer">
                <TableRow>
                <ColorTable
                lang={lang}
                colors={colors}
                selectedColorIndex={selectedColorIndex}
                setSelectedColorIndex={setSelectedColorIndex}
                setColor={setColor}
                handleColorRemove={handleColorRemove}
                handleColorEdit={handleColorEdit} 
                styles={styles}/>
                <EditColorDialog
                  selectedValue={selectedEditableColor}
                  palette={response.palette}
                  open={colorPickerDialogOpen}
                  onClose={handleCloseColors}
                  ytunnus={response.code}
                  lang={lang}
                  styles={styles}
                />
                <TableCell alignRight>
                  <IconButton fullWidth onClick={() => setNewColorPickerDialogOpen(true)}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <NewColorDialog
                    palette={response.palette}
                    open={newColorPickerDialogOpen}
                    onClose={handleCloseNewColor}
                    ytunnus={response.code}
                    lang={lang}
                    stylesResults={styles}
                  />
                </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {!usableColors &&
            <Typography variant="body2" className={styles.colorPickerDisabledText}>
              {TextValues.colorPickerDisabled(lang)}
            </Typography>
            }
          </TableContainer>
        </div>
        <div style={{ width: '95%' }} className="PreviewerWindow" onMouseOver={() => setLockScroll(true)} onMouseLeave={() => setLockScroll(false)}>
          <div style={{ position: 'relative', width: productsWidth }} className="Products">
            <ProductsList
              productsObjects={productsObjects}
              selectProduct={selectProduct}
              lang={lang}
            ></ProductsList>

              <div style={{ width: '100%', height: "80px", position: "absolute", bottom: "0", }}>
                <Input
                  style={{ marginLeft: "5%", textAlign: 'center', width: '80%', height: '10%', marginBottom: '10px', padding: '10px' }}
                  type={'number'}
                  defaultValue={itemAmount}
                  onChange={(e) => setItemAmount(e.target.value)}
                />
                <Button variant="contained" color="primary" style={{ width: '100%', height: '60%' }} onClick={() => addToCart()}>{TextValues.addToCart(lang)}</Button>
              </div>
          </div>
          <SceneComponent
            lang={lang}
            logo={selectedLogo}
            color={selectedColor}
            logoRotation={logoRotation}
            logoSize={logoSize}
            setLogoRotation={setLogoRotation}
            setLogoSize={setLogoSize}
            logoAspectRatios={logoAspectRatios}
            setUsableColors={setUsableColors}
            model={
              selectedProduct
            }
            selectModel={selectModel}
            setEngine={setEngine}
            //scene={scene}
            //setScene={setScene}
            setActiveCamera={setActiveCamera}
            logoPosition={logoPosition}
            setLogoPosition={setLogoPosition}
            setLogoLabel={setLogoLabel}
            freePick={freePick}
            setFreePick={setFreePick}
            
          />
        </div>
      </div>
      <div className="PlaceholderDiv"></div>
    </>
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