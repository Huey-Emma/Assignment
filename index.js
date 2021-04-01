import http from 'http';
import { handlers } from './controllers';

const PORT = 4000;

const server = http.createServer((req, res) => {
  const path = req.url;
  const trimmedPath = path.split('/').filter(Boolean).join('/');
  const headers = req.headers;
  const method = req.method;

  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });

  req.on('end', () => {
    const payload = Buffer.concat(body).toString();

    const data = {
      path: trimmedPath,
      method: method.toLowerCase(),
      headers,
      payload: payload.length !== 0 ? JSON.parse(payload) : payload,
    };

    const selectedPath = router[trimmedPath]
      ? router[trimmedPath]
      : router.notFound;

    selectedPath(data, (statusCode, payload) => {
      statusCode = statusCode || 200;
      payload = payload;

      if (typeof payload === 'object') {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(payload));
      } else {
        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.end(payload);
      }
    });
  });
});

const router = {
  notFound: handlers.notFound,
  ping: handlers.ping,
  user: handlers.user,
  home: handlers.home,
};

server.listen(PORT, () => {
  console.log('App is lisening  on port ' + PORT);
});
