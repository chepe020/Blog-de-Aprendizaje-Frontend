import { useState } from "react";
import { viewComentario } from "../../services";
import toast from "react-hot-toast";

export const useComentarioWiew = () => {
    const [comentarios, setComentarios] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchComentarios = async (id) => {
        setIsLoading(true)
        const response = await viewComentario(id)
        setIsLoading(false)

        if (response.error) {
            toast.error("Error al cargar los comentarios");
            return;
        }

        setComentarios(response.data.comentarios)
    }

    return {
        comentarios,
        isLoading,
        fetchComentarios,
    }
}
