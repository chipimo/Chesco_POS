const TableToPrint = (
  state = {
    id: "",
    table: "",
    userName: "",
  },
  action
) => {
  switch (action.type) {
    case "SETTOPRINT":
      state = {
        ...state,
        id: action.id,
        table: action.table,
        userName: action.userName,
      };
      break;
    case "CLEARTOPRINT":
      state = {
        ...state,
        id: "",
        table: "",
        userName: "",
      };
      break;

    default:
      return state;
  }

  return state;
};

export default TableToPrint;
