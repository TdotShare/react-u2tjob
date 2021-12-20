import axios from "axios";
import { systemConfig } from "../../config/System";
import { APIResponse_data } from "../../model/Response";
import { APIProfile_data } from "../../model/Profile";


const getProfile = async (token : String) => {
    const res = await axios.get<APIProfile_data>(`${systemConfig.API}/user/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const reSetPassowrd = async  (data : any , token : String) => {
    const res = await axios.post<APIResponse_data>(`${systemConfig.API}/user/resetpassword`, data , {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const updateProfile = async (data : any , token : String) => {
    const res = await axios.post<APIResponse_data>(`${systemConfig.API}/user/update`, data , {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const exportedAPIProfile = {
    getProfile,
    updateProfile,
    reSetPassowrd
};

export default exportedAPIProfile;