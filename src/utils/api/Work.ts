import axios from "axios";
import { systemConfig } from "../../config/System";
import { APIResponse_data } from "../../model/Response";
import { APIWorkexperience_data } from "../../model/Workexperience";


const getWork = async (token : String) => {
    const res = await axios.get<APIWorkexperience_data>(`${systemConfig.API}/work/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const createWork = async (data : any , token : String) => {
    const res = await axios.post<APIResponse_data>(`${systemConfig.API}/work/create`, data , {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const deleteWork = async (id : number , token : String) => {
    const res = await axios.get<APIResponse_data>(`${systemConfig.API}/work/delete/${id}` ,   {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}


const exportedAPIWork = {
    getWork,
    createWork,
    deleteWork
};

export default exportedAPIWork;