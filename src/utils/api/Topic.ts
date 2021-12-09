import axios from "axios";
import { systemConfig } from "../../config/System";
import { APIResponse_data } from "../../model/Response";



const getTopicAll = async (token : String) => {
    const res = await axios.get(`${systemConfig.API}/admin/topic` , {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}


const getTopic = async (id : number , token : String) => {
    const res = await axios.get(`${systemConfig.API}/admin/topic/view/${id}` , {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}


const createTopic = async (data : any , token : String) => {
    const res = await axios.post(`${systemConfig.API}/admin/topic/create`  , data ,   {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const updateTopic = async (data : any , token : String) => {
    const res = await axios.post<APIResponse_data>(`${systemConfig.API}/admin/topic/update`  , data ,   {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}

const deleteTopic = async (id : number , token : String) => {
    const res = await axios.get<APIResponse_data>(`${systemConfig.API}/admin/topic/delete/${id}` ,   {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res.data
}



const exportedAPITopic = {
    getTopicAll,
    getTopic,
    createTopic,
    deleteTopic,
    updateTopic
};

export default exportedAPITopic;