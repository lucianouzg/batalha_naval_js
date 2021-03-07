// isso aqui é uma ACTION, que vai sofrer um DISPATCH
export const selectUser = (user) => {
  console.log("estamos dando dispatch no usuario de nome: " + user.nome);
  return {
    type: "DISPATCH_USER_SELECTED",
    payload: user,
  };
};
