const express = require('express');
const SocketServer = require('ws').Server;


// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
// Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', message => {
    const data = JSON.parse(message);

    console.log(data);

    wss.broadcast = function broadcast(data) {
      console.log('broadcast!');
      wss.clients.forEach(client => {
        client.send(JSON.stringify(data));
      });
    }
   wss.broadcast(data);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});