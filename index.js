const http = require('http');
const url = require('url');
const qs = require('querystring');

function onRequest(request, response) {
  const path = url.parse(request.url).pathname;
  console.log(`Request for ${path} received`);

  if (path === '/') {
    // Serve the HTML form with CSS
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(`
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          form {
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          input[type="text"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 3px;
          }
          input[type="submit"] {
            background: #5cb85c;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }
          input[type="submit"]:hover {
            background: #4cae4c;
          }
        </style>
      </head>
      <body>
        <form action="/Login" method="POST">
          <label for="username">Enter your user Name:</label>
          <input type="text" id="username" name="username" value=""/>
          <br/>
          <label for="email">Enter your email:</label>
          <input type="text" id="email" name="email" value=""/>
          <br/>
          <input type="submit" name="login" value="Login">
        </form>
      </body>
      </html>
    `);
    response.end();
  } else if (path === '/Login') {
    if (request.method === 'POST') {
      // Handle the POST form submission
      let body = '';
      request.on('data', (chunk) => {
        body += chunk.toString();
      });
      request.on('end', () => {
        const formData = qs.parse(body);
        const name = formData['username'];
        const email = formData['email'];
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write(`Hello ${name}, your email id ${email} success`);
        response.end();
      });
    } else if (request.method === 'GET') {
      // Handle the GET form submission
      const query = url.parse(request.url).query;
      const formData = qs.parse(query);
      const name = formData['username'];
      const email = formData['email'];
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.write(`Hello ${name}, your email id ${email} success`);
      response.end();
    } else {
      // Handle other methods
      response.writeHead(405, { 'Content-Type': 'text/plain' });
      response.write('Method Not Allowed');
      response.end();
    }
  } else {
    // Handle 404 Not Found
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('404 Not Found');
    response.end();
  }
}

http.createServer(onRequest).listen(3333);
console.log("Server has started on port 3333");
