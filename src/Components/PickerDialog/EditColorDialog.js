import React, { useState } from 'react';
import { Grid,Button, DialogContent, Box, Dialog, DialogTitle } from '@material-ui/core';
import './EditColorDialog.css'
import './NewColorDialog.css'
import { SketchPicker } from 'react-color';
import TextValues from '../../tools/TextValues';

const EditColorDialog = (props) => {
  const { onClose, selectedValue, palette, open, ytunnus, lang, styles } = props;
  /*const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'authority': 'api.logohaku.fi',
        'method': 'POST',
        'path': '/get',
        'scheme': 'https'
  
      },
      redirect: 'follow',
      referrerPolicy: 'strict-origin-when-cross-origin',
      formData: {
        'company': searchTerm,
        'type': 'input'
      }
    })
    return response.json
  }*/

  const [pickerColor, setPickerColor] = useState("#00000");
  const handleColorChange = (color, event) => {
    //console.log('HandleColorChange ', color, event)
    setPickerColor(color.hex)
  }

  const handleClose = () => {
    onClose(null);
  };

  const handleListItemClick = (value, index) => {
    //console.log('value ', value, index)
    onClose(value, index);
  };

  const createGridItems = () => {
    //console.log('EditColorDialog ', selectedValue)
    return palette.map((item, index) => (
      <Grid key={item + ytunnus} item xs={2}>
        <Box bgcolor={item} p={3} onClick={() => handleListItemClick(item, selectedValue.index)} className={styles.basicShadowForFluidImg} />
      </Grid>
    ))
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby={"customized-dialog-title"} open={open} className="Dialog" >
      <DialogTitle id="customized-dialog-title" className="DialogTitle" >{TextValues.selectColorCompanyPalette(lang)}</DialogTitle>

      <DialogContent dividers>
        <Grid container className="PickerGrid" spacing={2}>
          {createGridItems()}
        </Grid>
      </DialogContent>
      <DialogContent dividers>
        <div className="ColorPickerContainer">
          <SketchPicker disableAlpha color={pickerColor} onChange={handleColorChange} />
          <div className="ColorPickerConfirmation">
            <Button variant="contained" onClick={() => onClose(pickerColor, selectedValue.index)}>
              {TextValues.selectColor(lang)}
                </Button>
            <Box bgcolor={pickerColor} p={3} className={styles.basicShadow}/>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditColorDialog;