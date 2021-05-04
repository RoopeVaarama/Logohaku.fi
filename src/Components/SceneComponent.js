import { Engine, Model, Scene } from "react-babylonjs";
import {
  Vector3,
  Color3,
  MeshBuilder,
  Texture,
  StandardMaterial,
  FreeCamera,
} from "@babylonjs/core";
import React, { Suspense, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Slider,
  Typography,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import TextValues from "../tools/TextValues";
import "./SceneComponent.css";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    position: "absolute",
  },
  slider: {
    height: "50%",
    width: "8px",
    right: "0",
    marginTop: "8px",
  },
});

/**
 * React component for utilizing Babylon.js
 *
 * @author Topias Peiponen
 * @since 3.2.2021
 *
 */

const SceneComponent = ({
  lang,
  logo,
  color,
  model,
  selectModel,
  setEngine,
  setActiveCamera,
  logoPosition,
  setLogoPosition,
  setLogoLabel,
  freePick,
  setFreePick,
  logoRotation,
  setLogoRotation,
  logoSize,
  setLogoSize,
  logoAspectRatios,
  setUsableColors,
}) => {
  const [currentScene, setCurrentScene] = useState(null);
  const [decal, setDecal] = useState(null);
  const [currentModel, setCurrentModel] = useState(null);
  const [
    positionNotSelecedSnackbarOpen,
    setPositionNotSelectedSnackbarOpen,
  ] = useState(false);
  const [
    positionFreePickNotOnSnackbarOpen,
    setPositionFreePickNotOnSnackbarOpen,
  ] = useState(false);

  const classes = useStyles();

  // Set model size and position based on props model
  const modelSize = new Vector3(model.SIZE, model.SIZE, model.SIZE);
  const modelPosition = new Vector3(
    model.POSITION.X,
    model.POSITION.Y,
    model.POSITION.Z
  );

  useEffect(() => {
    if (model.CUSTOM_COLOR_ON) {
      setUsableColors(true);
    } else {
      setUsableColors(false);
    }
  });

  useEffect(() => {
    if (
      currentModel !== null &&
      color !== null &&
      model.CUSTOM_COLOR_ON === true
    ) {
      const meshes = currentModel._scene.meshes;
      for (var i in meshes) {
        if (
          meshes[i].metadata !== null &&
          model.COLORABLE_MESHES.includes(meshes[i].name)
        ) {
          const newMat = new StandardMaterial("material" + i + i, currentScene);
          newMat.diffuseColor = new Color3.FromHexString(color);
          meshes[i].material = newMat;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  // Set new logo everytime logo position is changed (from the radio menu)
  useEffect(() => {
    if (logoPosition !== null && !freePick && logo !== null) {
      if (decal !== null) {
        decal.dispose();
      }

      const objectForm = JSON.parse(logoPosition);
      const decalMaterial = new StandardMaterial("decalMat", currentScene);
      decalMaterial.diffuseTexture = new Texture(logo, currentScene);

      var actualLogoSize = null;
      if (logo in logoAspectRatios) {
        const splitAspectRatio = logoAspectRatios[logo].split(":");
        if (splitAspectRatio[0] > splitAspectRatio[1]) {
          const ratio = splitAspectRatio[0] / splitAspectRatio[1];
          actualLogoSize = new Vector3(logoSize * ratio, logoSize, 1);
        } else if (splitAspectRatio[1] > splitAspectRatio[0]) {
          const ratio = splitAspectRatio[1] / splitAspectRatio[0];
          actualLogoSize = new Vector3(logoSize, logoSize * ratio, 1);
        } else if (splitAspectRatio[0] === splitAspectRatio[1]) {
          actualLogoSize = new Vector3(logoSize, logoSize, 1);
        }
      }

      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -2;

      var mesh;
      for (var i in currentModel._scene.meshes) {
        if (objectForm.MESH_NAME === currentModel._scene.meshes[i].name) {
          mesh = currentModel._scene.meshes[i];
          const decalSize = actualLogoSize;
          const decalRotation = logoRotation;

          /**************************CREATE DECAL*************************************************/
          const decal = MeshBuilder.CreateDecal("decal", mesh, {
            position: new Vector3(
              objectForm.POSITION_VECTOR[0],
              objectForm.POSITION_VECTOR[1],
              objectForm.POSITION_VECTOR[2]
            ),
            normal: new Vector3(
              objectForm.NORMAL_VECTOR[0],
              objectForm.NORMAL_VECTOR[1],
              objectForm.NORMAL_VECTOR[2]
            ),
            size: decalSize,
            angle: decalRotation,
          });
          decal.material = decalMaterial;
          setDecal(decal);
        }
      }
    } else if (logo === null) {
      handlePositionNotSelectedSnackbarClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoPosition]);

  // Set new decal everytime logo ROTATION, POSITION or LOGO ITSELF was changed
  useEffect(() => {
    if (logoPosition !== null) {
      if (decal !== null) {
        decal.dispose();
      }

      const objectForm = JSON.parse(logoPosition);
      const decalMaterial = new StandardMaterial("decalMat", currentScene);
      decalMaterial.diffuseTexture = new Texture(logo, currentScene);

      var actualLogoSize = null;
      if (logo in logoAspectRatios) {
        const splitAspectRatio = logoAspectRatios[logo].split(":");

        if (splitAspectRatio[0] > splitAspectRatio[1]) {
          const ratio = splitAspectRatio[0] / splitAspectRatio[1];
          actualLogoSize = new Vector3(logoSize * ratio, logoSize, 1);
        } else if (splitAspectRatio[1] > splitAspectRatio[0]) {
          const ratio = splitAspectRatio[1] / splitAspectRatio[0];
          actualLogoSize = new Vector3(logoSize, logoSize * ratio, 1);
        } else if (splitAspectRatio[0] === splitAspectRatio[1]) {
          actualLogoSize = new Vector3(logoSize, logoSize, 1);
        }
      }

      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -20;

      var mesh;
      for (var i in currentModel._scene.meshes) {
        if (
          objectForm.MESH_NAME === currentModel._scene.meshes[i].name &&
          logoSize !== null
        ) {
          mesh = currentModel._scene.meshes[i];
          const decalSize = actualLogoSize;
          const decalRotation = logoRotation;

          /**************************CREATE DECAL*************************************************/
          const decal = MeshBuilder.CreateDecal("decal", mesh, {
            position: new Vector3(
              objectForm.POSITION_VECTOR[0],
              objectForm.POSITION_VECTOR[1],
              objectForm.POSITION_VECTOR[2]
            ),
            normal: new Vector3(
              objectForm.NORMAL_VECTOR[0],
              objectForm.NORMAL_VECTOR[1],
              objectForm.NORMAL_VECTOR[2]
            ),
            size: decalSize,
            angle: decalRotation,
          });
          decal.material = decalMaterial;
          setDecal(decal);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoRotation, logoSize, logo]);

  function onSceneMount(e) {
    const { scene } = e;
    scene.clearColor = Color3.FromHexString("#f5f5f5");
    setCurrentScene(scene);
    setEngine(scene.getEngine());
    const frontCam = new FreeCamera(
      "FrontCamera",
      new Vector3(0, 0, 15),
      scene,
      false
    );
    const backCam = new FreeCamera(
      "BackCamera",
      new Vector3(0, 0, -15),
      scene,
      false
    );
    frontCam.setTarget(Vector3.Zero());
    backCam.setTarget(Vector3.Zero());
  }

  const onModelLoaded = (model) => {
    selectModel(model, decal);
  };

  const onModelCreated = (rootMesh) => {
    setCurrentModel(rootMesh);
    setActiveCamera([
      currentScene.getCameraByName("FrontCamera"),
      currentScene.getCameraByName("BackCamera"),
    ]);
    const meshes = rootMesh._scene.meshes;
    if (model.CUSTOM_COLOR_ON === true) {
      for (var i in meshes) {
        if (
          meshes[i].metadata !== null &&
          model.COLORABLE_MESHES.includes(meshes[i].name)
        ) {
          const newMat = new StandardMaterial("material" + 1, currentScene);
          newMat.diffuseColor = new Color3.FromHexString(color);
          meshes[i].material = newMat;
        }
      }
    }
  };

  const onPointerPick = (e, pickInfo) => {
    if (freePick) {
      const decalMaterial = new StandardMaterial("decalMat", currentScene);
      decalMaterial.diffuseTexture = new Texture(logo, currentScene);
      var actualLogoSize = null;
      if (logo in logoAspectRatios) {
        const splitAspectRatio = logoAspectRatios[logo].split(":");

        if (splitAspectRatio[0] > splitAspectRatio[1]) {
          const ratio = splitAspectRatio[0] / splitAspectRatio[1];
          actualLogoSize = new Vector3(logoSize * ratio, logoSize, 1);
        } else if (splitAspectRatio[1] > splitAspectRatio[0]) {
          const ratio = splitAspectRatio[1] / splitAspectRatio[0];
          actualLogoSize = new Vector3(logoSize, logoSize * ratio, 1);
        } else if (splitAspectRatio[0] === splitAspectRatio[1]) {
          actualLogoSize = new Vector3(logoSize, logoSize, 1);
        }
      }
      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -2;

      if (decal != null && pickInfo.name !== "decal") {
        decal.dispose();
      }

      if (pickInfo.hit && pickInfo.pickedMesh.name !== "decal") {
        const mesh = pickInfo.pickedMesh;
        if (pickInfo.pickedPoint !== null) {

          // This is used for picking positions from meshes to include in the products list
          // eslint-disable-next-line no-unused-vars
          const meshObj =
            "POSITION_VECTOR: [" +
            pickInfo.pickedPoint.x +
            "," +
            pickInfo.pickedPoint.y +
            "," +
            pickInfo.pickedPoint.z +
            "],\n" +
            "NORMAL_VECTOR: [" +
            pickInfo.getNormal(true).x +
            "," +
            pickInfo.getNormal(true).y +
            "," +
            pickInfo.getNormal(true).z +
            "],\n" +
            "MESH_NAME: " +
            pickInfo.pickedMesh.name +
            ",\nNAME: ";
          const newLogoPosition = {
            MESH_NAME: pickInfo.pickedMesh.name,
            NAME: "freePick",
            NORMAL_VECTOR: [
              pickInfo.getNormal(true).x,
              pickInfo.getNormal(true).y,
              pickInfo.getNormal(true).z,
            ],
            POSITION_VECTOR: [
              pickInfo.pickedPoint.x,
              pickInfo.pickedPoint.y,
              pickInfo.pickedPoint.z,
            ],
          };
          handleFreeLogoChange(JSON.stringify(newLogoPosition));
          setLogoLabel(TextValues.freePicking(lang));
        }
        const decalSize = actualLogoSize;
        const decalRotation = logoRotation;

        // Create decal
        const decal = MeshBuilder.CreateDecal("decal", mesh, {
          position: pickInfo.pickedPoint,
          normal: pickInfo.getNormal(true),
          size: decalSize,
          angle: decalRotation,
        });
        decal.material = decalMaterial;
        setDecal(decal);
      }
    } else if (!freePick && logo === null) {
      handlePositionNotSelectedSnackbarClick();
    } else if (!freePick && logo !== null) {
      handlePositionFreePickNotOnSnackbarClick();
    }
  };

  const degToRad = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const createPositionsRadioButtons = () => {
    const logoPositionsArray = Object.entries(model.LOGO_POSITIONS);
    //console.log(logoPositionsArray);
    return logoPositionsArray.map((position) => (
      <FormControlLabel
        key={position}
        className="RadioButton"
        disabled={freePick}
        value={JSON.stringify(position[1])}
        control={<Radio />}
        label={position[1].NAME}
      ></FormControlLabel>
    ));
  };

  const handleChange = (event) => {
    let val = JSON.parse(event.target.value);
    //console.log(val.NAME)
    setLogoLabel(val.NAME);
    setLogoPosition(event.target.value);
  };
  const handleFreeLogoChange = (pos) => {
    setLogoPosition(pos);
  };

  const handleSwitchChange = (event) => {
    setFreePick(event.target.checked);
  };

  const handleRotationChange = (event, newRotation) => {
    setLogoRotation(degToRad(newRotation));
  };

  const handleSizeChange = (event, newSize) => {
    setLogoSize(newSize / 100);
  };

  const handlePositionNotSelectedSnackbarClick = () => {
    setPositionNotSelectedSnackbarOpen(true);
  };

  const handlePositionNotSelectedSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setPositionNotSelectedSnackbarOpen(false);
  };

  const handlePositionFreePickNotOnSnackbarClick = () => {
    setPositionFreePickNotOnSnackbarOpen(true);
  };

  const handlePositionFreePickNotOnSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setPositionFreePickNotOnSnackbarOpen(false);
  };

  return (
    <div className="Container">
      <FormControl
        component="fieldset"
        className="PositionController"
        classes={{ root: classes.root }}
      >
        <FormLabel component="legend">
          {TextValues.logoPosition(lang)}
        </FormLabel>
        <FormControlLabel
          value={freePick}
          control={<Switch color="primary" />}
          label={TextValues.freePicking(lang)}
          onChange={handleSwitchChange}
          labelPlacement="end"
        ></FormControlLabel>
        <RadioGroup
          className="PositionRadio"
          aria-label="positionRadio"
          name="pos1"
          value={logoPosition}
          onChange={handleChange}
        >
          {createPositionsRadioButtons()}
        </RadioGroup>
      </FormControl>
      <Snackbar
        open={positionNotSelecedSnackbarOpen}
        autoHideDuration={2000}
        onClose={handlePositionNotSelectedSnackbarClose}
      >
        <Alert
          onClose={handlePositionNotSelectedSnackbarClose}
          severity="warning"
        >
          {TextValues.positionChangeWarning(lang)}
        </Alert>
      </Snackbar>
      <Snackbar
        open={positionFreePickNotOnSnackbarOpen}
        autoHideDuration={2000}
        onClose={handlePositionFreePickNotOnSnackbarClose}
      >
        <Alert
          onClose={handlePositionFreePickNotOnSnackbarClose}
          severity="warning"
        >
          {TextValues.positionFreePickNotOnWarning(lang)}
        </Alert>
      </Snackbar>
      <Suspense fallback={<CircularProgress></CircularProgress>}>
        <Engine
          antialias
          adaptToDeviceRatio
          canvasId="PreviewCanvas"
          className="PreviewCanvas"
        >
          <Scene onSceneMount={onSceneMount} onPointerPick={onPointerPick}>
            <arcRotateCamera
              name="camera1"
              target={Vector3.Zero()}
              alpha={Math.PI / 2}
              beta={Math.PI / 3}
              radius={10}
              wheelPrecision={[10]}
            />
            <hemisphericLight
              name="light1"
              intensity={0.75}
              direction={new Vector3(-1, 1, 0)}
            />
            <hemisphericLight
              name="light2"
              intensity={0.75}
              direction={new Vector3(1, 1, 0)}
            />
            <Suspense
              fallback={
                <torus
                  rotation={new Vector3(0, Math.PI / 2, Math.PI / 2)}
                  thickness={0.25}
                  name={"LoaderTorus"}
                ></torus>
              }
            >
              <Model
                name={model.NAME}
                key={model.NAME}
                position={modelPosition}
                rootUrl={"../Models/"}
                sceneFilename={model.URL}
                pluginExtension={model.FILE_TYPE}
                scaling={modelSize}
                onModelLoaded={onModelLoaded}
                onCreated={onModelCreated}
              ></Model>
            </Suspense>
          </Scene>
        </Engine>
      </Suspense>
      <div className="SliderContainer">
        <div className="RotationContainer">
          <Typography>{TextValues.logo_rotation_title(lang)}</Typography>
          <Slider
            key="rotationSlider"
            orientation="vertical"
            defaultValue={0}
            aria-labelledby="rotation-slider"
            valueLabelDisplay="auto"
            step={15}
            min={0}
            max={360}
            className={classes.slider}
            onChange={handleRotationChange}
          />
        </div>
        <div className="SizeContainer">
          <Typography>{TextValues.logo_size_title(lang)}</Typography>
          <Slider
            key="sizeSlider"
            orientation="vertical"
            aria-labelledby="rotation-slider"
            valueLabelDisplay="auto"
            step={10}
            min={0}
            max={400}
            className={classes.slider}
            onChange={handleSizeChange}
            defaultValue={100}
          />
        </div>
      </div>
    </div>
  );
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default SceneComponent;
