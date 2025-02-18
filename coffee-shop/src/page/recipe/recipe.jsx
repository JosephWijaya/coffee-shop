import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import edit from "../../asset/edit.svg";
import remove from "../../asset/delete.svg";
import add from "../../asset/add.svg";
import {
  Button,
  Container,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import DialogItem from "../../component/dialog-item";
import { itemAction } from "../../store/itemReducer";
import DialogDeleteItem from "../../component/dialog-delete-item";

// TODO: Melakukan Calculate dan TidyUP 

const Recipe = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.item);
  const [order, setOrder] = useState(2);
  const [data, setData] = useState([]);
  const recipe = [15, 150, 20, 1, 20, 50];

  useEffect(() => {
    setData([]);
    console.log(item);
    let uom = "";
    let qty,
      pcs,
      qty_recipe = 0;
    const data = item.map((list, idx) => {
      if (list.uom === "kg") {
        uom = "g";
        qty = list.qty * 1000;
        pcs = 1000;
      } else if (list.uom === "liter") {
        uom = "ml";
        qty = list.qty * 1000;
        pcs = 1000;
      } else {
        uom = list.uom;
        qty = list.qty;
        pcs = 1;
      }
      return {
        item_name: list.item_name,
        qty_stock: qty,
        qty_recipe: recipe[idx],
        qty_used: recipe[idx] * order,
        uom: uom,
        price: recipe[idx] * order * (list.price / pcs),
      };
    });
    setData(data);
  }, [item]);

  const handleChangeOrder = (e) => {
    setOrder(e.target.value);
  };

  const handleChangeData = (e, data) => {
    const value = e.target.value;
    console.log(data, data.idx, value);
    if (data.field === "recipe") {
      if (value === "" || /^[0-9]*$/.test(value)) {
        assignData(data.idx, { qty_recipe: value });
      }
    }
  };

  const assignData = (idx, newData) => {
    console.log(newData);
    const updatedItems = data.map((item, i) => {
      if (i === idx) {
        return { ...item, ...newData }; // Update the specific item
      }
      return item; // Return the item unchanged
    });
    console.log(updatedItems);
    setData(updatedItems);
  };

  const calculate = () => {
    console.log("CALCULATE");
  };
  //   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //   useEffect(() => {
  //     const handleResize = () => {
  //       setWindowWidth(window.innerWidth);
  //     };

  //     window.addEventListener("resize", handleResize);
  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, []);

  // Define styles based on window width
  //   const iconStyle = {
  //     width: windowWidth > 555 ? "30px" : windowWidth > 425 ? "25px" : "20px",
  //     height: "auto",
  //     alignSelf: "center",
  //     cursor: "pointer",
  //   };

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
          "@media (max-width:424px)": {},
        }}
      >
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
            width: "350px",
            backgroundColor: "#f9ffff",
            "@media (max-width:555px)": {
              width: "auto",
              minWidth: "100px",
            },
          }}
        />
        <Button
          variant="primary"
          onClick={calculate}
          sx={{
            minWidth: "fit-content",
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
          Calculate
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
          m: "0 auto",
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
                  ITEM PRICE&nbsp;(Rp)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, idx) => (
                <StyledTableRow key={row.idx}>
                  <StyledTableCell>{row.item_name}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.qty_stock}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      required
                      id="outlined-required"
                      defaultValue={1}
                      value={row.qty_recipe}
                      type="number"
                      onChange={(e) =>
                        handleChangeData(e, { idx, field: "recipe" })
                      }
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
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
                  <StyledTableCell align="right">
                    <TextField
                      disabled
                      id="outlined-required"
                      defaultValue={1}
                      value={row.qty_used}
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
                  <StyledTableCell align="center">{row.uom}</StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      disabled
                      id="outlined-required"
                      defaultValue={0}
                      value={row.price}
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
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredItem.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "#685252",
            color:"#fff",
            zIndex: 1,
            overflow:"hidden"
          }}
        /> */}
      </Paper>
      {/* <DialogItem
        isOpen={openChange}
        data={update}
        handleClose={handleDialogChange}
        action={action}
        handleSubmit={(data) => handleSubmit(data)}
      />
      <DialogDeleteItem
        isOpen={openDelete}
        data={update}
        handleClose={handleDialogDelete}
        handleDelete={(status, data) => handleDelete(status, data)}
      /> */}
    </Container>
  );
};

export default Recipe;
