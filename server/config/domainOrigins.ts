import envVars from "../src/config";

if (envVars.NODE_ENV !== "deploy") {
  require("dotenv").config();
}

export default envVars.ALLOWED_ORIGINS?.split(', ') || [''];
