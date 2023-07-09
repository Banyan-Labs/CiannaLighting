const info = (message: any, namespace?: string) => {
  if (typeof message === "string") {
    console.log("%c" + `[${getDate()}] [INFO] [${getLocation(namespace)}] \n > ${message}`, "color: #3d88f5;");
  } else {
    console.log("%c" + `[${getDate()}] [INFO] [${getLocation(namespace)}] \n`, "color: #3d88f5;", message);
  }
};

const warn = (message: any, namespace?: string) => {
  if (typeof message === "string") {
    console.log("%c" + `[${getDate()}] [WARN] [${getLocation(namespace)}] \n > ${message}`, "color: #f1ed69;");
  } else {
    console.log("%c" + `[${getDate()}] [WARN] [${getLocation(namespace)}] \n`, "color: #f1ed69;", message);
  }
};

const error = (message: any, namespace?: string) => {
  if (typeof message === "string") {
    console.log("%c" + `[${getDate()}] [ERROR] [${getLocation(namespace)}] \n > ${message}`, "color: #ed5a6e;");
  } else {
    console.log("%c" + `[${getDate()}] [ERROR] [${getLocation(namespace)}] \n`, "color: #ed5a6e;", message);
  }
};

const getDate = () => {
  return new Date().toLocaleString();
};

const getLocation = (namespace?: string) => {
  return namespace ? `SERVER] [${namespace}` : "SERVER";
};

const logging = { info, warn, error };

export default logging;
