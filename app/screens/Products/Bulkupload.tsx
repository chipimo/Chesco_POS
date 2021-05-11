const React = require("react");
import { Button, Paper, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import appDb from "../../redux/dataBase";
import { toast } from "react-toastify";

const { ipcRenderer } = require("electron");

const csv = require("csv-parser");
const fs = require("fs");

const Bulkupload = (props) => {
  const [productsData, setProductsData] = React.useState({ data: [] });

  const Proccess = (event) => {
    var file = event.target.files[0];
    const results = [];

    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        // console.log(results);

        if (!results[0].Category) {
          // console.log("No category found");
          
          return
        }

        setProductsData({ ...productsData, data: results });
      });
  };

  const saveCSV = () => {
    ipcRenderer.send("save_csv", {
      type: "Product_template",
      data: [],
      header: [
        { id: "ItemName", title: "Product" },
        {
          id: "group",
          title: "Category",
        },
        {
          id: "branche",
          title: "Branch",
        },
        {
          id: "SupplierName",
          title: "Supplier",
        },
        {
          id: "isTaxEnabled",
          title: "Vat Status",
        },
        {
          id: "amountInstore",
          title: "Quantity",
        },
        {
          id: "buyingPrice",
          title: "Buying_Price",
        },
        {
          id: "sallingprice",
          title: "Selling_Price",
        }
      ],
    });
  };

  const SubmitData = () => {
    appDb.HandelProducts(
      { _type: "bulkUpload", data: productsData.data },
      (callback) => {
        toast(
          `Added ${callback.length} products successfully to`,
          {
            position: "top-right",
            autoClose: 5000,
            type: "success",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    );
  };

  return (
    <div style={{ padding: 10 }}>
      <Paper style={{ padding: 10, display: "flex" }}>
        <div>
          <Typography variant="h6">Bulk Upload</Typography>
          <div style={{ padding: 10 }}>
            <input
              onChange={Proccess}
              accept=".csv"
              id="contained-button-file"
              type="file"
            />
          </div>
        </div>
        <div style={{ marginLeft: 10, marginTop: 15 }}>
          <Button variant="outlined" onClick={SubmitData}>
            Upload Bulk Upload
          </Button>
        </div>
        <div style={{ marginLeft: 10, marginTop: 15 }}>
          <Button variant="outlined" onClick={saveCSV}>
            Download template
          </Button>
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Bulkupload);
