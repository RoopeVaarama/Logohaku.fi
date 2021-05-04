import { TableCell, Button, IconButton, Box} from "@material-ui/core";
import { HighlightOff, Edit } from '@material-ui/icons';

const ColorTable = ({lang, colors, selectedColorIndex, setSelectedColorIndex, setColor, handleColorRemove, handleColorEdit, styles}) => {
    return colors.map((color, index) => (
        <TableCell alignCenter className={selectedColorIndex === index ? styles.colorPickerImgBtnSelected : styles.colorPickerImgBtnNormal}>
          <Button
            className={styles.pickerItemBtn}
            fullWidth
            variant="outline-light"
            onClick={(e) => {
              setSelectedColorIndex(index)
              setColor(color, e)
            }}
          >
            <Box bgcolor={color} p={5} className="ColorPickerItem">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-palette"
                viewBox="0 0 16 16"
              >
                <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z" />
              </svg>
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
          </Button>
        </TableCell>
      ));
};

export default ColorTable;