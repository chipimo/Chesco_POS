import React = require("react");
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

const Branches = () => {
  const [state, setState] = React.useState({
    columns: [{ title: "Branch Name", field: "branche" }],
    data: [],
  });
  const [company, setCompany] = React.useState({ data: [] });
  const [branches, setBranches] = React.useState({ data: [] });
  const [companyName, setCompanyName] = React.useState("");

  React.useEffect(() => {
    appDb.GetConfigfile((callback) => {
      setCompany({ ...company, data: callback.config });
      setCompanyName(callback.config[0].dep_name);
    });
    appDb.HandleBranches({ type: "get" }, (callback) => {
      setBranches({ ...branches, data: callback });
    });
  }, []);

  return (
    <div style={{ height: "70vh", overflow: "auto" }}>
      <MaterialTable
        icons={tableIcons}
        title={companyName}
        columns={state.columns}
        data={branches.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              if (!newData.branche) {
                alert("Branch Name Must Not Be Empty");
                return resolve();
              }
              appDb.HandleBranches(
                {
                  type: "set",
                  branche: newData.branche,
                  company: companyName,
                },
                (callback) => {
                  setTimeout(() => {
                    resolve();
                    setBranches((prevState) => {
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
              
              appDb.HandleBranches(
                {
                  type: "edit",
                  oldBranchName: oldData.branche,
                  newBranchName: newData.branche,
                  company: newData.company,
                },
                (callback) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      setBranches((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }
              );
            }),
          onRowDelete: (newData, oldData) =>
            new Promise((resolve) => {
              appDb.HandleBranches(
                { type: "delete", newBranchName: newData.branche },
                (callback) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      setBranches((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }
              );
            }),
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Branches);
