import { Route } from 'react-router-dom'
import TopicScreen from '../screen/admin/topic/Topic'
import AccountScreen from '../screen/admin/account/Account'
import DashboardScreen from '../screen/admin/dashboard/Dashboard'
import { routerPathProtectedAdmin } from './RouterPath'

function ProtectedRoutesAdmin() {

    return (
        <>
            <Route exact path={`${routerPathProtectedAdmin.Dashboard}`} component={DashboardScreen} />
            <Route exact path={`${routerPathProtectedAdmin.Topic}`} component={TopicScreen} />
            <Route exact path={`${routerPathProtectedAdmin.Account}`} component={AccountScreen} />
        </>
    )
}

export default ProtectedRoutesAdmin