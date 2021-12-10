import axios from "axios";
import { systemConfig } from "../../config/System";
import { APIResponse_data } from "../../model/Response";
import { APIEducation_data } from "../../model/Education";


const getEducation = async (token : String) => {
    const res = await axios.get<APIEducation_data>(`${systemConfig.API}/education/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const createEducation = async (data : any , token : String) => {
    const res = await axios.post<APIResponse_data>(`${systemConfig.API}/education/create`, data , {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const deleteEducation = async (id : number , token : String) => {
    const res = await axios.get<APIResponse_data>(`${systemConfig.API}/education/delete/${id}` ,   {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const exportedAPIWork = {
    getEducation,
    createEducation,
    deleteEducation
};

export default exportedAPIWork;