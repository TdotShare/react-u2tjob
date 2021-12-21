import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routerPathProtectedUser , routerPathPublic , routerPathProtectedAdmin } from './RouterPath';

import Login from '../screen/auth/Login'
import Register from '../screen/auth/Register'
import { systemConfig } from '../config/System';
import ProtectedRoutesUser from './ProtectedRoutesUser';
import ProtectedRoutesAdmin from './ProtectedRoutesAdmin';
import Page404 from '../screen/error/page404';

function Routers() {


    return (
        <Router basename={systemConfig.BaseRouter}>
            <Switch>
                <Route exact path={`/`} component={Login} />
                <Route exact path={`${routerPathPublic.Login}`} component={Login} />
                <Route exact path={`${routerPathPublic.Register}`} component={Register} />
                <Route path={Object.values(routerPathProtectedUser)} component={ProtectedRoutesUser} />
                <Route path={Object.values(routerPathProtectedAdmin)} component={ProtectedRoutesAdmin} />
                <Route path={["*" , "/notfound"]} component={Page404} />
            </Switch>
        </Router>
    )
}

export default Routers