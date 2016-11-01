import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.jsx';


// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component

ReactDOM.render(<App />, document.getElementById('react-root'));
