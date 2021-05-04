import React, { useState } from 'react';
import { makeStyles, Button, Box, DialogContent, Paper, Grid, Dialog, DialogTitle } from "@material-ui/core";
import { Person, Add } from '@material-ui/icons';
import { Image } from 'react-bootstrap';
import './EditColorDialog.css'
import './NewColorDialog.css'
import { SketchPicker } from 'react-color';
import TextValues from '../../tools/TextValues';

const baseUrl = "https://api.logohaku.fi/logoversion?version="

const NewColorDialog = (props) => {
  const { onClose, palette, open, ytunnus, lang, stylesResults} = props;

  const styles = makeStyles({
    colorPicker: {
      width: "60%",
      marginTop: "16px"
    }
  });

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

  const handleListItemClick = (value) => {
    //console.log('value ', value)
    onClose(value);
  };

  const createGridItems = () => {
    return palette.map((item) => (
      <Grid key={item + ytunnus} item xs={2}>
        <Box bgcolor={item} p={3} onClick={() => handleListItemClick(item)} className={stylesResults.basicShadow}/>
      </Grid>
    ))
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby={"customized-dialog-title"} open={open} className="Dialog" fullwidth>
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
            <Button variant="contained" onClick={() => onClose(pickerColor)}>
              {TextValues.selectColor(props.lang)}
                </Button>
            <Box bgcolor={pickerColor} p={3} className={stylesResults.basicShadow}/>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NewColorDialog;