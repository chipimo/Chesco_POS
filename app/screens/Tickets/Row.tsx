import React = require("react");
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import PrintIcon from "@material-ui/icons/PrintOutlined";
import MoreIcon from "@material-ui/icons/More";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Typography, Modal } from "@material-ui/core";
import { Header, Image, Table } from "semantic-ui-react";

const Currency = require("react-currency-formatter");

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Row(props) {
  const { row } = props;
  const classes = useRowStyles();
  const history = useHistory();
  const [total, setTotal]= React.useState(0)

  const [openNewProduct, setopenNewProduct] = React.useState(false);

  let done = false;

  React.useEffect(() => {


  }, []);

  const CloseOpenProduct = () => {
    setopenNewProduct(false);
  };

  const CalculateQt = (arr) => {
    if (!done) {
      let totalQt = 0;
      // console.log(arr.lenght);
      if (arr.lenght === 1) {
        return arr[0].qnt;
      }
    }
    done = true;
    // return totalQt;
  };

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="print row"
            size="small"
            onClick={() => {
              var itemData = [];

              row.TicketList.list.map((list) => {
                // console.log(list);

                props.dispatchEvent({
                  type: "RESTATECART",
                });

                setTimeout(() => {
                  props.dispatchEvent({
                    type: "ADDTOCART",

                    payload: {
                      items: {
                        id: list.productKey,
                        ItemName: list.ItemName,
                        productKey: list.productKey,
                        sallingprice: list.sallingprice,
                        initalPrice: list.initalPrice,
                        isTaxEnabled: list.isTaxEnabled,
                        quantity: list.qnt,
                        amountInstore: list.amountInstore,
                        qnt: list.qnt,
                        isAddedToCart: false,
                        istaxed: "copy",
                      },
                    },
                  });
                });

                props.dispatchEvent({
                  type: "PRINTHISTORY",
                  invoiceNumber: row.InvoiceNumber,
                  user: row.User,
                  PaymentType: row.PaymentType,
                  Date: row.Date,
                  time: row.time,
                });
              }, 300);
              setTimeout(() => {
                history.push("/pos");
              }, 100);
            }}
          >
            <PrintIcon />
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.Date}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.time}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.TotalQt}
        </TableCell>
        <TableCell align="left">
          <Table
            basic="very"
            celled
            collapsing
            inverted={props.Theme.theme === "light" ? false : true}
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Product Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>

                {props.User.userLogged.prevarges === "1" ? (
                  <Table.HeaderCell>Buy price</Table.HeaderCell>
                ) : null}
                <Table.HeaderCell>selling price</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {row.TicketList.list.map((productRow, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{productRow.ItemName}</Table.Cell>
                  <Table.Cell>{productRow.qnt}</Table.Cell>
                  {props.User.userLogged.prevarges === "1" ? (
                    <Table.Cell>{productRow.buyingPrice}</Table.Cell>
                  ) : null}

                  <Table.Cell>{productRow.initalPrice}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </TableCell>
        <TableCell align="left">
          {row.PaymentType}
        </TableCell>
        <TableCell align="right">
          <Typography variant="h6">
            <Currency locale="en" quantity={row.GrandTotal} symbol={props.UseCurrency.currencyInUse.currency.symbol_native} />
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="h6">
            <Currency locale="en" quantity={row.Discount} symbol={props.UseCurrency.currencyInUse.currency.symbol_native} />
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="h6">
            <Currency locale="en" quantity={row.Cash_slipt} symbol={props.UseCurrency.currencyInUse.currency.symbol_native} />
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="h6">
            <Currency locale="en" quantity={row.Card_slipt} symbol={props.UseCurrency.currencyInUse.currency.symbol_native} />
          </Typography>
        </TableCell>

        <TableCell align="right">
          <IconButton
            onClick={() => {
              // console.log(row);
              setopenNewProduct(true);
            }}
          >
            <MoreIcon />
          </IconButton>
        </TableCell>
      </StyledTableRow>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openNewProduct}
        className={classes.modal}
        onClose={CloseOpenProduct}
      >
        <div className={classes.paper}>
          <div style={{ display: "" }}>
            <div>
              <Typography
                style={{
                  color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
                }}
                variant="h6"
              >
                Day: {row.Day}
              </Typography>
            </div>
            <div>
              <Typography
                style={{
                  color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
                }}
                variant="h6"
              >
                Day: {row.time}
              </Typography>
            </div>
            <div>
              <Typography
                style={{
                  color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
                }}
                variant="h6"
              >
                Customer Name: {row.Customer.name}
              </Typography>
            </div>

            <div>
              <Typography
                style={{
                  color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
                }}
                variant="h6"
              >
                Customer Phone Number: {row.Customer.number}
              </Typography>
            </div>
          </div>
          <div>
            <div>
              <Typography
                style={{
                  color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
                }}
                variant="h6"
              >
                GrandTotal :{" "}
                <Currency
                  locale="en"
                  quantity={row.GrandTotal}
                  symbol={props.UseCurrency.currencyInUse.currency.symbol_native}
                />
              </Typography>
            </div>
            <div>
              <Typography
                style={{
                  color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
                }}
                variant="h6"
              >
                Casher : {row.userName}
              </Typography>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    SocketConn: state.SocketConn,
    Theme: state.Theme,
    User: state.User,
    UseCurrency: state.UseCurrencyReducer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);
