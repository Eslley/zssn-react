import axios from "axios";

export const http = axios.create({
    baseURL: 'https://zssn-pr0j3ct.herokuapp.com/',
})