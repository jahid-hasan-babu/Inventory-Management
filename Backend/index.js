const app = require("./app");
require("dotenv").config();
const port = 8000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
