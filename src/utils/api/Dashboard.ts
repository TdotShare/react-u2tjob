import axios from "axios";
import { systemConfig } from "../../config/System";
import { APIDashboard_data } from "../../model/Dashboard";

const getDashboard = async (token : String) => {

    let res = await axios.get<APIDashboard_data>(`${systemConfig.API}/admin/dashboard`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    return res.data
}


const exportedAPIDashboard = {
    getDashboard
};

export default exportedAPIDashboard