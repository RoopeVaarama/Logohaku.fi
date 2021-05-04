import { TableCell, Button, IconButton} from "@material-ui/core";
import { HighlightOff, Edit } from '@material-ui/icons';
import {  Image } from "react-bootstrap";

const LogoTable = ({lang, logos, selectedLogoIndex, setSelectedLogoIndex, setLogo, calculateAspectRatios, logoAspectRatios, setLogoAspectRatios, handleLogoRemove, handleLogoEdit, styles}) => {
    console.log("LogoTable ", logos);
    return logos.map((item, index) => (
      <TableCell alignCenter className={selectedLogoIndex === index ? styles.logoPickerImgBtnSelected : styles.logoPickerImgBtnNormal}>
        <div className="LogoItemWrapper">
        <Button 
          
          className={styles.pickerItemBtn}
          fullWidth
          variant="outline-light"
          onClick={(e) => {
            setSelectedLogoIndex(index)
            setLogo(item.image, e)
          }}
        >
          <Image src={item.image} fluid className="LogoPickerItem" onLoad={(e) => {
            const newAspectRatio = calculateAspectRatios(e.target.width, e.target.height);
            const newAspectRatioObject = {
              [e.target.currentSrc] : newAspectRatio
            }
            const logoAspectRatioArray = logoAspectRatios;
            logoAspectRatioArray[e.target.currentSrc] = newAspectRatio
            setLogoAspectRatios(logoAspectRatioArray);
          }} />
        </Button>
        <IconButton
            className={styles.pickerIconRemove}
            color="primary"
            aria-label="delete logo"
            onClick={(e) => handleLogoRemove(index)}
          >
            <HighlightOff />
          </IconButton>
          <IconButton
            className={styles.pickerIconEdit}
            color="primary"
            aria-label="edit logo"
            onClick={(e) => handleLogoEdit(item.image, index)}
          >
            <Edit />
          </IconButton>
          </div>
      </TableCell>
    ));
  };

  export default LogoTable;