// importing React components
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Container from './container';
// importing styles
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'react-bootstrap-typeahead/css/Token.css'

ReactDOM.render(
  <Header />,
  document.getElementById('header')
);

ReactDOM.render(
  <Container />,
  document.getElementById('container')
);
