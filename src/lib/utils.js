export const isPlainObject = function (obj) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  let proto = obj;
  while(Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}