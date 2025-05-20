import { useState } from "react";
import { deleteComentario } from "../../services";

export const useComentarioDelete = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const eliminarComentario = async (id) => {
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        try {
            await deleteComentario(id)
            setSuccess(true)
        } catch (err) {
            setError(err.message || "Error al eliminar el comentario");
        } finally {
            setIsLoading(false)
        }
    }

    return {
        eliminarComentario,
        isLoading,
        error,
        success,
    }
}
