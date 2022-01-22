import { Redirect, Route } from 'react-router-dom'
import Education from '../screen/education/Education'
import JobScreen from '../screen/job/Job'
import ApplicationScreen from '../screen/job/Application'
import ProfileScreen from '../screen/profile/Profile'
import Training from '../screen/training/Training'
import Workexp from '../screen/workexp/Workexp'
import { routerPathPublic, routerPathProtectedAdmin, routerPathProtectedUser } from './RouterPath'
import { useSelector } from 'react-redux'
import { RootState } from '../store/ConfigureStore'
import exportedSwal from '../utils/swal'
import { APIProfile_data } from '../model/Profile'
import exportedAPIProfile from '../utils/api/Profile'
import { useQuery } from 'react-query'

function ProtectedRoutesUser() {



  const user = useSelector((state: RootState) => state.user.data)
  const auth = useSelector((state: RootState) => state.user.auth)

  const { data } = useQuery<APIProfile_data, Error>('profile-view', async () => exportedAPIProfile.getProfile(user.token))

  if(data?.bypass){

    if (data?.status === "Unauthorized") {
      exportedSwal.actionInfo("หมดระยะเวลาการใช้งาน กรุณาเข้าสู่ระบบใหม่อีกครั้ง !")
      return <Redirect to={routerPathPublic.Login} />
    }

  }

  if (!auth) {
    return <Redirect to={routerPathPublic.Login} />
  }

  if (!user.idcard) {
    exportedSwal.actionInfo("ผู้ดูแลระบบไม่สามารถใช้งานเมนู นี้ได้ !")
    return <Redirect to={routerPathProtectedAdmin.Dashboard} />
  }

  return (
    <>
      <Route exact path={`${routerPathProtectedUser.Job}`} component={JobScreen} />
      <Route exact path={`${routerPathProtectedUser.JobApp}/:id`} component={ApplicationScreen} />
      <Route exact path={`${routerPathProtectedUser.Profile}`} component={ProfileScreen} />
      <Route exact path={`${routerPathProtectedUser.Education}`} component={Education} />
      <Route exact path={`${routerPathProtectedUser.Workexperience}`} component={Workexp} />
      <Route exact path={`${routerPathProtectedUser.Training}`} component={Training} />
    </>
  )
}

export default ProtectedRoutesUser