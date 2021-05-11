"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var dataBase_1 = require("../../redux/dataBase");
var react_toastify_1 = require("react-toastify");
var ipcRenderer = require("electron").ipcRenderer;
var csv = require("csv-parser");
var fs = require("fs");
var Bulkupload = function (props) {
    var _a = React.useState({ data: [] }), productsData = _a[0], setProductsData = _a[1];
    var Proccess = function (event) {
        var file = event.target.files[0];
        var results = [];
        fs.createReadStream(file.path)
            .pipe(csv())
            .on("data", function (data) { return results.push(data); })
            .on("end", function () {
            // console.log(results);
            if (!results[0].Category) {
                // console.log("No category found");
                return;
            }
            setProductsData(__assign({}, productsData, { data: results }));
        });
    };
    var saveCSV = function () {
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
    var SubmitData = function () {
        dataBase_1.default.HandelProducts({ _type: "bulkUpload", data: productsData.data }, function (callback) {
            react_toastify_1.toast("Added " + callback.length + " products successfully to", {
                position: "top-right",
                autoClose: 5000,
                type: "success",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    };
    return (React.createElement("div", { style: { padding: 10 } },
        React.createElement(core_1.Paper, { style: { padding: 10, display: "flex" } },
            React.createElement("div", null,
                React.createElement(core_1.Typography, { variant: "h6" }, "Bulk Upload"),
                React.createElement("div", { style: { padding: 10 } },
                    React.createElement("input", { onChange: Proccess, accept: ".csv", id: "contained-button-file", type: "file" }))),
            React.createElement("div", { style: { marginLeft: 10, marginTop: 15 } },
                React.createElement(core_1.Button, { variant: "outlined", onClick: SubmitData }, "Upload Bulk Upload")),
            React.createElement("div", { style: { marginLeft: 10, marginTop: 15 } },
                React.createElement(core_1.Button, { variant: "outlined", onClick: saveCSV }, "Download template")))));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Bulkupload);
//# sourceMappingURL=Bulkupload.js.map