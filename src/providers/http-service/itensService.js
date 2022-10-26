import { http } from "./http";

export default {

    listar:() => {
        return http.get('itens')
    },

    salvar:(item) => {
        return http.post('itens/create/', item)
    },

    deletar:(item) => {
        return http.delete('itens/delete/'+item.id)
    }
}