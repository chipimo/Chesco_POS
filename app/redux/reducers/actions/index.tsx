const Actions = (
    state = {
      state: "",
    },
    action
  ) => { 
    switch (action.type) {
      case "SETSTATE":
        state = {
          ...state,
          state: action.state,
        };
        break;
      case "CLEARSTATE":
        state = {
          ...state,
          state: "",
        };
        break;
  
      default:
        return state;
    }
  
    return state;
  };
  
  export default Actions;
  