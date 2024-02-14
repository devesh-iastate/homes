const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Path to your JSON file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

exports.handler = (event, context, callback) => {
  const { path } = event;
  const basePath = path.split('.netlify/functions')[1];
  server.use(basePath, router);
  const requestListener = server.listen(0, () => {
    const { port } = requestListener.address();
    const newUrl = `http://localhost:${port}${basePath}`;
    fetch(newUrl, {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body,
    })
      .then((res) => {
        return res.text();
      })
      .then((body) => {
        callback(null, {
          statusCode: 200,
          body,
        });
      });
  });
};
