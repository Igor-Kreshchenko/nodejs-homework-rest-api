const app = require("../app");
const db = require("../model/db");
const createFolderIsNotExist = require("../helpers/create-folder");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = process.env.UPLOAD_DIR;
const PUBLIC_DIR = process.env.PUBLIC_DIR;

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOAD_DIR);
    await createFolderIsNotExist(PUBLIC_DIR);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Error: ${err.message}`);
});
