const Mytables = (
  state = {
    count: 0,
    iset: false,
  },
  action
) => {
  switch (action.type) {
    case "SETCOUNT":
      state = {
        ...state,
        count: action.count,
        iset: true,
      };
      break;
    case "CLEARCOUNT":
      state = {
        ...state,
        count: action.count,
        iset: false,
      };
      break;

    default:
      return state;
  }

  return state;
};

export default Mytables;
