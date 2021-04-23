import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Image } from 'react-bootstrap';
import './PickerDialog.css'
import { DialogContent } from '@material-ui/core';

const baseUrl = "https://api.logohaku.fi/logoversion?version="

const EditLogoDialog = (props) => {
    const { onClose, selectedValue, open, ytunnus} = props;
    //console.log('EditLogoDialog ', selectedValue, ytunnus);
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
      //console.log('value ', value, index)
      onClose(value, index);
    };

    const createGridItems = () => {
        if (selectedValue !== null)
        {const urls = []
        for (var i=1; i<=9;i++) {
          const splitValue = selectedValue[0].split("/").pop()
          //console.log('split value ', splitValue)
          const fullUrl = baseUrl + i + "&code=" + ytunnus + "&file=" + splitValue
          //console.log('Full url: ', fullUrl)
          urls.push(fullUrl);
        }
        return urls.map((item) => (
          <Grid key={item[0] + ytunnus} item xs={3}>
            <Paper className={item[0]}>
              <Image src={item} className="img-fluid" onClick={() => handleListItemClick(item, selectedValue[1])}/>
            </Paper>
          </Grid>
        ))}
    }
  
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

  export default EditLogoDialog;