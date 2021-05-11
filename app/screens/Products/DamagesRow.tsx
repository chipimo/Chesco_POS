import React = require("react");
import { connect } from "react-redux";
import { Checkbox, Icon, Table } from "semantic-ui-react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import appDb from "../../redux/dataBase";
import { IconButton, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "semantic-ui-react";

const DamagesRow = (props) => {
  const [state, setState] = React.useState({
    rows: [],
    total: 0,
  });
  const [selected, setSelected] = React.useState({ data: [] });

  React.useEffect(() => {
    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "getGrouped" },
      (receiveCallback) => {
        setTimeout(() => {
          if (receiveCallback.productResult[0]) {
            setState({ ...state, rows: receiveCallback.productResult[0] });
          }
        }, 100);
      }
    );
  }, []);

  const search = (even, data) => {
    const index = selected.data.findIndex(
      (x) => x.productKey === data.productKey
    );

    if (index !== -1) return;

    let arry = [];

    arry = selected.data;
    arry.push(data);

    setSelected({ ...selected, data: arry });
  };

  const onSubmit = () => {
    // console.log(selected);
    let data = {
      type: "set",
      list: selected.data,
    };

    appDb.HandelDamages(data, (reciveCallback) => {
      // console.log("test");

      setSelected({ ...selected, data: [] });

      props.dispatchEvent({
        type: "SETSTATE",
        state: "loadDamagesTable",
      });
    });
  };

  const handleDelete = (list) => {
    const index = selected.data.findIndex(
      (x) => x.productKey === list.productKey
    );
    selected.data.splice(index, 1);
    setSelected({ ...selected, data: selected.data });
  };

  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        options={state.rows}
        getOptionLabel={(option) => option.ItemName}
        onChange={search}
        renderInput={(params) => (
          <TextField {...params} label="Search products" variant="outlined" />
        )}
      />

      <Table compact celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Product Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Qty</Table.HeaderCell>
            <Table.HeaderCell>Number</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {selected.data.map((list, index) => (
            <Table.Row key={index + list.productKey}>
              <Table.Cell collapsing>
                <Button
                  onClick={() => handleDelete(list, index)}
                  circular
                  color="red"
                  icon="delete"
                />
              </Table.Cell>
              <Table.Cell>{list.ItemName}</Table.Cell>
              <Table.Cell>{list.sallingprice}</Table.Cell>
              <Table.Cell>{list.amountInstore}</Table.Cell>
              <Table.Cell>
                <input
                  onInput={(e) => {
                    selected.data[index].damaged = e.target.value;
                  }}
                  type="number"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell>
              <Button onClick={onSubmit} size="small">
                Add To Damages
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ActionsReducer: state.ActionsReducer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DamagesRow);
