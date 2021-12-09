import axios from "axios";
import { systemConfig } from "../../config/System";
import { APIResponse_data } from "../../model/Response";


const getAccountAll = async (token : String) => {
    const res = await axios.get(`${systemConfig.API}/admin/account/user`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const bannedUser = async (id : Number , token : String) => {

    let res = await axios.get<APIResponse_data>(`${systemConfig.API}/admin/account/bannedUser/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    return res.data
}


const resetPassword = async (id : Number , token : String) => {

    let res = await axios.get<APIResponse_data>(`${systemConfig.API}/admin/account/resetPassUser/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    return res.data
}


const exportedAPIAccount = {
    bannedUser,
    resetPassword,
    getAccountAll
};

export default exportedAPIAccount;