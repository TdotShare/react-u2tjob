import { Redirect, Route } from 'react-router-dom'

import TopicScreen from '../screen/admin/topic/Topic'
import TopicUpdateScreen from '../screen/admin/topic/TopicUpdate'
import TopicCheckedScreen from '../screen/admin/topic/TopicChecked'

import AccountScreen from '../screen/admin/account/Account'
import AccountViewScreen from '../screen/admin/account/AccountView'

import DashboardScreen from '../screen/admin/dashboard/Dashboard'

import TambonScreen from '../screen/admin/tambon/Tambon'
import TambonUpdateScreen from '../screen/admin/tambon/TambonUpdate'

import { routerPathProtectedAdmin, routerPathPublic  , routerPathProtectedUser} from './RouterPath'
import { RootState } from '../store/ConfigureStore'
import { useSelector } from 'react-redux'
import exportedSwal from '../utils/swal'

function ProtectedRoutesAdmin() {

    const admin = useSelector((state: RootState) => state.admin.data)
    const user = useSelector((state: RootState) => state.user.data)

    if(!admin.email){
      return <Redirect to={routerPathPublic.Login} />
    }
  
    if(user.idcard){
      exportedSwal.actionInfo("ผู้สมัครไม่สามารถใช้งานเมนู นี้ได้ !")
      return <Redirect to={routerPathProtectedUser.Job} />
    }

    return (
        <>
            <Route exact path={`${routerPathProtectedAdmin.Dashboard}`} component={DashboardScreen} />
            <Route exact path={`${routerPathProtectedAdmin.Topic}`} component={TopicScreen} />
            <Route exact path={`${routerPathProtectedAdmin.TopicUpdate}/:id`} component={TopicUpdateScreen} />
            <Route exact path={`${routerPathProtectedAdmin.TopicChecked}/:id`} component={TopicCheckedScreen} />
            <Route exact path={`${routerPathProtectedAdmin.Tambon}`} component={TambonScreen} />
            <Route exact path={`${routerPathProtectedAdmin.TambonUpdate}/:id`} component={TambonUpdateScreen} />
            <Route exact path={`${routerPathProtectedAdmin.Account}`} component={AccountScreen} />
            <Route exact path={`${routerPathProtectedAdmin.Account}/:id`} component={AccountViewScreen} />
        </>
    )
}

export default ProtectedRoutesAdmin