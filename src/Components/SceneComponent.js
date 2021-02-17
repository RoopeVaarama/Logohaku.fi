import {Engine, Model, Scene} from 'react-babylonjs';
import {Vector3} from '@babylonjs/core';
import React, { Suspense, useEffect, useRef } from 'react';

/**
 * React component for utilizing Babylon.js
 * 
 * @author Topias Peiponen
 * @since 3.2.2021
 * 
 */

const baseUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/"
const SceneComponent = (props) => {
    return (
            <Engine antialias adaptToDeviceRatio canvasId="asdf">
                <Scene>
                    <arcRotateCamera name="camera1" target={Vector3.Zero()} alpha={Math.PI / 2} beta={Math.PI / 4} radius={8} />
                    <hemisphericLight name='light1' intensity={0.7} direction={Vector3.Up()} />
                    <Suspense fallback={<box position={new Vector3(0,0,0)}></box>}>
                        <Model 
                        position={new Vector3(0,0,0)}
                        rootUrl={'./Models/'}
                        sceneFilename={'Duck.gltf'}
                        pluginExtension='.gltf'
                        ></Model>
                    </Suspense>
                </Scene>
            </Engine>
    )
}

export default SceneComponent;