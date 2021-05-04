import React from 'react';
import { DialogContent, DialogTitle, Dialog, Grid, Paper } from '@material-ui/core';
import { Image } from 'react-bootstrap';
import './PickerDialog.css'
import TextValues from '../../tools/TextValues';

const baseUrl = "https://api.logohaku.fi/logoversion?version="

const EditLogoDialog = (props) => {
  const { onClose, selectedValue, open, ytunnus, lang, styles} = props;
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
    if (selectedValue !== null) {
      const urls = []
      for (var i = 1; i <= 9; i++) {
        const splitValue = selectedValue[0].split("/").pop()
        //console.log('split value ', splitValue)
        const fullUrl = baseUrl + i + "&code=" + ytunnus + "&file=" + splitValue
        //console.log('Full url: ', fullUrl)
        urls.push(fullUrl);
      }
      return urls.map((item) => (
        <Grid key={item + ytunnus} item xs={3}>
          <Paper key={"paper" + item + ytunnus}>
            <Image src={item} onClick={() => handleListItemClick(item, selectedValue[1])} className={styles.basicShadowForImgPaper} />
          </Paper>
        </Grid>
      ))
    }
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby={"customized-dialog-title"} open={open} maxWidth={"md"}>
      <DialogTitle id="customized-dialog-title" className="DialogTitle" >{TextValues.customizeYourLogo(lang)}</DialogTitle>
      <DialogContent dividers>
        <Grid container className="PickerGrid" spacing={2}>
          {createGridItems()}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default EditLogoDialog;