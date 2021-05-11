const TableActions = (
  state = {
    action: "",
    isSet: false,
    id: "",
  },
  action
) => {
  switch (action.type) {
    case "SETTABLEACTIONS":
      state = {
        ...state,
        action: action.ActionType,
        isSet: true,
        id: action.id,
      };
      break;
    case "CLEARTABLEACTIONS":
      state = {
        ...state,
        action: "",
        isSet: false,
        id: "",
      };
      break;

    default:
      return state;
  }

  return state;
};

export default TableActions;
