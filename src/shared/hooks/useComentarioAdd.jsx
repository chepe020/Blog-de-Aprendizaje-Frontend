import { useState } from "react";
import { addComentario as addComentarioRequest} from "../../services";
import toast from "react-hot-toast";

export const useComentarioAdd = () => {
    const [isLoading, setIsLoading] = useState(false)

    const saveComentario = async(id, data)=>{
        setIsLoading(true)

        const response = await addComentarioRequest(id, data)

        setIsLoading(false)

        if(response.error){
            return toast.error(
                response?.e?.response?.data?.msg || 'No se pudo agregar el Comentario'
            )
        }

        toast.success('Comentario agregado exitosamente')
    }

    return{
        saveComentario,
        isLoading
    }
}