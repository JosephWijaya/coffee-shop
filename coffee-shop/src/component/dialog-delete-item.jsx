import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import close from "../asset/close.svg";
import {
  Box,
  DialogContentText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogDeleteItem = (props) => {

  const handleClose = () => {
    props.handleClose();
  };

  const handleDelete = () => {
    props.handleDelete(true, props.data);
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          DELETE ITEM
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <img alt="close" src={close} />
        </IconButton>
        <DialogContent
          dividers
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <DialogContentText id="alert-dialog-description">
            Are you sure want delete{" "}
            <b>
              {props.data?.item_name} ({props.data?.id})
            </b>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="primary"
            sx={{
              // width: "350px",
              p: "12px 20px",
              fontSize: "16px",
              backgroundColor: "#8d6767",
              color: "#fff",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#685252",
              },
              "@media (max-width:426px)": {
                // width: "100%",
              },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            sx={{
              // width: "350px",
              p: "12px 20px",
              fontSize: "16px",
              backgroundColor: "#ff4747",
              color: "#fff",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#bc0000",
              },
              "@media (max-width:426px)": {
                width: "100%",
              },
            }}
            onClick={handleDelete}
            autoFocus
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogDeleteItem;
