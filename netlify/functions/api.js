const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports.handler = (event, context) => {
  return new Promise((resolve, reject) => {
    server.listen(3000, () => {
      const response = {
        statusCode: 200,
        body: "JSON Server running",
      };
      resolve(response);
    });
  });
};
