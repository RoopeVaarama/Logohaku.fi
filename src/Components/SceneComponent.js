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

const SceneComponent = (props) => {
  const [scene1, setScene1] = useState(null);
  const [canvas1, setCanvas1] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  function onSceneMount(e) {
    const { canvas, scene } = e;
    setScene1(scene);
    setCanvas1(canvas);
    console.log("onscenemount " + { scene1 });
  }
  const onModelLoaded = (model) => {
    const mesh1 = model.meshes[1];

    const decalMaterial = new StandardMaterial("decalMat", scene1);
    decalMaterial.diffuseTexture = new Texture("/Models/DuckCM.png", scene1);
    decalMaterial.diffuseTexture.hasAlpha = true;
    decalMaterial.zOffset = -2;

    console.log('onmodelloaded ' + {scene1});
    scene1.onPointerPick = (e, pickInfo) => {
      if (pickInfo.hit) {
        const mesh = pickInfo.pickedMesh;
        if (mesh.name == 'product') {
          const decalSize = new Vector3(10, 10, 10);

            /**************************CREATE DECAL*************************************************/
            const decal = MeshBuilder.CreateDecal("decal", mesh1, {
              position: pickInfo.pickedPoint,
              normal: pickInfo.getNormal(true),
              size: decalSize,
            });
            decal.material = decalMaterial;
        }
      }
    }
  };
  return (
    <Engine antialias adaptToDeviceRatio canvasId="asdf">
      <Scene onSceneMount={onSceneMount}>
        <arcRotateCamera
          name="camera1"
          target={Vector3.Zero()}
          alpha={Math.PI / 2}
          beta={Math.PI / 4}
          radius={8}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={Vector3.Up()}
        />
        <Suspense fallback={<box position={new Vector3(0, 0, 0)}></box>}>
          <Model
            name='product'
            position={new Vector3(0, 0, 0)}
            rootUrl={"./Models/"}
            sceneFilename={"tshirt.gltf"}
            pluginExtension=".gltf"
            scaling={new Vector3(10, 10, 10)}
            onModelLoaded={onModelLoaded}
          ></Model>
        </Suspense>
      </Scene>
    </Engine>
  );
};
/**
 * <Model 
                        position={new Vector3(0,0,0)}
                        rootUrl={'./Models/'}
                        sceneFilename={'tshirt.gltf'}
                        pluginExtension='.gltf'
                        scaling={new Vector3(10, 10, 10)}
                        ></Model>
 */

export default SceneComponent;
