import { Box, Engine, Ground, Model, Scene, DynamicTexture, Image } from "react-babylonjs";
import { Vector3, Color3, MeshBuilder, Color4, ActionManager, SetValueAction, Texture, StandardMaterial, ExecuteCodeAction, VertexBuffer } from "@babylonjs/core";
import React, { Suspense, useEffect, useRef, useState, addEventListener } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Switch from '@material-ui/core/Switch';
import { InputManager } from "@babylonjs/core/Inputs/scene.inputManager";
import TextValues from "../tools/TextValues";
import "./SceneComponent.css";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: 'absolute'
  }
});

/**
 * React component for utilizing Babylon.js
 *
 * @author Topias Peiponen
 * @since 3.2.2021
 *
 */

const SceneComponent = ({ lang, logo, color, model, selectModel }) => {
  const [scene1, setScene1] = useState(null);
  const [decal, setDecal] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [currentModel, setCurrentModel] = useState(null);
  const [currentModelJson, setCurrentModelJson] = useState(null);
  const [logoPosition, setLogoPosition] = useState(null);
  const [logoPositionName, setLogoPositionName] = useState(null);
  const [freePick, setFreePick] = useState(false);

  const classes = useStyles();

  const modelSize = new Vector3(model.SIZE, model.SIZE, model.SIZE);
  modelSize._isDirty = false;
  console.log("initial name ", color);
  const modelPosition = new Vector3(
    model.POSITION.X,
    model.POSITION.Y,
    model.POSITION.Z
  );
  modelPosition._isDirty = false;
  console.log("initial pos  ", modelPosition);

  useEffect(() => {
    //const RGBColor = hexToRGB(color[1]);
    if (currentModel !== null && color !== null) {
      const meshes = currentModel._scene.meshes;
      console.log("current model ", meshes, color);
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
    if (logoPosition !== null) {
      if (decal !== null) {
        decal.dispose();
      }

      const objectForm = JSON.parse(logoPosition);
      console.log('ObjectForm ', objectForm);

      const decalMaterial = new StandardMaterial("decalMat", scene1);
      decalMaterial.diffuseTexture = new Texture(logo, scene1);
      console.log("Decal image is: /", logo);
      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -20;

      var mesh;
      for (var i in currentModel._scene.meshes) {
        console.log(currentModel._scene.meshes[i])
        console.log(logoPosition.NAME)
        if (objectForm.MESH_NAME === currentModel._scene.meshes[i].name) {
          console.log("match")
          mesh = currentModel._scene.meshes[i]
          const decalSize = new Vector3(model.LOGO_SIZE, model.LOGO_SIZE, model.LOGO_SIZE);
          const decalRotation = model.LOGO_ROTATION;

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
    if (currentModel !== null) {
      console.log("UseEffect ", currentModel);
      const modelArray = Object.entries(model);
      console.log("Object entries ", model);
      for (var i in modelArray) {
        console.log("Model array ", modelArray[i].NAME);
        if (modelArray[i].NAME === currentModel.name) {
          console.log("Model match");
        }
      }
    }
  }, [currentModel]);

  function onSceneMount(e) {
    const { canvas, scene } = e;
    scene.clearColor = Color3.FromHexString("#f5f5f5")
    setScene1(scene);
    console.log("onscenemount " + { scene1 });
  }

  const onModelLoaded = (model) => {
    console.log("Model loaded: ", model.meshes);
    selectModel(model, decal);
  };

  const onModelCreated = (rootMesh) => {
    setCurrentModel(rootMesh);
    console.log("Created model: ", rootMesh);
    const meshes = rootMesh._scene.meshes;
    console.log("current model ", meshes, color);
    for (var i in meshes) {
      if (meshes[i].metadata !== null) {
        const newMat = new StandardMaterial("material" + 1, scene1);
        newMat.diffuseColor = new Color3.FromHexString(color);
        meshes[i].material = newMat;
      }
    }
  };

  const onPointerPick = (e, pickInfo) => {
    if (freePick) {
      console.log("Decal material: /", logo);
      const decalMaterial = new StandardMaterial("decalMat", scene1);
      decalMaterial.diffuseTexture = new Texture(logo, scene1);
      console.log("Decal image is:", logo);
      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -2;

      if (decal != null && pickInfo.name !== "decal") {
        decal.dispose();
      }

      if (pickInfo.hit && pickInfo.pickedMesh.name !== "decal") {
        const mesh = pickInfo.pickedMesh;
        console.log('PickInfo ', pickInfo.pickedPoint)
        if (pickInfo.pickedPoint !== null) {
          const meshObj = "POSITION_VECTOR: [" + pickInfo.pickedPoint.x + "," + pickInfo.pickedPoint.y + "," + pickInfo.pickedPoint.z + "],\n" + "NORMAL_VECTOR: [" + pickInfo.getNormal(true).x + "," + pickInfo.getNormal(true).y + "," + pickInfo.getNormal(true).z + "],"
          console.log(meshObj);
        }
        console.log("PickInfo " + pickInfo.pickedPoint + pickInfo.getNormal(true) + "mesh " + mesh);
        const decalSize = new Vector3(model.LOGO_SIZE, model.LOGO_SIZE, model.LOGO_SIZE);
        const decalRotation = model.LOGO_ROTATION;

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

  const createPositionsRadioButtons = () => {
    const logoPositionsArray = Object.entries(model.LOGO_POSITIONS);
    console.log(logoPositionsArray);
    return logoPositionsArray.map((position) => (
      <FormControlLabel className="RadioButton" disabled={freePick} value={JSON.stringify(position[1])} control={<Radio />} label={position[1].NAME}></FormControlLabel>
    ))
  }

  const handleChange = (event) => {
    console.log('event ', event.target.value)
    setLogoPosition(event.target.value)
  }
  const handleSwitchChange = (event) => {
    console.log('Handle switch change ', event.target.checked)
    setFreePick(event.target.checked);
  }

  return (
    <div className="Container">
      <FormControl component="fieldset" className="PositionController" classes={{ root: classes.root }}>
        <FormLabel component="legend">Logo position</FormLabel>
        <FormControlLabel
          value={freePick}
          control={<Switch color="primary" />}
          label="Free picking"
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
              pluginExtension=".gltf"
              scaling={modelSize}
              onModelLoaded={onModelLoaded}
              onCreated={onModelCreated}
            ></Model>
          </Suspense>
        </Scene>
      </Engine>
    </div>
  );
};

export default SceneComponent;
