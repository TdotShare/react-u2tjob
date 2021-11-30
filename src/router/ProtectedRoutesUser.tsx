import { Route } from 'react-router-dom'
import JobScreen from '../screen/job/Job'
import ProfileScreen from '../screen/profile/Profile'
import { routerPathProtectedUser } from './RouterPath'

function ProtectedRoutesUser() {

    return (
        <>
          <Route  exact path={`${routerPathProtectedUser.Job}`} component={JobScreen} />
          <Route  exact path={`${routerPathProtectedUser.Profile}`} component={ProfileScreen} />
        </>
    )
}

export default ProtectedRoutesUser