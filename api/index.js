const app = require("./app");
const mogodbConnection = require("./config/db");

mogodbConnection();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`API CONNECTED SUCCESSFULLY ON PORT ${PORT}`);
});
