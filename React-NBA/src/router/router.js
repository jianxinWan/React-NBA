import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom'

import App from '../container/App/app';
import Main from '../container/main/main';
import Login from '../container/login/login';
import NBA from '../container/NBA/nba';

const router = (
    <Router>
        <App>
            <Switch>
                <Route exact path="/" render={()=>(<Redirect to="/home" />)} />
                <Route path="/home"render={()=> 
                    <Main>
                        <Switch>
                            <Route path="/home/nba" component={NBA} />
                            <Redirect to="/home/nba" />
                        </Switch>
                    </Main>
                }>
                </Route>
                <Route path="/login" component={Login} />
            </Switch>
        </App>
    </Router>
)

export default router;