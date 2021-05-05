// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Tools } from "@babylonjs/core";
import TextValues from "../../tools/TextValues";
// eslint-disable-next-line no-unused-vars
import {
  useParams
} from "react-router-dom";
import "./Results.css";
import {
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  Input,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SceneComponent from "../SceneComponent";
import ProductsList from "../ProductsList/ProductsList";
import ProductsObjects from "../../tools/ProductsEnum";
import {
  paistoBaseResponse,
  metropoliaBaseResponse,
  vannoBaseResponse,
} from "../../tools/ExampleResponses";
import EditLogoDialog from "../PickerDialog/EditLogoDialog";
import EditColorDialog from "../PickerDialog/EditColorDialog";
import NewLogoDialog from "../PickerDialog/NewLogoDialog";
import NewColorDialog from "../PickerDialog/NewColorDialog";
import {
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import useWindowDimensions from "../../Hooks/WindowDimentions";
import nextId from "react-id-generator";
import calculateAspectRatios from "calculate-aspect-ratio";
import LogoTable from "../LogoTable/LogoTable";
import ColorTable from "../ColorTable/ColorTable";

/**
 * Contains the Babylon.js code for rendering the 3D preview window on the results page.
 *
 * @author Topias Peiponen
 * @since 03.02.2021
 */

/** Use this bit if API is in use
 * 
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
};*/

const useStyles = makeStyles({
  pickerIconEdit: {
    position: "absolute",
    right: 8,
    top: 40,
  },
  pickerIconRemove: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  infoCard: {
    flexBasis: "15%",
    maxWidth: "20%",
    marginBottom: "8px",
    marginRight: "32px",
    padding: "16px",
  },
  pickerTable: {
    flexBasis: "80%",
  },
  pickerItemBtn: {
    padding: "16px",
    height: "100%",
    borderRadius: "0",
    textAlign: "center",
    position: "relative"
  },
  ColorPicker: {
    flexBasis: "60%",
  },
  ColorPickerDisabled: {
    tableLayout: "fixed",
    flexBasis: "60%",
    pointerEvents: "none",
    opacity: "50%",
    zIndex: "4",
  },
  colorPickerDisabledText: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  logoPickerImgBtnNormal: {
    border: "1px solid rgba(224, 224, 224, 1)",
    padding: "0px",
  },
  colorPickerImgBtnNormal: {
    border: "1px solid rgba(224, 224, 224, 1)",
    padding: "0px",
  },
  logoPickerImgBtnSelected: {
    backgroundColor: "rgba(155, 155, 155, 0.5)",
    border: "1px solid rgba(224, 224, 224, 1)",
    padding: "0px",
  },
  colorPickerImgBtnSelected: {
    backgroundColor: "rgba(155, 155, 155, 0.5)",
    border: "1px solid rgba(224, 224, 224, 1)",
    padding: "0px",
  },
  dialogBrandItems: {
    maxWidth: "40vw",
  },
  basicShadow: {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  },
  basicShadowForImgPaper: {
    maxWidth: "100%",
    filter: "drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  },
  basicShadowForFluidImg: {
    maxWidth: "100%",
    height: "auto",
    filter: "drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))",
  },
});

const Results = ({ lang, handleAddToCart, setLockScroll }) => {
  const { id } = useParams();
  const itemID = nextId("itemID-");

  // UI component states
  const [logoPickerDialogOpen, setLogoPickerDialogOpen] = useState(false);
  const [colorPickerDialogOpen, setColorPickerDialogOpen] = useState(false);
  const [newLogoPickerDialogOpen, setNewLogoPickerDialogOpen] = useState(false);
  const [newColorPickerDialogOpen, setNewColorPickerDialogOpen] = useState(
    false
  );
  const [model, setModel] = useState(null);
  
  // eslint-disable-next-line no-unused-vars
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
    const getBaseResponse = () => {
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
    };
    const baseResponse = getBaseResponse();
    baseResponse.unshift("#fafafa");
    baseResponse.unshift("#212121");
    return baseResponse;
  });

  // Create the products object and use default model (T-shirt)
  const productsObjects = ProductsObjects({ lang });

  // Brand (color and logo) states
  const [selectedProduct, setSelectedProduct] = useState(
    productsObjects.TSHIRT
  );
  const [selectedEditableLogo, setSelectedEditableLogo] = useState(null);
  const [selectedEditableColor, setSelectedEditableColor] = useState({
    color: "",
    index: 0,
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
    return null;
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
    setSelectedLogo(logos[0].image);
    setSelectedColor(colors[0]);
    /*postCompany('https://api.logohaku.fi/get', id)
    .then(data => {
      console.log('Fetch request data: ', data);
    })*/

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Front-end functionality
  const selectModel = (selectedModel, decal) => {
    if (model != null) {
      model.dispose();
      for (var i = 0; i < selectedModel.meshes.length; i++) {
      }
    }
    if (decal != null) {
      decal.dispose();
    }
    setModel(selectedModel);
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
  };

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
      index: index,
    });
    setColorPickerDialogOpen(true);
  };

  const handleLogoRemove = (index) => {
    const newLogos = logos;

    // If logo to remove is selected logo, set selected logo state to null
    if (newLogos[index].image === selectedLogo) {
      setSelectedLogo(null);
      setSelectedLogoIndex(null);
    }

    newLogos.splice(index, 1);

    setLogos([...newLogos]);
  };

  const handleColorRemove = (index) => {
    const newColors = colors;
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
    const screenshotFront = await new Tools.CreateScreenshotUsingRenderTargetAsync(
      engine,
      activeCamera[0],
      1600
    );
    const screenshotBack = await new Tools.CreateScreenshotUsingRenderTargetAsync(
      engine,
      activeCamera[1],
      1600
    );
    return { screenshotFront: screenshotFront, screenshotBack: screenshotBack };
  };

  const { /*height,*/ width } = useWindowDimensions();
  let productsWidth = "300px";
  if (width < 960) {
    productsWidth = "200px";
  }
  if (width > 960) {
    productsWidth = "350px";
  }
  if (width > 2000) {
    productsWidth = "450px";
  }

  const addToCart = () => {
    let product = Object.values(selectedProduct)[0];
    console.log('prduct ', product)
    let logoPos = logoPosition;
    createScreenshot().then((res) => {
      let screenshotFront = res.screenshotFront;
      let screenshotBack = res.screenshotBack;
      handleAddToCart(
        itemID,
        selectedProduct.NAME,
        logoPos,
        logoLabel,
        itemAmount,
        screenshotFront,
        screenshotBack,
        selectedLogo
      );
    });
  };

  const handleCloseLogos = (value, index) => {
    if (value !== null) {
      const newLogos = logos;

      // If the edited logo was selected logo, update selected logos
      if (index === selectedLogoIndex) {
        setSelectedLogo(value);
      }
      newLogos[index] = {
        image: value,
        colors: [],
      };
      setLogos([...newLogos]);
    }

    setLogoPickerDialogOpen(false);
  };

  const handleCloseNewLogo = (value, index) => {
    if (value !== null) {
      const newLogos = logos;
      newLogos.push({
        image: value,
        colors: [],
      });
      setLogos(newLogos);
    }
    setNewLogoPickerDialogOpen(false);
  };

  const handleCloseColors = (value, index) => {
    if (value !== null) {
      const newColors = colors;

      // If the edited color was selected color, update selected colors
      if (index === selectedColorIndex) {
        setSelectedColor(value);
      }

      newColors[index] = value;
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
  };

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
          <TableContainer className="LogoPicker">
            <Table className="LogoTable">
              <TableBody className="LogoContainer">
                <TableRow>
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
                <TableCell>
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
                </TableRow>
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
          <TableContainer
            className={usableColors ? "ColorPicker" : "ColorPickerDisabled"}
          >
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
                    styles={styles}
                  />
                  <EditColorDialog
                    selectedValue={selectedEditableColor}
                    palette={response.palette}
                    open={colorPickerDialogOpen}
                    onClose={handleCloseColors}
                    ytunnus={response.code}
                    lang={lang}
                    styles={styles}
                  />
                  <TableCell >
                    <IconButton
                      onClick={() => setNewColorPickerDialogOpen(true)}
                    >
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
            {!usableColors && (
              <Typography
                variant="body2"
                className={styles.colorPickerDisabledText}
              >
                {TextValues.colorPickerDisabled(lang)}
              </Typography>
            )}
          </TableContainer>
        </div>
        <div
          style={{ width: "95%" }}
          className="PreviewerWindow"
          onMouseOver={() => setLockScroll(true)}
          onMouseLeave={() => setLockScroll(false)}
        >
          <div
            style={{ position: "relative", width: productsWidth }}
            className="Products"
          >
            <ProductsList
              productsObjects={productsObjects}
              selectProduct={selectProduct}
              lang={lang}
            ></ProductsList>

            <div
              style={{
                width: "100%",
                height: "80px",
                position: "absolute",
                bottom: "0",
              }}
            >
              <Input
                style={{
                  marginLeft: "5%",
                  textAlign: "center",
                  width: "80%",
                  height: "10%",
                  marginBottom: "10px",
                  padding: "10px",
                }}
                type={"number"}
                defaultValue={itemAmount}
                onChange={(e) => setItemAmount(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ width: "100%", height: "60%" }}
                onClick={() => addToCart()}
              >
                {TextValues.addToCart(lang)}
              </Button>
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
            model={selectedProduct}
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
