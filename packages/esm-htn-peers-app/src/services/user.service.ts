export function getUserAsProvider(sessionUser: any) {
  return {
    peer_fname: sessionUser.name[0].given[0],
    peer_sname: sessionUser.name[0].given[1],
    peer_lname: sessionUser.name[0].family,
  };
}
