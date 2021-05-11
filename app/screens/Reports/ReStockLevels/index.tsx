const React = require("react");
import { connect } from "react-redux";
import appDb from "../../../redux/dataBase";

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

export const index = (props) => {
  const [state, setState] = React.useState({
    data: [],
    columns: [
      { title: "Product Name", field: "ItemName" },
      { title: "Quantity", field: "amountInstore" },
      { title: "Reorder Level", field: "alertOut" },
    ],
  });

  React.useEffect(() => {
    LoadProducts();
  }, []);

  const LoadProducts = () => {
    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "getGrouped" },
      (receiveCallback) => {
        setTimeout(() => {
          if (receiveCallback.productResult[0]) {
            var tempArr = [];
            receiveCallback.productResult[0].map((product) => {
              if (product.alertOut > product.amountInstore)
                tempArr.push(product);
              //   console.log(product);
            });
            setState({ ...state, data: tempArr });
          }
        }, 100);
      }
    );
  };

  return (
    <div
      style={{ width: "70vw", padding: 10, height: "60vh", overflow: "auto" }}
    >
      <MaterialTable
        icons={tableIcons}
        title="Product reorder list"
        columns={state.columns}
        data={state.data}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
