import { Route } from 'react-router-dom'
import TopicScreen from '../screen/admin/topic/Topic'
import TopicUpdateScreen from '../screen/admin/topic/TopicUpdate'
import AccountScreen from '../screen/admin/account/Account'
import DashboardScreen from '../screen/admin/dashboard/Dashboard'
import { routerPathProtectedAdmin } from './RouterPath'

function ProtectedRoutesAdmin() {

    return (
        <>
            <Route exact path={`${routerPathProtectedAdmin.Dashboard}`} component={DashboardScreen} />
            <Route exact path={`${routerPathProtectedAdmin.Topic}`} component={TopicScreen} />
            <Route exact path={`${routerPathProtectedAdmin.TopicUpdate}/:id`} component={TopicUpdateScreen} />
            <Route exact path={`${routerPathProtectedAdmin.Account}`} component={AccountScreen} />
        </>
    )
}

export default ProtectedRoutesAdmin