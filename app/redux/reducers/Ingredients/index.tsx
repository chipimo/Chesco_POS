const Ingredients = (
  state = {
    changeState: false,
    state: {},
  },
  action
) => {
  switch (action.type) {
    case "SETINGREDIENTSSTATE":
      state = {
        ...state,
        changeState: true,
        state: action.state,
      };
      break;
    case "CLEARINGREDIENTSSTATE":
      state = {
        ...state,
        changeState: false,
        state: action.state,
      };
      break;

    default:
      return state;
  }

  return state;
};

export default Ingredients;
