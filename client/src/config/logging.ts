const info = (message: any, namespace?: string) => {
    if (typeof message === "string") {
        console.log("%c" + `[${getDate()}] [INFO] ${namespace ? `[${namespace}]` : ''} > ${message}`, "color: #3d88f5;");
    } else {
        console.log("%c" + `[${getDate()}] [INFO] ${namespace ? `[${namespace}]` : ''}`, "color: #3d88f5;", message);
    }
};

const warn = (message: any, namespace?: string) => {
    if (typeof message === "string") {
        console.log("%c" + `[${getDate()}] [WARN] ${namespace ? `[${namespace}]` : ''} > ${message}`, "color: #f1ed69;");
    } else {
        console.log("%c" + `[${getDate()}] [WARN] ${namespace ? `[${namespace}]` : ''}`, "color: #f1ed69;", message);
    }
};

const error = (message: any, namespace?: string) => {
    if (typeof message === "string") {
        console.log("%c" + `[${getDate()}] [ERROR] ${namespace ? `[${namespace}]` : ''} > ${message}`, "color: #ed5a6e;");
    } else {
        console.log("%c" + `[${getDate()}] [ERROR] ${namespace ? `[${namespace}]` : ''}`, "color: #ed5a6e;", message);
    }
};

const getDate = () => {
    return new Date().toLocaleString();
};

const logging = { info, warn, error };

export default logging;
