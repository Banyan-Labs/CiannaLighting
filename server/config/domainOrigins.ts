if (process.env.NODE_ENV !== "deploy") {
  require("dotenv").config();
}

export default [process.env.ALLOWED_ORIGINS];
