import React from 'react';

import {Provider} from 'react-redux';
import configureStore from '../stores/configureStore'

import {
    HashRouter  as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom'
import App from '../container/App/app';
import Main from '../container/main/main';
import Login from '../container/login/login';
import NBA from '../container/NBA/nba';
import Game from '../container/game/game';
import CBA from '../container/CBA/cba';
import Esports from '../container/esports/esport';
import Soccer from '../container/Soccer/soccer';
import Community from '../container/Community/community';
import Team from '../container/NBA/team/team';
import Player from '../container/NBA/player/player';
const store = configureStore();
const router = (
    <Router>
        <Provider store = {store}>
            <App>
                <Switch>
                    <Route exact path="/" render={()=>(<Redirect to="/home" />)} />
                    <Route path="/home"render={()=> 
                        <Main>
                            <Switch>
                                <Route replace path="/home/nba" component={NBA} />
                                <Route replace path="/home/cba" component={CBA} />
                                <Route replace path="/home/nbaTeam" component={Team} />
                                <Route replace path="/home/esports" component={Esports} />
                                <Route replace path="/home/soccer" component={Soccer} />
                                <Route replace path="/home/community" component={Community} />
                                <Route replace path="/home/nbaPlayer" component={Player} />
                                <Redirect to="/home/nba" />
                            </Switch>
                        </Main>
                    }>
                    </Route>
                    <Route path="/game/:mid" render={(props)=>
                        <Game {...props} />
                    } />
                    <Route path="/login" component={Login} />
                </Switch>
            </App>
        </Provider>
    </Router>
)

export default router;