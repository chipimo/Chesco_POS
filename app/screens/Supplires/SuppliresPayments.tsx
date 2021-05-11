import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React = require("react");
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";

function SuppliresPayments(props) {
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <div style={{ marginLeft: 20, marginTop: 20, width: "100%" }}>
        <Typography variant="h6" style={{ paddingBottom: 20 }}>
          Supplier Payments
        </Typography>
      </div>
      <div
        style={{
          width: "100%",
          margin: "auto",
          display: "flex",
          padding: 10,
        }}
      >
        <div
          style={{
            height: "100%",
            width: "70%",
            margin: "auto",
            padding: 20,
          }}
        >
          <Table celled inverted selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Supplier Name</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Contact #</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>John</Table.Cell>
                <Table.Cell>Approved</Table.Cell>
                <Table.Cell textAlign="right">None</Table.Cell>
                <Table.Cell textAlign="right">None</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Jamie</Table.Cell>
                <Table.Cell>Approved</Table.Cell>
                <Table.Cell textAlign="right">Requires call</Table.Cell>
                <Table.Cell textAlign="right">Requires call</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Jill</Table.Cell>
                <Table.Cell>Denied</Table.Cell>
                <Table.Cell textAlign="right">None</Table.Cell>
                <Table.Cell textAlign="right">None</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <Paper
          style={{
            width: "30%",
            height: "100%",
            backgroundColor:
              props.Theme.theme === "light" ? "#EBEBEB" : "#2B2B2B",
            padding: 15,
          }}
        >
          <div>
            <Typography variant="h6">Add New Supplier Payment</Typography>
          </div>
          <div style={{ marginTop: 20 }}>
            <TextField
              style={{ marginTop: props.type === "edit" ? 20 : 0 }}
              name="ProductQt"
              type="text"
              variant="outlined"
              fullWidth
              // onChange={handleTextChange("ProductQt")}
              // value={values.ProductQt}
              id="ProductQt"
              label="Supplier Name"
              // error={errors.nameError === "" ? false : true}
              // helperText={errors.nameError}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <MoneyIcon />
              //     </InputAdornment>
              //   ),
              // }}
            />
            <div style={{ height: 10 }} />
            <TextField
              style={{ marginTop: props.type === "edit" ? 20 : 0 }}
              name="ProductQt"
              type="text"
              variant="outlined"
              fullWidth
              // onChange={handleTextChange("ProductQt")}
              // value={values.ProductQt}
              id="ProductQt"
              label="Supplier Address"
              // error={errors.nameError === "" ? false : true}
              // helperText={errors.nameError}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <MoneyIcon />
              //     </InputAdornment>
              //   ),
              // }}
            />
            <div style={{ height: 10 }} />
            <TextField
              style={{ marginTop: props.type === "edit" ? 20 : 0 }}
              name="ProductQt"
              type="text"
              variant="outlined"
              fullWidth
              // onChange={handleTextChange("ProductQt")}
              // value={values.ProductQt}
              id="ProductQt"
              label="Supplier Contact "
              // error={errors.nameError === "" ? false : true}
              // helperText={errors.nameError}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <MoneyIcon />
              //     </InputAdornment>
              //   ),
              // }}
            />
            <div style={{ marginTop: 10 }}>
              <Button variant="contained" color="primary" style={{}}>
                Create
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuppliresPayments);
