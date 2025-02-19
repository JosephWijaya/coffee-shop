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
import { Box, MenuItem, Select, TextField } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogItem = (props) => {
  const [name, setName] = React.useState("");
  const [qty, setQty] = React.useState(1);
  const [uom, setUOM] = React.useState("kg");
  const [price, setPrice] = React.useState(1000);
  const [error, setError] = React.useState({
    name: "",
    qty: "",
    uom: "",
    price: "",
  });
  const [disable, setDisable] = React.useState(true);
  const optUOM = [
    { id: 1, label: "kg" },
    { id: 2, label: "liter" },
    { id: 3, label: "pcs" },
  ];

  React.useEffect(() => {
    if (name && qty && uom && price) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [name, qty, uom, price]);

  React.useEffect(() => {
    setName(props.data ? props.data?.item_name : "");
    setQty(props.data ? props.data.qty : 1);
    setUOM(props.data ? props.data.uom : "kg");
    setPrice(props.data ? props.data.price : 1000);
  }, [props]);

  const handleClose = () => {
    setName("");
    setQty(1);
    setUOM("kg");
    setPrice(1000);
    props.handleClose();
  };

  const handleChange = (e, type) => {
    const value = e.target.value;
    if (type === "name") {
      setName(value);
    } else if (type === "qty") {
      if (value === "" || /^[0-9]*$/.test(value)) {
        setQty(Number(value));
        setError("");
      } else {
        setError(...error, { qty: "Qty must greater than 0" });
      }
    } else if (type === "uom") {
      setUOM(value);
    } else if (type === "price") {
      if (value === "" || /^[0-9]*$/.test(value)) {
        setPrice(Number(value));
        setError("");
      } else {
        setError(...error, { price: "Qty must greater than 0" });
      }
    }
  };

  const handleSubmit = () => {
    props.handleSubmit({
      id: props.data ? props.data.id : -1,
      item_name: name,
      qty,
      uom,
      price,
    });

    setName("");
    setQty(1);
    setUOM("kg");
    setPrice(1000);
    handleClose();
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {props.action}&nbsp;ITEM
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
          <Box>
            <Typography>Item Name</Typography>
            <TextField
              required
              value={name}
              id="outlined-required"
              placeholder="Item Name"
              onChange={(e) => handleChange(e, "name")}
              sx={{
                width: "350px",
                backgroundColor: "#f9ffff",
                "@media (max-width:555px)": {
                  width: "auto",
                  minWidth: "200px;",
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              "@media (max-width:555px)": {
                flexDirection: "column",
              },
            }}
          >
            <Box>
              <Typography>Quantity</Typography>
              <TextField
                required
                id="outlined-required"
                defaultValue={1}
                value={qty}
                type="number"
                onChange={(e) => handleChange(e, "qty")}
                InputProps={{
                  inputProps: { min: 0 },
                }}
                sx={{
                  width: "150px",
                  backgroundColor: "#f9ffff",
                  "@media (max-width:555px)": {
                    width: "auto",
                    minWidth: "200px",
                  },
                }}
              />
            </Box>
            <Box>
              <Typography>UOM</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={uom}
                onChange={(e) => handleChange(e, "uom")}
                sx={{
                  width: "150px",
                  backgroundColor: "#f9ffff",
                  "@media (max-width:555px)": {
                    width: "-webkit-fill-available",
                    minWidth: "200px;",
                  },
                }}
              >
                {optUOM.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.label}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
          </Box>
          <Box>
            <Typography>Price</Typography>
            <TextField
              required
              id="outlined-required"
              defaultValue={1000}
              value={price}
              type="number"
              onChange={(e) => handleChange(e, "price")}
              InputProps={{
                inputProps: { min: 0 },
              }}
              sx={{
                width: "350px",
                backgroundColor: "#f9ffff",
                "@media (max-width:555px)": {
                  width: "auto",
                  minWidth: "200px;",
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button disabled={disable} onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default DialogItem;
