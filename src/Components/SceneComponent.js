import {Engine, Model, Scene} from 'react-babylonjs';
import {Vector3} from '@babylonjs/core';
import React, { Suspense, useEffect, useRef } from 'react';
import '@babylonjs/loaders/glTF';

/**
 * React component for utilizing Babylon.js
 * 
 * @author Topias Peiponen
 * @since 3.2.2021
 * 
 */

const SceneComponent = (props) => {
    return (
            <Engine antialias adaptToDeviceRatio canvasId="asdf">
                <Scene>
                    <arcRotateCamera name="camera1" target={Vector3.Zero()} alpha={Math.PI / 2} beta={Math.PI / 4} radius={8} />
                    <hemisphericLight name='light1' intensity={0.7} direction={Vector3.Up()} />
                    <Suspense fallback={<box></box>}>
                        <Model 
                        position={new Vector3(0,0,0)}
                        rootUrl={'../assets/'}
                        sceneFilename='scene.gltf'
                        pluginExtension='.gltf'
                        ></Model>
                    </Suspense>
                </Scene>
            </Engine>
    )
}

export default SceneComponent;