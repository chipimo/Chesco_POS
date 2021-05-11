const React = require("react");
import { connect } from "react-redux";
import MaterialTable from "material-table";
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import appDb from "../../redux/dataBase";
import { Button } from "@material-ui/core";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox />),
  Check: forwardRef((props, ref) => <Check />),
  Clear: forwardRef((props, ref) => <Clear />),
  Delete: forwardRef((props, ref) => <DeleteOutline />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight />),
  Edit: forwardRef((props, ref) => <Edit />),
  Export: forwardRef((props, ref) => <SaveAlt />),
  Filter: forwardRef((props, ref) => <FilterList />),
  FirstPage: forwardRef((props, ref) => <FirstPage />),
  LastPage: forwardRef((props, ref) => <LastPage />),
  NextPage: forwardRef((props, ref) => <ChevronRight />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft />),
  ResetSearch: forwardRef((props, ref) => <Clear />),
  Search: forwardRef((props, ref) => <Search />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn />),
};

const index = (props) => {
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Payment Type",
        field: "pay_type",
      },
    ],
    data: [],
  });

  React.useEffect(() => {
    appDb.PaymentMode({ _type: "get_payments_mode" }, (callback) => {
      setState({ ...state, data: callback });
    });
  }, []);

  return (
    <div>
      <div>
        {" "}
        <MaterialTable
          icons={tableIcons}
          title="Payments"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                appDb.PaymentMode(
                  { _type: "set_payments_mode", newData },
                  (reciveCallback) => {
                    setTimeout(() => {
                      resolve();
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }
                );
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                appDb.PaymentMode(
                  { _type: "update_payments_mode", newData },
                  (reciveCallback) => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }, 600);
                  }
                );
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                appDb.PaymentMode(
                  { _type: "delete_payments_mode", oldData },
                  (reciveCallback) => {
                    setTimeout(() => {
                      resolve();
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }
                );
              }),
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
    return {
      dispatchEvent: (data) => dispatch(data),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(index);
