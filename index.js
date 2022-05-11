// require your server and launch it here

//import
const server = require("./api/server");

const PORT = 5000;
//start listening on port
server.listen(PORT, () => {
  console.log("running on ", PORT);
});
