import { TableCell, IconButton, Box} from "@material-ui/core";
import { HighlightOff, Edit } from '@material-ui/icons';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';

const ColorTable = ({lang, colors, selectedColorIndex, setSelectedColorIndex, setColor, handleColorRemove, handleColorEdit, styles}) => {
    return colors.map((color, index) => (
        <TableCell className={selectedColorIndex === index ? styles.colorPickerImgBtnSelected : styles.colorPickerImgBtnNormal} key={color + index}>
          <div
            className={styles.pickerItemBtn}
            onClick={(e) => {
              setSelectedColorIndex(index)
              setColor(color, e)
            }}
          >
            <Box bgcolor={color} p={5} className={styles.basicShadow}>
              <PaletteOutlinedIcon  />
            </Box>
            <IconButton
              className={styles.pickerIconRemove}
              color="primary"
              aria-label="delete logo"
              onClick={(e) => handleColorRemove(index)}
            >
              <HighlightOff />
            </IconButton>
            <IconButton
              className={styles.pickerIconEdit}
              color="primary"
              aria-label="edit logo"
              onClick={(e) => handleColorEdit(color, index)}
            >
              <Edit />
            </IconButton>
          </div>
        </TableCell>
      ));
};

export default ColorTable;