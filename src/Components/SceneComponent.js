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

/*const loadLogo = ({scene}) => {
    console.log('LoadLogo ' + scene)
    const material = new StandardMaterial("Mat", scene);
    const texture = new DynamicTexture("dynTexture", 512, scene);

    const textureContext = texture.getContext();
    material.diffuseTexture = texture;

    const img = new Image();
    img.src = '/logo192.png';
    img.onload = function() {
        textureContext.drawImage(this, 0, 0);
        texture.update();
    }

    return (
        <material>
            <texture>
                
            </texture>
        </material>
    );
};*/

const SceneComponent = ({logo, model, selectModel}) => {
  const [scene1, setScene1] = useState(null);
  const [decal, setDecal] = useState(null)
  const modelSize = new Vector3(model.SIZE, model.SIZE, model.SIZE);
  modelSize._isDirty = false
  console.log('initial size ', modelSize)
  const modelPosition = new Vector3(model.POSITION.X, model.POSITION.Y, model.POSITION.Z)
  modelPosition._isDirty = false
  console.log('initial pos  ', modelPosition)


  function onSceneMount(e) {
    const { canvas, scene } = e;
    setScene1(scene);
    console.log("onscenemount " + { scene1 });
  }
  const onModelLoaded = (model) => {
    console.log('Model loaded: ', model)
    selectModel(model, decal)
  };

  const onPointerPick = (e, pickInfo) => {
    const decalMaterial = new StandardMaterial("decalMat", scene1);
    decalMaterial.diffuseTexture = new Texture("/Models/" + logo, scene1);
    decalMaterial.diffuseTexture.hasAlpha = true;
    decalMaterial.zOffset = -2;

<<<<<<< HEAD
        const matGround = new StandardMaterial("mat", scene);
        matGround.diffuseTexture = textureGround;
        
        const img = new Image();
        img.src = '/logo192';
        img.onload = function() {
            textureContext.drawImage(this, 0, 0);
            textureGround.update();

            textureContext.drawImage(this, 10, 490, 10, 12, 156, 136, 200, 220)
		    textureGround.update();	
        }
        return matGround;
    }
    console.log(Scene);
    return (
            <Engine antialias adaptToDeviceRatio canvasId="asdf">
                <Scene
                onSceneMount={onSceneMount, setScene}>
                    <arcRotateCamera name="camera1" target={Vector3.Zero()} alpha={Math.PI / 2} beta={Math.PI / 4} radius={8} />
                    <hemisphericLight name='light1' intensity={0.7} direction={Vector3.Up()} />
                    <Suspense fallback={<box position={new Vector3(0,0,0)}></box>}>
                        <Model 
                        position={new Vector3(0,0,0)}
                        rootUrl={'./Models/'}
                        sceneFilename={'tshirt.gltf'}
                        pluginExtension='.gltf'
                        scaling={new Vector3(10, 10, 10)}
                        material={makeMaterial}
                        ></Model>
                    </Suspense>
                </Scene>
            </Engine>
    )
}

export default SceneComponent;
=======
    if (decal != null && pickInfo.name != 'decal') {
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

  console.log('Rendering Scenecomponent')
  return (
    <Engine antialias adaptToDeviceRatio canvasId="asdf">
      <Scene onSceneMount={onSceneMount} onPointerPick={onPointerPick}>
        <arcRotateCamera
          name="camera1"
          target={Vector3.Zero()}
          alpha={Math.PI / 2}
          beta={Math.PI / 40}
          radius={8}
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
            rootUrl={"./Models/"}
            sceneFilename={model.URL}
            pluginExtension=".gltf"
            scaling={modelSize}
            onModelLoaded={onModelLoaded}
          ></Model>
        </Suspense>
      </Scene>
    </Engine>
  );
};

export default SceneComponent;
>>>>>>> a66c0c62ce3edc75cb5ca4f0a272482ad3067311
