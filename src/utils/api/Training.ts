import axios from "axios";
import { systemConfig } from "../../config/System";
import { APIResponse_data } from "../../model/Response";
import { APITraining_data } from "../../model/Training";

const getTraining = async (token : String) => {
    const res = await axios.get<APITraining_data>(`${systemConfig.API}/training/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const createTraining = async (data : any , token : String) => {
    const res = await axios.post<APIResponse_data>(`${systemConfig.API}/training/create`, data ,  {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const deleteTraining = async (id : number , token : String) => {
    const res = await axios.get<APIResponse_data>(`${systemConfig.API}/training/delete/${id}` ,   {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}


const exportedAPITraining = {
    getTraining,
    createTraining,
    deleteTraining
};

export default exportedAPITraining;