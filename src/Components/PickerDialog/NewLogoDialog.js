import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Image } from 'react-bootstrap';
import './PickerDialog.css'
import { DialogContent } from '@material-ui/core';
import TextValues from '../../tools/TextValues';

const NewLogoDialog = (props) => {
  const { onClose, selectedValue, open, ytunnus, lang, styles } = props;
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
    onClose(null);
  };

  const handleListItemClick = (value, index) => {
    onClose(value, index);
  };

  const createGridItems = () => {
    const urls = [];
    const baseUrl = "https://api.logohaku.fi/data/" + ytunnus + "/"
    for (var x = 0; x < selectedValue.length; x++) {
      const fullUrl = baseUrl + selectedValue[x];
      urls.push(fullUrl);
    }
    return urls.map((item, index) => (
      <Grid key={item + ytunnus} item xs={3} >
        <Paper key={"paper"+item + ytunnus}>
          <Image src={item} onClick={() => handleListItemClick(item, index)} className={styles.basicShadowForImgPaper}/>
        </Paper>
      </Grid>
    ))

  };

  return (
    <Dialog onClose={handleClose} aria-labelledby={"customized-dialog-title"} open={open} className="Dialog" maxWidth={"md"} >
      <DialogTitle id="customized-dialog-title" className="DialogTitle" >{TextValues.customizeYourLogo(lang)}</DialogTitle>
      <DialogContent dividers>
        <Grid container className="PickerGrid" spacing={2}>
          {createGridItems()}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default NewLogoDialog;