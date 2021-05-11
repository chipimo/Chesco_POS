const Materials = (
    state = {
      changeState: false,
      state: {},
    },
    action
  ) => {
    switch (action.type) {
      case "SETMATERIALSSTATE":
        state = {
          ...state,
          changeState: true,
          state: action.state,
        };
        break;
      case "SETNEWSTATE":
        state = {
          ...state,
          changeState: false,
          state: action.state,
        };
        break;
      case "CLEARMATERIALSSTATE":
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
  
  export default Materials;
  