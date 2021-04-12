import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Image } from 'react-bootstrap';
import './PickerDialog.css'
import { DialogContent } from '@material-ui/core';

const baseUrl = "https://api.logohaku.fi/logoversion?version="

const EditColorDialog = (props) => {
    const { onClose, selectedValue, open, ytunnus } = props;
    console.log('SelectedValue ', selectedValue, ytunnus);
    const testLogos = {
      "logo1": "0b.png",
      "logo2": "0b.png",
      "logo3": "0b.png",
      "logo4": "0b.png",
      "logo5": "0c.svg"
    }

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
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value, index) => {
      console.log('value ', value, index)
      onClose(value, index);
    };

    const createGridItems = () => {
        const logoArray = Object.entries(testLogos)
        console.log(logoArray);
        return logoArray.map((item) => (
          <Grid key={item[0] + ytunnus} item xs={3}>
            <Paper className={item[0]}>
              <Image src={"/" + item[1]} className="img-fluid" onClick={() => handleListItemClick}/>
            </Paper>
          </Grid>
        ))
    };
  
    return (
      <Dialog onClose={handleClose} aria-labelledby={"customized-dialog-title"} open={open} className="Dialog" fullwidth>
        <DialogTitle id="customized-dialog-title" className="DialogTitle" >Customize your logo</DialogTitle>
          <DialogContent dividers>
            <Grid container className="PickerGrid" spacing={2}>
              {createGridItems()}
            </Grid>
          </DialogContent>
      </Dialog>
    );
  }

  export default EditColorDialog;