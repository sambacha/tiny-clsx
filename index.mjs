function toVal(mix) {
  let k;
  let y;
  let str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if (y = toVal(mix[k])) {
            str && (str += " ");
            str += y;
          }
        }
      }
    } else {
      for (k = 0; k < Object.keys(mix).length; k++) {
        if (mix[k]) {
          if (str)
            str += " ";
          str += k;
        }
      }
    }
  }
  return str;
}
function clsx() {
  let i = 0;
  let tmp;
  let x;
  let str = "";
  while (i < arguments.length) {
    if ((tmp = arguments[i++]) && (x = toVal(tmp))) {
      if (str)
        str += " ";
      str += x;
    }
  }
  return str;
}

export { clsx };
//# sourceMappingURL=index.mjs.map
