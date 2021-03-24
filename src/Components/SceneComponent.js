import {
  Box,
  Engine,
  Ground,
  Model,
  Scene,
  DynamicTexture,
  Image,
} from "react-babylonjs";
import {
  Vector3,
  Color3,
  MeshBuilder,
  Color4,
  ActionManager,
  SetValueAction,
  Texture,
  StandardMaterial,
  ExecuteCodeAction,
  VertexBuffer,
} from "@babylonjs/core";
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  addEventListener,
} from "react";
import { InputManager } from "@babylonjs/core/Inputs/scene.inputManager";

/**
 * React component for utilizing Babylon.js
 *
 * @author Topias Peiponen
 * @since 3.2.2021
 *
 */



const SceneComponent = ({logo, color, model, selectModel}) => {
  const [scene1, setScene1] = useState(null);
  const [decal, setDecal] = useState(null);
  const [currentModel, setCurrentModel] = useState(null);
  const modelSize = new Vector3(model.SIZE, model.SIZE, model.SIZE);
  modelSize._isDirty = false
  console.log('initial name ', color)
  const modelPosition = new Vector3(model.POSITION.X, model.POSITION.Y, model.POSITION.Z)
  modelPosition._isDirty = false
  console.log('initial pos  ', modelPosition)

  useEffect(() => {
    //const RGBColor = hexToRGB(color[1]);
    if (currentModel !== null && color !== null) {
      const meshes = currentModel._scene.meshes
      console.log('current model ', meshes, color)
      for (var i in meshes) {
        if (meshes[i].metadata !== null) {
          const newMat = new StandardMaterial("material"+i+i, scene1);
          newMat.diffuseColor = new Color3.FromHexString(color[1])
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
  }, [color])


  function onSceneMount(e) {
    const { canvas, scene } = e;
    setScene1(scene);
    console.log("onscenemount " + { scene1 });
  }

  const onModelLoaded = (model) => {
    console.log('Model loaded: ', model.meshes.length)
    selectModel(model, decal)
  };

  const onModelCreated = (rootMesh) => {
    setCurrentModel(rootMesh);
    console.log('Created model: ', rootMesh);
    const meshes = rootMesh._scene.meshes
    console.log('current model ', meshes, color[1])
      for (var i in meshes) {
        if (meshes[i].metadata !== null) {
          const newMat = new StandardMaterial("material"+1, scene1);
          newMat.diffuseColor = new Color3.FromHexString(color[1])
          meshes[i].material = newMat;
        }
      }
    }
  

  const onPointerPick = (e, pickInfo) => {
    console.log("Decal material: /", logo);
    const decalMaterial = new StandardMaterial("decalMat", scene1);
    decalMaterial.diffuseTexture = new Texture("/" + logo[1], scene1);
    console.log('Decal image is: /', logo[1]);
    decalMaterial.diffuseTexture.hasAlpha = true;
    decalMaterial.zOffset = -2;

    if (decal != null && pickInfo.name !== 'decal') {
      decal.dispose();
    }

    if (pickInfo.hit) {
      const mesh = pickInfo.pickedMesh;
      console.log('PickInfo ' + pickInfo.pickedPoint + 'mesh ' + mesh);
        const decalSize = new Vector3(1, 1, 1);

          /**************************CREATE DECAL*************************************************/
          const decal = MeshBuilder.CreateDecal("decal", mesh, {
            position: pickInfo.pickedPoint,
            normal: pickInfo.getNormal(true),
            size: decalSize,
          });
          decal.material = decalMaterial;
          setDecal(decal);
    }
  }

  return (
    <Engine antialias adaptToDeviceRatio canvasId="asdf">
      <Scene onSceneMount={onSceneMount} onPointerPick={onPointerPick}>
        <arcRotateCamera
          name="camera1"
          target={Vector3.Zero()}
          alpha={Math.PI / 2}
          beta={Math.PI / 2}
          radius={10}
          wheelPrecision={[10]}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={Vector3.Up()}
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
  );
};

export default SceneComponent;
