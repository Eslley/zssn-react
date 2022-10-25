import { http } from "./http";

export default {

    listar:() => {
        return http.get('inventarios')
    },

    getInventario:(sobreviventeId) => {
        return http.get(`inventarios/sobrevivente/${sobreviventeId}/`)
    }
}