import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routerPathProtectedUser , routerPathPublic } from './RouterPath';

import Login from '../screen/auth/Login'
import Register from '../screen/auth/Register'
import { systemConfig } from '../config/System';
import ProtectedRoutesUser from './ProtectedRoutesUser';

function Routers() {
    return (
        <Router basename={systemConfig.BaseRouter}>
            <Switch>
                <Route exact path={`/`} component={Login} />
                <Route exact path={`${routerPathPublic.Login}`} component={Login} />
                <Route exact path={`${routerPathPublic.Register}`} component={Register} />
                <Route path={Object.values(routerPathProtectedUser)} component={ProtectedRoutesUser} />
            </Switch>
        </Router>
    )
}

export default Routers