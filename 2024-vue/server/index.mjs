import path from 'path';
import http from 'http';
import fs from 'fs';
import url from 'url';

const headers = {
  'Access-Control-Allow-Origin': 'http:localhost:5173', /* @dev First, read about security */
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000, // 30 days
  /** add other headers as per requirement */
};
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    let { query, pathname } = url.parse(req.url, true);

    headers['Access-Control-Allow-Origin'] = req.headers.origin;

    getters[pathname].call(this, query, res);
  }
});
const getters = {
  '/file': (query, res) => {
    let testFile = path.resolve(`./server/inputs/${query.file}`);

    if (!fs.existsSync(testFile)) {
      res.statusCode = 404;
      res.end('404: File Not Found');

      return;
    }

    res.writeHead(200, { ...headers, "content-type": "text/html" });

    const fileContents = fs.readFileSync(testFile, 'utf-8');

    res.end(fileContents);
  }
}

server.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

// const app = express();
// const port = 3000;
// var corsOptions = {
//   origin: 'http://localhost:5174',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.get('/', (req, res) => {
//   res.send('Welcome to my server!');
// });

// app.get('/file', cors(corsOptions), async (req, res) => {
//   try {
//     console.log('day1', req.query.file);

//     // let text = await fetch('inputs/day1/test.txt').then(f => f.text());
//     let testFile = path.resolve(`./server/inputs/${req.query.file}`);
//     // let readFile = fs.readFileSync(testFile, 'utf8')
    
//     res.sendFile(testFile);
//   } catch(err) {
//     console.log(err);

//     res.send(err);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });