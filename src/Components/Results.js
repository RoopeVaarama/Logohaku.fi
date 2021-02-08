import React from 'react';
import TextValues from '../tools/TextValues';
import "./Results.css";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core';
import SceneComponent from './SceneComponent';


let box;

/**
 * Creates the 3D previewer
 * @param {*} scene Babylon.js scene component
 */
const onSceneReady = scene => {
  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  
  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());
  const canvas = scene.getEngine().getRenderingCanvas();
  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;
  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", {size: 2}, scene);
  // Move the box upward 1/2 its height
  box.position.y = 1;
  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = scene => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();
    const rpm = 10;
    box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
  }
}

const Results = ({lang}) => {
    return (
        <div>
            <h1>{TextValues.results(lang)}</h1>
            <div className="CanvasHolder">
              <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id='Canvas'></SceneComponent>
            </div>
        </div>
    )
}

export default Results;