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

const Item = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.item);
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("");
  const [openChange, setOpenChange] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [update, setUpdate] = useState({});
  const [filteredItem, setFilteredItem] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentItem, setCurrentItem] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Define styles based on window width
  const iconStyle = {
    width: windowWidth > 555 ? "30px" : windowWidth > 425 ? "25px" : "20px",
    height: "auto",
    alignSelf: "center",
    cursor: "pointer",
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  useEffect(() => {
    handleSearch();
  }, [data, search, page, rowsPerPage]);

  const currentItems = (items) => {
    const data = items.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    setCurrentItem(data);
  };

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleSearch = () => {
    const obj = data.filter((list) =>
      list.item_name?.toLowerCase().includes(search?.toLowerCase())
    );
    setFilteredItem(obj);
    currentItems(obj);
  };

  const handleDialogChange = (status, data) => {
    setAction(status);
    setOpenChange(!openChange);
    if (status === "EDIT") {
      setUpdate(data);
    } else {
      setUpdate(null);
    }
  };

  const handleDialogDelete = (data) => {
    if (!openDelete) {
      setOpenDelete(true);
      setUpdate(data);
    } else {
      setUpdate({});
      setOpenDelete(false);
    }
  };

  const handleDelete = (status, data) => {
    if (status) {
      dispatch(itemAction.deleteItem(data));
    }
  };

  const handleSubmit = (newData) => {
    let id = -1;
    if (action === "ADD") {
      if (data.length > 0) {
        id = data[data.length - 1].id + 1;
      } else id = 1;
      newData.id = id;
      dispatch(itemAction.addItem(newData));
    } else {
      dispatch(itemAction.editItem(newData));
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
          justifyContent: "space-between",
          maxWidth: "100% !important",
          "@media (max-width:424px)": {
            flexDirection: "column",
          },
        }}
      >
        <TextField
          value={search}
          onChange={handleChangeSearch}
          placeholder="item name ..."
          sx={{
            width: "350px",
            backgroundColor: "#f9ffff",
            "@media (min-width:300px)": {
              width: "auto",
              minWidth: "250px;",
            },
            "@media (min-width:425px) and (max-width:555px)": {
              width: "50%",
              minWidth: "225px;",
            },
          }}
        />
        <Button
          variant="primary"
          onClick={() => handleDialogChange("ADD")}
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
          Add item
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
          //   gap: "36px",
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
                <StyledTableCell align="right">ID</StyledTableCell>
                <StyledTableCell>ITEM NAME</StyledTableCell>
                <StyledTableCell align="right">QTY</StyledTableCell>
                <StyledTableCell align="center">UOM</StyledTableCell>
                <StyledTableCell align="right">PRICE&nbsp;(Rp)</StyledTableCell>
                <StyledTableCell align="center">ACTION</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItem?.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="right" component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell>{row.item_name}</StyledTableCell>
                  <StyledTableCell align="right">
                    {Number(row.qty).toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.uom}</StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>
                  <StyledTableCell align="center">
                    <img
                      alt="edit"
                      src={edit}
                      onClick={() => handleDialogChange("EDIT", row)}
                      style={iconStyle}
                    />
                    <img
                      alt="delete"
                      src={remove}
                      onClick={() => handleDialogDelete(row)}
                      style={iconStyle}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
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
            color: "#fff",
            zIndex: 1,
            overflow: "hidden",
          }}
        />
      </Paper>
      <DialogItem
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
      />
    </Container>
  );
};

export default Item;
