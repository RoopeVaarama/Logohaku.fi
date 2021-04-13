import React, { Suspense, useState, useEffect } from "react";
import TextValues from "../../tools/TextValues";
import PickerDialog from "../PickerDialog/PickerDialog";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import "./Results.css";
import Box from '@material-ui/core/Box';
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SceneComponent from "../SceneComponent";
import ProductsList from "../ProductsList/ProductsList";
import PresetsList from "../PresetsList/PresetsList";
import Button from "@material-ui/core/Button";
import ProductsObjects from "../../tools/ProductsEnum";
import { Vector3 } from "@babylonjs/core";
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
import {makeStyles} from "@material-ui/core";

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
  }
})

const Results = ({ lang, handleAddToCart }) => {
  const { id } = useParams();
  const [imageURL, setImageURL] = useState("");

  // UI component states
  const [logoPickerDialogOpen, setLogoPickerDialogOpen] = useState(false);
  const [colorPickerDialogOpen, setColorPickerDialogOpen] = useState(false);
  const [newLogoPickerDialogOpen, setNewLogoPickerDialogOpen] = useState(false);
  const [newColorPickerDialogOpen, setNewColorPickerDialogOpen] = useState(false);
  const [productsList, setProductsList] = useState(true);
  const [presetsList, setPresetsList] = useState(true);
  const [presetPosition, setPresetPosition] = useState(1);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Brand (color and logo) states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedEditableLogo, setSelectedEditableLogo] = useState(null);
  const [selectedEditableColor, setSelectedEditableColor] = useState({
    color: "",
    index: 0
  });
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);

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
    console.log("Responses here! ", response);
    const imageUrl = baseUrl + response.code + "/"
    console.log('Imageurl ',imageUrl);
    setImageURL(imageUrl);
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
      console.log("rootmesh ", selectedModel);
      for (var i = 0; i < selectedModel.meshes.length; i++) {
        console.log("looping ", selectedModel.meshes[i].scaling);
      }
    }
    if (decal != null) {
      decal.dispose();
    }
    setModel(selectedModel);
  };

  const selectProduct = (product) => {
    console.log("Setting product", Object.values(product)[0]);
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
    console.log("Seleted logo here", img);
    setSelectedLogo(img);
  };
  const printC = (color) => {
    console.log("SELECTED COLOR ", color);
    setSelectedColor(color);
  };

  const handleLogoEdit = (item, index) => {
    console.log("HandleLogoEdit ", item, index);
    setSelectedEditableLogo([item, index]);
    setLogoPickerDialogOpen(true);
  };
  const handleColorEdit = (item, index) => {
    console.log('HandleColorEdit ', item);
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

  const mapLogos = () => {
    const logoArray = logos
    console.log("Logo Arrays ", logoArray);
    console.log('Imageurl ', imageURL);
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
            <HighlightOffIcon />
          </IconButton>
          <IconButton
            className={styles.pickerIconEdit}
            color="primary"
            aria-label="edit logo"
            onClick={(e) => handleLogoEdit(item.image, index)}
          >
            <EditIcon />
          </IconButton>
        </Button>
      </td>
    ));
  };

  const mapColors = () => {
    console.log("colors: ", colors);
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
            <HighlightOffIcon />
          </IconButton>
          <IconButton
            className={styles.pickerIconEdit}
            color="primary"
            aria-label="edit logo"
            onClick={(e) => handleColorEdit(color, index)}
          >
            <EditIcon />
          </IconButton>
        </Button>
      </td>
    ));
  };
  console.log(selectedProduct);
  const addToCart = () => {
    console.log("selectedProduct", Object.values(selectedProduct)[0].NAME);
    let product = Object.values(selectedProduct)[0];
    console.log(product);
    handleAddToCart(product.ID, product.NAME, presetPosition);
  };

  const handleCloseLogos = (value, index) => {
    console.log('Handlecloselogos in results ', value, index)
    
    if (value !== null) {
      const newLogos = logos;
    newLogos[index] = {
      image: value,
      colors: []
    }
    console.log('NEW LOGOS ', newLogos)
    setLogos(newLogos);
  }

    setLogoPickerDialogOpen(false);
  };

  const handleCloseNewLogo = (value, index) => {
    console.log('HandleCLoseNewLogo ', value, index);
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
    console.log('handleclosecolors ', value, index)
    if (value !== null) {
      const newColors = colors;
      newColors[index] = value
      setColors(newColors);
    }
    setColorPickerDialogOpen(false);
  };

  return (
    <div>
      <h1>{TextValues.results(lang)}</h1>
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
      <div className="PreviewerWindow">
        <div className="ButtonPanel">
          <Button className="CatalogButton" onClick={toggleProductsList}>
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
            <div className="CatalogText">Catalog</div>
          </Button>
          <Button className="PresetsButton" onClick={togglePresetsList}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50%"
              height="50%"
              fill="currentColor"
              className="PresetsIcon"
              viewBox="0 0 16 16"
            >
              <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z" />
            </svg>
            <div className="PresetsText">Presets</div>
          </Button>
        </div>
        <div className="Products" hidden={productsList}>
          <ProductsList
            productsObjects={productsObjects}
            selectProduct={selectProduct}
          ></ProductsList>
        </div>
        <div className="Presets" hidden={presetsList}>
          <PresetsList></PresetsList>
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
        />
        <button onClick={() => addToCart()}>Add to cart</button>
      </div>
      <div className="PlaceholderDiv"></div>
    </div>
  );
};

export default Results;
