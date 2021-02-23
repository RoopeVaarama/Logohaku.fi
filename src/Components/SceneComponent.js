import {DynamicTexture, Engine, Ground, Model, Scene, StandardMaterial} from 'react-babylonjs';
import {Vector3} from '@babylonjs/core';
import React, { Suspense, useEffect, useRef, useState } from 'react';

/**
 * React component for utilizing Babylon.js
 * 
 * @author Topias Peiponen
 * @since 3.2.2021
 * 
 */

 const onSceneMount = (e, setScene) => {
    const {canvas, scene} = e;

    setScene(scene);
    console.log(scene);
}


const SceneComponent = (props) => {
    const [scene, setScene] = useState(null);
    const makeMaterial = () => {
        const textureGround = new DynamicTexture("dynamic texture", 512, this.props.SceneProps);  
        const textureContext = textureGround.getContext();

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