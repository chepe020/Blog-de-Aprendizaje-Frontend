import { useState } from "react";
import { updateComentario } from "../../services";

export const useComentarioUpdate = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const editarComentario = async (id, datosActualizados) => {
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        try {
            await updateComentario(id, datosActualizados)
            setSuccess(true)
        } catch (err) {
            setError(err.message || "Error al actualizar el comentario")
        } finally {
            setIsLoading(false)
        }
    }

    return {
        editarComentario,
        isLoading,
        error,
        success,
    }
}
