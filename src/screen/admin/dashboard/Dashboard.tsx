import React , { useState , useEffect }from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Paperbase from '../../../components/template/Paperbase'
import { routerPathProtectedAdmin } from '../../../router/RouterPath'
import { setBreadCms } from '../../../store/reducer/Breadcrumbs'
import { setTitle } from '../../../store/reducer/TitleHeader'



function Topic() {
    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [title] = useState<string>("ภาพรวมระบบ")

    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedAdmin.Dashboard , active: false, },
            { value: title, link: "", active: true, }
        ]))
        // eslint-disable-next-line 
    }, [])


    return (
        <>
        </>
    )
}


export default Topic
