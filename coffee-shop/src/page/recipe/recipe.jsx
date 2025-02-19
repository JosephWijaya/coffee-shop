import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  InputLabel,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import add from "../../asset/add.svg";
import { reportAction } from "../../store/reportReducer";
import { itemAction } from "../../store/itemReducer";

const Recipe = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.item);
  const { recipe, report } = useSelector((state) => state.report);
  const [order, setOrder] = useState(2);
  const [newData, setNewData] = useState(report);
  const name = data.map((list) => {
    return list.item_name;
  });
  const stock = data.map((list) => {
    let qty = 0;
    if (list.uom === "kg") {
      qty = list.qty * 1000;
    } else if (list.uom === "liter") {
      qty = list.qty * 1000;
    } else {
      qty = list.qty;
    }
    return qty;
  });
  const [qtyRecipe, setqtyRecipe] = useState(
    recipe.map((list) => {
      return list.qty;
    })
  );
  const used = qtyRecipe.map((qty) => {
    return qty * order;
  });
  const uom = data.map((list) => {
    let uom = "";
    if (list.uom === "kg") {
      uom = "g";
    } else if (list.uom === "liter") {
      uom = "ml";
    } else {
      uom = list.uom;
    }
    return uom;
  });
  const pcs = data.map((list) => {
    let unit = 0;
    if (list.uom === "kg" || list.uom === "liter") {
      unit = 1000;
    } else {
      unit = 10;
    }
    return unit;
  });
  const priceUnit = pcs.map((unit, idx) => {
    return data[idx].price / unit;
  });
  const price = used.map((list, idx) => {
    return list * priceUnit[idx];
  });
  let total = 0;
  price.forEach((value) => {
    total += value;
  });

  const inputRefs = useRef([]);

  const handleChangeOrder = (e) => {
    setOrder(e.target.value);
  };

  const handleChangeQty = (e, idx) => {
    let value = Number(e.target.value);
    if (value > Math.floor(stock[idx] / order)) {
      value = Math.floor(stock[idx] / order);
    }
    if (value === "" || /^[0-9]*$/.test(value)) {
      const newQtyRecipe = [...qtyRecipe];
      newQtyRecipe[idx] = value;
      setqtyRecipe(newQtyRecipe);
      setTimeout(() => {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx].focus();
        }
      }, 0);
    }
  };

  const submit = () => {
    if (stock.some((num) => num <= 0)) {
      alert("Insufficient Stock!");
    } else {
      let arrRecipe = [],
        newObj = {},
        obj = newData,
        newReport = {};
      const id = obj.length > 0 ? obj[obj.length - 1].id + 1 : 1;
      for (let i = 0; i < name.length; i++) {
        newObj = {
          id: data[i].id,
          item_name: name[i],
          qty: used[i],
          uom: uom[i],
          price: priceUnit[i],
          subTotal: price[i],
        };
        arrRecipe.push(newObj);
      }
      newReport = {
        id,
        order,
        date: new Date().toLocaleString(),
        total,
        recipe: arrRecipe,
      };
      obj = [...obj, newReport];
      setNewData(obj);
      dispatch(reportAction.addReport(newReport));
      dispatch(itemAction.editStock({ arrRecipe, data }));
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#685252",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Container
      sx={{
        width: "100vw",
        maxWidth: "100vw !important",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ebebebeb",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          p: "16px 0 !important",
          gap: "16px",
          maxWidth: "100% !important",
          "@media (max-width:426px)": {
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "6px",
          }}
        >
          <InputLabel
            sx={{
              width: "40%",
              minWidth: "100px",
              maxWidth: "125px",
              alignSelf: "center",
              textOverflow: "unset",
              "@media (max-width:555px)": {
                width: "30%",
              },
            }}
          >
            <Typography variant="h6">Qty Order</Typography>
          </InputLabel>
          <TextField
            required
            id="outlined-required"
            defaultValue={1}
            value={order}
            type="number"
            onChange={handleChangeOrder}
            InputProps={{
              inputProps: { min: 1 },
            }}
            sx={{
              width: "250px",
              backgroundColor: "#f9ffff",
              "@media (max-width:555px)": {
                width: "70%",
                minWidth: "100px",
              },
            }}
          />
        </Box>
        <Button
          variant="primary"
          onClick={submit}
          sx={{
            width: "fit-content",
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
            "@media (max-width:426px)": {},
          }}
        >
          <img alt="add" src={add} style={{ marginRight: 1 }} />
          Submit
        </Button>
      </Container>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: "auto",
          maxHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          backgroundColor: "#f9ffff",
          borderRadius: "12px",
          m: "0 auto 16px",
          "@media (max-width:426px)": {
            width: "100%",
          },
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f9ffff",
                zIndex: 1,
              }}
            >
              <TableRow>
                <StyledTableCell>ITEM NAME</StyledTableCell>
                <StyledTableCell align="right">STOCK</StyledTableCell>
                <StyledTableCell align="right">RECIPE</StyledTableCell>
                <StyledTableCell align="right">QTY USED</StyledTableCell>
                <StyledTableCell align="center">UOM</StyledTableCell>
                <StyledTableCell align="right">
                  UNIT PRICE&nbsp;(Rp)
                </StyledTableCell>
                <StyledTableCell align="right">
                  SUB TOTAL&nbsp;(Rp)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, idx) => (
                <StyledTableRow key={row.idx}>
                  <StyledTableCell>{name[idx]}</StyledTableCell>
                  <StyledTableCell align="right">{Math.round(stock[idx])}</StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      required
                      id="outlined-required"
                      defaultValue={1}
                      value={qtyRecipe[idx]}
                      type="number"
                      onChange={(e) => handleChangeQty(e, idx)}
                      inputRef={(el) => (inputRefs.current[idx] = el)} // Store ref
                      InputProps={{
                        inputProps: { min: 1, max: stock[idx] / order },
                      }}
                      sx={{
                        width: "75px",
                        backgroundColor: "#f9ffff",
                        "& .MuiInputBase-input": {
                          p: "4px",
                        },
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      disabled
                      id="outlined-required"
                      defaultValue={1}
                      value={used[idx]}
                      sx={{
                        width: "75px",
                        backgroundColor: "#f9ffff",
                        "& .MuiInputBase-input": {
                          p: "4px",
                          textAlign: "end",
                        },
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">{uom[idx]}</StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      disabled
                      id="outlined-required"
                      defaultValue={0}
                      value={priceUnit[idx]}
                      sx={{
                        width: "100px",
                        backgroundColor: "#f9ffff",
                        "& .MuiInputBase-input": {
                          p: "4px",
                          textAlign: "end",
                        },
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      disabled
                      id="outlined-required"
                      defaultValue={0}
                      value={price[idx]}
                      sx={{
                        width: "100px",
                        backgroundColor: "#f9ffff",
                        "& .MuiInputBase-input": {
                          p: "4px",
                          textAlign: "end",
                        },
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Typography variant="h6">
        Total Price : Rp{total.toLocaleString()}
      </Typography>
    </Container>
  );
};

export default Recipe;
