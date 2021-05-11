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
var ipcRenderer = require("electron").ipcRenderer;
var SalesReportsExports = function (state, action) {
    if (state === void 0) { state = { _type: "", data: [] }; }
    switch (action.type) {
        case "SalesDay":
            state = __assign({}, state, { _type: "SalePerDay", data: action.data });
            ipcRenderer.send("save_csv", {
                type: "SalePerDay",
                header: [
                    {
                        id: "branche",
                        title: "Branch",
                    },
                    {
                        id: "Date",
                        title: "Date",
                    },
                    {
                        id: "GrandTotal",
                        title: "Cash sales",
                    },
                    {
                        id: "Discount",
                        title: "Discount",
                    },
                    {
                        id: "Balance",
                        title: "Credit",
                    },
                    {
                        id: "totalTaxFinal",
                        title: "Tax",
                    },
                    {
                        id: "GrandTotal",
                        title: "Total",
                    },
                ],
                data: action.data,
            });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = SalesReportsExports;
//# sourceMappingURL=ExportSales.js.map