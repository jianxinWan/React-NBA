import React from 'react';

import Main from './container/main/main';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
  } from 'react-router-dom'

const router = (
    <Router>
        <Main />
    </Router>
)

export default router;