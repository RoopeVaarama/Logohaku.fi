import React from 'react';
import TextValues from '../tools/TextValues';
import "./Results.css";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core';
import SceneComponent from './SceneComponent';
import button from 'react-bootstrap/Button'


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
            <div className="PreviewerWindow">
              <div className="ButtonPanel">
                <button className="CatalogButton">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor" class="CatalogIcon" viewBox="0 0 16 16">
                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2zm8.5 0v8H15V2H8.5zm0 9v3H15v-3H8.5zm-1-9H1v3h6.5V2zM1 14h6.5V6H1v8z"/>
                  </svg>
                  <text className="CatalogText">Catalog</text>
                </button>
                <button className="PresetsButton">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor" class="PresetsIcon" viewBox="0 0 16 16">
                    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                  <text className="PresetsText">Presets</text>
                </button>
              </div>
              <div className="CanvasHolder">
                <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id='Canvas'></SceneComponent>
              </div>
            </div>
        </div>
    )
}

export default Results;