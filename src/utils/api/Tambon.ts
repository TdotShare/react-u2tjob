import axios from "axios";
import { systemConfig } from "../../config/System";
import { APIResponse_data } from "../../model/Response";
import { APITambon_data } from "../../model/Tambon";



const getTambon = async (id : number , token : String) => {
    const res = await axios.get(`${systemConfig.API}/admin/tambon/view/${id}` , {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const getTambonAll = async (token : String) => {
    const res = await axios.get<APITambon_data>(`${systemConfig.API}/admin/tambon`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const createTambon = async (data : any , token : String) => {
    const res = await axios.post<APIResponse_data>(`${systemConfig.API}/admin/tambon/create`, data ,  {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const updateTambon = async (data : any , token : String) => {
    const res = await axios.post<APIResponse_data>(`${systemConfig.API}/admin/tambon/update`  , data ,   {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const deleteTambon = async (id : number , token : String) => {
    const res = await axios.get<APIResponse_data>(`${systemConfig.API}/admin/tambon/delete/${id}` ,   {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}


const exportedAPITambon = {
    getTambon,
    getTambonAll,
    createTambon,
    updateTambon,
    deleteTambon
};

export default exportedAPITambon;