import axios from "axios";
import { systemConfig } from "../../config/System";
import { APIResponse_data } from "../../model/Response";


const getJob = async (id: number, token: String) => {

    const res = await axios.get(`${systemConfig.API}/applyjob/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data

}


const updateJob = async (data: any, token: String) => {
    const res = await axios.post<APIResponse_data>(`${systemConfig.API}/applyjob/update`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
    });

    return res.data
}


const exportedAPIJob = {
    getJob,
    updateJob,
};

export default exportedAPIJob;