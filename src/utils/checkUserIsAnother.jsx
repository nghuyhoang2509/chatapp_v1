export function checkUserIsAnother(me, users) {
  return me == users[0] ? users[1] : users[0];
}
