import { http } from "./http";

export default {

    trocar:(trocas) => {
        return http.post('comercio/', trocas)
    },
}