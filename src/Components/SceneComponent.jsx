import {Engine, Scene} from 'react-babylonjs'
import {Vector3} from '@babylonjs/core'
import React, { useEffect, useRef } from 'react'

/**
 * React component for utilizing Babylon.js
 * 
 * @author Topias Peiponen
 * @since 3.2.2021
 * 
 */

const SceneComponent = (props) => {
    return (
        <div>
            <Engine antialias adaptToDeviceRatio canvasId="asdf">
                <Scene>
                </Scene>
            </Engine>
        </div>
    )
}

export default SceneComponent;