const TicketSearchProduct = (
  state = {
    item: {},
    isSet: false,
  },
  action
) => {
  switch (action.type) {
    case "TICKTSEARCHPRODUCT":
      // console.log(action.socket);
      state = {
        ...state,
        item: action.payload.item,
        isSet: action.payload.isSet,
      };
      break;

    default:
      return state;
  }

  return state;
};

export default TicketSearchProduct;
