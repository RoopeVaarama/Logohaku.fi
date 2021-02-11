import React, {useState} from 'react';
import './PresetsList.css';

/**
 * Contains the component for showing the preset color schemes
 * 
 * @author Topias Peiponen
 * @since 11.02.2021
 */

const array = ["Crimson", "Azure", "Magenta"]
const renderPresetButtons = () => {
    return array.map((preset) => (
        <button className="PresetCard">{preset}</button>
    ))
}


const PresetsList = ({lang}) => {
    const [presets, setPresets] = useState(renderPresetButtons);

    return (
        <div className="PresetsList">
            {presets}
        </div>
    )
}

export default PresetsList;