import {
  Engine, Model, Scene,
  //DynamicTexture, Image, Ground, Box 
} from "react-babylonjs";
import {
  Vector3, Color3, MeshBuilder, Texture, StandardMaterial, FreeCamera
  //Tools, ExecuteCodeAction, VertexBuffer,  
} from "@babylonjs/core";
import React, {
  Suspense, useEffect, useState,
  //MenuItemuseRef, addEventListener
} from "react";
import {
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Switch, Slider, Typography
  //MenuItem, Menu, Button,
} from "@material-ui/core";
//import { InputManager } from "@babylonjs/core/Inputs/scene.inputManager";
import TextValues from "../tools/TextValues";
import "./SceneComponent.css";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: 'absolute'
  },
  slider: {
    height: "50%",
    width: "8px",
    right: "0",
    marginTop: "8px"
  }
});

/**
 * React component for utilizing Babylon.js
 *
 * @author Topias Peiponen
 * @since 3.2.2021
 *
 */

const SceneComponent = ({ lang, logo, color, model, selectModel, setEngine, setScene, setActiveCamera, logoPosition, setLogoPosition, setLogoLabel, freePick, setFreePick, logoRotation, setLogoRotation }) => {
  const [scene1, setScene1] = useState(null);
  const [decal, setDecal] = useState(null);
  const [currentModel, setCurrentModel] = useState(null);
  //const [selectedLogo, setSelectedLogo] = useState(null);
  //const [currentModelJson, setCurrentModelJson] = useState(null);

  const classes = useStyles();

  const modelSize = new Vector3(model.SIZE, model.SIZE, model.SIZE);
  modelSize._isDirty = false;
  //console.log("initial name ", color);
  const modelPosition = new Vector3(
    model.POSITION.X,
    model.POSITION.Y,
    model.POSITION.Z
  );
  modelPosition._isDirty = false;
  //console.log("initial pos  ", modelPosition);

  useEffect(() => {
    //const RGBColor = hexToRGB(color[1]);
    if (currentModel !== null && color !== null && currentModel.CUSTOM_COLOR_ON === true) {
      const meshes = currentModel._scene.meshes;
      //console.log("current model ", meshes, color);
      for (var i in meshes) {
        if (meshes[i].metadata !== null) {
          const newMat = new StandardMaterial("material" + i + i, scene1);
          newMat.diffuseColor = new Color3.FromHexString(color);
          meshes[i].material = newMat;
        }
      }
    }
    /*for (var i in model.meshes) {
      if (model.meshes[i].metadata !== null) {
        const newMat = new StandardMaterial("material"+1, scene1);
        newMat.diffuseColor = new Color3(RGBColor[0], RGBColor[1], RGBColor[2]);
        model.meshes[i].material = newMat;
      }
    }*/
  }, [color]);

  useEffect(() => {
    if (logoPosition !== null && !freePick) {
      if (decal !== null) {
        decal.dispose();
      }

      const objectForm = JSON.parse(logoPosition);
      //console.log('ObjectForm ', objectForm);

      const decalMaterial = new StandardMaterial("decalMat", scene1);
      decalMaterial.diffuseTexture = new Texture(logo, scene1);
      //console.log("Decal image is: /", logo);
      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -20;

      var mesh;
      for (var i in currentModel._scene.meshes) {
        //console.log(currentModel._scene.meshes[i])
        //console.log(logoPosition.NAME)
        if (objectForm.MESH_NAME === currentModel._scene.meshes[i].name) {
          //console.log("match")
          mesh = currentModel._scene.meshes[i]
          const decalSize = new Vector3(model.LOGO_SIZE, model.LOGO_SIZE, model.LOGO_SIZE);
          const decalRotation = logoRotation;

          /**************************CREATE DECAL*************************************************/
          const decal = MeshBuilder.CreateDecal("decal", mesh, {
            position: new Vector3(objectForm.POSITION_VECTOR[0], objectForm.POSITION_VECTOR[1], objectForm.POSITION_VECTOR[2]),
            normal: new Vector3(objectForm.NORMAL_VECTOR[0], objectForm.NORMAL_VECTOR[1], objectForm.NORMAL_VECTOR[2]),
            size: decalSize,
            angle: decalRotation
          });
          decal.material = decalMaterial;
          setDecal(decal);
        }
      }

    }
  }, [logoPosition]);

  useEffect(() => {
    if (logoPosition !== null) {
      if (decal !== null) {
        decal.dispose();
      }

      const objectForm = JSON.parse(logoPosition);
      //console.log('ObjectForm ', objectForm);

      const decalMaterial = new StandardMaterial("decalMat", scene1);
      decalMaterial.diffuseTexture = new Texture(logo, scene1);
      //console.log("Decal image is: /", logo);
      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -20;

      var mesh;
      for (var i in currentModel._scene.meshes) {
        //console.log(currentModel._scene.meshes[i])
        //console.log(logoPosition.NAME)
        if (objectForm.MESH_NAME === currentModel._scene.meshes[i].name) {
          //console.log("match")
          mesh = currentModel._scene.meshes[i]
          const decalSize = new Vector3(model.LOGO_SIZE, model.LOGO_SIZE, model.LOGO_SIZE);
          const decalRotation = logoRotation;

          /**************************CREATE DECAL*************************************************/
          const decal = MeshBuilder.CreateDecal("decal", mesh, {
            position: new Vector3(objectForm.POSITION_VECTOR[0], objectForm.POSITION_VECTOR[1], objectForm.POSITION_VECTOR[2]),
            normal: new Vector3(objectForm.NORMAL_VECTOR[0], objectForm.NORMAL_VECTOR[1], objectForm.NORMAL_VECTOR[2]),
            size: decalSize,
            angle: decalRotation
          });
          decal.material = decalMaterial;
          setDecal(decal);
        }
      }

    }
  }, [logoRotation]);

  useEffect(() => {
    if (currentModel !== null) {
      //console.log("UseEffect ", currentModel);
      const modelArray = Object.entries(model);
      //console.log("Object entries ", model);
      for (var i in modelArray) {
        //console.log("Model array ", modelArray[i].NAME);
        if (modelArray[i].NAME === currentModel.name) {
          //console.log("Model match");
        }
      }
    }
  }, [currentModel]);

  function onSceneMount(e) {
    const { canvas, scene } = e;
    scene.clearColor = Color3.FromHexString("#f5f5f5")
    setScene1(scene);
    setScene(scene);
    //console.log('OnSceneMount ', scene, scene.getEngine(), scene.getCameraByName("camera1"))
    setEngine(scene.getEngine());
    const frontCam = new FreeCamera("FrontCamera", new Vector3(0, 0, 15), scene, false);
    const backCam = new FreeCamera("BackCamera", new Vector3(0, 0, -15), scene, false);
    frontCam.setTarget(Vector3.Zero());
    backCam.setTarget(Vector3.Zero());
    //console.log("onscenemount " + { scene1 });
  }

  const onModelLoaded = (model) => {
    //console.log("Model loaded: ", model.meshes);
    selectModel(model, decal);
  };

  const onModelCreated = (rootMesh) => {
    setCurrentModel(rootMesh);
    setActiveCamera([scene1.getCameraByName('FrontCamera'), scene1.getCameraByName('BackCamera')])
    //console.log("Created model: ", rootMesh);
    const meshes = rootMesh._scene.meshes;
    //console.log("current model ", meshes, color);
    if (model.CUSTOM_COLOR_ON === true) {
      for (var i in meshes) {
      if (meshes[i].metadata !== null) {
        const newMat = new StandardMaterial("material" + 1, scene1);
        newMat.diffuseColor = new Color3.FromHexString(color);
        meshes[i].material = newMat;
      }
    }}
  };


  const onPointerPick = (e, pickInfo) => {
    if (freePick) {
      //console.log("Decal material: /", logo);
      const decalMaterial = new StandardMaterial("decalMat", scene1);
      decalMaterial.diffuseTexture = new Texture(logo, scene1);
      //console.log("Decal image is:", logo);
      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -2;

      console.log('Checking if decal exists', decal);
      if (decal != null && pickInfo.name !== "decal") {
        decal.dispose();
      }
      console.log('Checking if decal exists', decal);

      if (pickInfo.hit && pickInfo.pickedMesh.name !== "decal") {
        const mesh = pickInfo.pickedMesh;
        //console.log('PickInfo ', pickInfo.pickedPoint)
        if (pickInfo.pickedPoint !== null) {
          const meshObj = "POSITION_VECTOR: [" + pickInfo.pickedPoint.x + "," + pickInfo.pickedPoint.y + "," + pickInfo.pickedPoint.z + "],\n" + "NORMAL_VECTOR: [" + pickInfo.getNormal(true).x + "," + pickInfo.getNormal(true).y + "," + pickInfo.getNormal(true).z + "],"
          const newLogoPosition = {
            MESH_NAME: pickInfo.pickedMesh.name,
            NAME: "freePick",
            NORMAL_VECTOR: [pickInfo.getNormal(true).x, pickInfo.getNormal(true).y, pickInfo.getNormal(true).z],
            POSITION_VECTOR: [pickInfo.pickedPoint.x, pickInfo.pickedPoint.y, pickInfo.pickedPoint.z]
          }
          handleFreeLogoChange(JSON.stringify(newLogoPosition));
          setLogoLabel(TextValues.freePicking(lang))
          console.log(meshObj);
        }
        console.log("PickInfo " + pickInfo.pickedPoint + pickInfo.getNormal(true) + "mesh " + mesh);
        const decalSize = new Vector3(model.LOGO_SIZE, model.LOGO_SIZE, model.LOGO_SIZE);
        const decalRotation = logoRotation

        /**************************CREATE DECAL*************************************************/
        const decal = MeshBuilder.CreateDecal("decal", mesh, {
          position: pickInfo.pickedPoint,
          normal: pickInfo.getNormal(true),
          size: decalSize,
          angle: decalRotation
        });
        decal.material = decalMaterial;
        setDecal(decal);
      }
    }
  };

  const degToRad = (degrees) => {
    return degrees * (Math.PI / 180);
  }

  const createPositionsRadioButtons = () => {
    const logoPositionsArray = Object.entries(model.LOGO_POSITIONS);
    //console.log(logoPositionsArray);
    return logoPositionsArray.map((position) => (
      <FormControlLabel className="RadioButton" disabled={freePick} value={JSON.stringify(position[1])} control={<Radio />} label={position[1].NAME}></FormControlLabel>
    ))
  }

  const handleChange = (event) => {
    let val = JSON.parse(event.target.value)
    //console.log(val.NAME)
    setLogoLabel(val.NAME)
    console.log('event ', JSON.parse(event.target.value))
    setLogoPosition(event.target.value)
  }
  const handleFreeLogoChange = (pos) => {
    setLogoPosition(pos);
  }

  const handleSwitchChange = (event) => {
    console.log('Handle switch change ', event.target.checked)
    setFreePick(event.target.checked);
  }

  const handleRotationChange = (event, newRotation) => {
    setLogoRotation(degToRad(newRotation));
  }

  return (
    <div className="Container">
      <FormControl component="fieldset" className="PositionController" classes={{ root: classes.root }}>
        <FormLabel component="legend">{TextValues.logoPosition(lang)}</FormLabel>
        <FormControlLabel
          value={freePick}
          control={<Switch color="primary" />}
          label={TextValues.freePicking(lang)}
          onChange={handleSwitchChange}
          labelPlacement="end">
        </FormControlLabel>
        <RadioGroup className="PositionRadio" aria-label="positionRadio" name="pos1" value={logoPosition} onChange={handleChange}>
          {createPositionsRadioButtons()}
        </RadioGroup>
      </FormControl>
      <Engine antialias adaptToDeviceRatio canvasId="PreviewCanvas" className="PreviewCanvas">
        <Scene onSceneMount={onSceneMount} onPointerPick={onPointerPick} >
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
          <Suspense fallback={<box position={new Vector3(0, 0, 0)}></box>}>
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
      <div className="RotationContainer">
      <Typography>
        {TextValues.logo_rotation_title(lang)}
      </Typography>
      <Slider
        orientation="vertical"
        defaultValue={0}
        aria-labelledby="rotation-slider"
        valueLabelDisplay="auto"
        step={15}
        min={0}
        max={360}
        className={classes.slider}
        onChange={handleRotationChange}
        value={model.ROTATION}
        />
       </div>
    </div>
  );
};

export default SceneComponent;
