const { ipcRenderer } = require("electron");

const SalesReportsExports = (state = { _type: "", data: [] }, action) => {
  switch (action.type) {
    case "SalesDay":
      state = {
        ...state,
        _type: "SalePerDay",
        data: action.data,
      };

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

export default SalesReportsExports;
