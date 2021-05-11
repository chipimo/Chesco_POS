const WareHouseList = (
  state = {
    list: [],
    loadList: false,
  },
  action
) => {
  switch (action.type) {
    case "LOADWAREHOUSELIST":
      state = {
        ...state,
        list: action.list,
        loadList: true,
      };
      break;
    case "LOADEDWAREHOUSELISTDONE":
      state = {
        ...state,
        list: action.list,
        loadList: false,
      };
      break;

    default:
      return state;
  }

  return state;
};

export default WareHouseList;
