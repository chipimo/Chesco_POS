const UseCurrency = (
  state = {
    currencyInUse: {},
  },
  action
) => {
  switch (action.type) {
    case "SETCURRENCY":
      state = {
        ...state,
        currencyInUse: action.currency,
      };
      break;

    default:
      return state;
  }

  return state;
};

export default UseCurrency;
