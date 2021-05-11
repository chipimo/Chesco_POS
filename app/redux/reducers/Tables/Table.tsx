const TableReducer = (
  state = {
    state: false,
    name: "",
  },
  action
) => {
  switch (action.type) {
    case "TABLESET":
      state = {
        ...state,
        state: action.state,
        name: action.table_name,
      };
      break;
    case "CLOSETABLEMODUL":
      state = {
        ...state,
        state: false,
        name: action.table_name,
      };
      break;
    case "CLOSETABLE":
      state = {
        ...state,
        state: false,
        name: "",
      };
      break;

    default:
      return state;
  }

  return state;
};

export default TableReducer;
