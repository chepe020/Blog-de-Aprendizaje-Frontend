import axios from 'axios';

const apiBlog = axios.create({
    baseURL: "http://127.0.0.1:3000/Blog/v1",
    timeout: 5000,
    headers: { "Cache-Control": "no-cache, no-store, must-revalidate" }
})

export const publicationWiew = async () => {
    try {
        return await apiBlog.get('/publications/')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const categoriaWiew = async () => {
    try{
        return await apiBlog.get('/categorias/')
    } catch(e){
        return{
            error: true,
            e
        }
    }
}

export const addComentario = async (id, data) => {
    try {
        return await apiBlog.post(`/publications/comment/${id}`, data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const viewComentario = async (id) => {
    try {
        return await apiBlog.get(`/publications/comment/${id}`)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}