import React, {useState} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Image } from 'react-bootstrap';
import './EditColorDialog.css'
import './NewColorDialog.css'
import { DialogContent } from '@material-ui/core';
import { SketchPicker } from 'react-color';
import Box from '@material-ui/core/Box';

const baseUrl = "https://api.logohaku.fi/logoversion?version="

const EditColorDialog = (props) => {
    const { onClose, selectedValue, palette, open, ytunnus } = props;
    console.log('SelectedValue ', selectedValue, ytunnus);

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
      console.log('HandleColorChange ', color, event)
      setPickerColor(color.hex)
    }
  
    const handleClose = () => {
      onClose(null);
    };
  
    const handleListItemClick = (value, index) => {
      console.log('value ', value, index)
      onClose(value, index);
    };

    const createGridItems = () => {
        console.log('EditColorDialog ', selectedValue)
        return palette.map((item, index) => (
          <Grid key={item + ytunnus} item xs={2}>
              <Box bgcolor={item} p={3} onClick={() => handleListItemClick(item, selectedValue.index)} />
          </Grid>
        ))
    };
  
    return (
      <Dialog onClose={handleClose} aria-labelledby={"customized-dialog-title"} open={open} className="Dialog" fullwidth>
        <DialogTitle id="customized-dialog-title" className="DialogTitle" >Select a color from your company's palette or make your own</DialogTitle>
        
          <DialogContent dividers>
              <Grid container className="PickerGrid" spacing={2}>
                {createGridItems()}
              </Grid>
          </DialogContent>
          <DialogContent dividers>
            <div className="ColorPickerContainer">
              <SketchPicker disableAlpha color={pickerColor} onChange={handleColorChange}/>
              <div className="ColorPickerConfirmation">
              <Button variant="contained" onClick={() => onClose(pickerColor, selectedValue.index)}>
                  Select Color
                </Button>
                <Box bgcolor={pickerColor} p={3} />
                
              </div>
            </div>
          </DialogContent>
      </Dialog>
    );
  }

  export default EditColorDialog;