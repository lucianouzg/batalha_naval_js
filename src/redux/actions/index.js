import { DISPATCH_SELECTED_USER } from "./actionTypes";

export const dispatchSelectedUser = (user) => {
  return {
    type: DISPATCH_SELECTED_USER,
    payload: user,
  };
};
