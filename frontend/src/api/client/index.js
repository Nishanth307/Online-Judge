import axios from 'axios'

export const axiosInstance = axios.create({
    headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'application/json'
    }
})