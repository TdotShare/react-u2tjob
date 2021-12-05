import { Route } from 'react-router-dom'
import Education from '../screen/education/Education'
import JobScreen from '../screen/job/Job'
import ApplicationScreen from '../screen/job/Application'
import ProfileScreen from '../screen/profile/Profile'
import Training from '../screen/training/Training'
import Workexp from '../screen/workexp/Workexp'
import { routerPathProtectedUser } from './RouterPath'

function ProtectedRoutesUser() {

    return (
        <>
          <Route  exact path={`${routerPathProtectedUser.Job}`} component={JobScreen} />
          <Route  exact path={`${routerPathProtectedUser.JobApp}`} component={ApplicationScreen} />
          <Route  exact path={`${routerPathProtectedUser.Profile}`} component={ProfileScreen} />
          <Route  exact path={`${routerPathProtectedUser.Education}`} component={Education} />
          <Route  exact path={`${routerPathProtectedUser.Workexperience}`} component={Workexp} />
          <Route  exact path={`${routerPathProtectedUser.Training}`} component={Training} />
        </>
    )
}

export default ProtectedRoutesUser