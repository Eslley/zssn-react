import { http } from "./http";

export default {

    listar:() => {
        return http.get('sobreviventes/')
    },

    salvar:(sobrevivente) => {
        return http.post('sobreviventes/create/', sobrevivente)
    },

    atualizarLocalizacao:(sobrevivente) => {
        return http.put('sobreviventes/update/' + sobrevivente.id + '/localization/', sobrevivente)
    },

    getRelatorios:() => {
        return http.get('sobreviventes/relatorios/')
    },

    alertInfected:(idS1, idS2) => {
        return http.put(`sobreviventes/${idS1}/contaminacao/${idS2}/`)
    }

}