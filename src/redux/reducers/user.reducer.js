import { DISPATCH_SELECTED_USER } from "../actions/actionTypes";

const initialState = {
  selectedUser: {}
};


export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case DISPATCH_SELECTED_USER: {
      return {
        ...state,
        selectedUser: action.payload
      };
    }
    default:
      return state;
  }
}

