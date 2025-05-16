import { useEffect, useState } from "react";
import { publicationWiew } from "../../services";

export const usePublicacionView = () => {
    const [publication, setPublication] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchPublicacion = async () =>{
        setIsLoading(true)
        const response = await publicationWiew()
        if(response.error){
            console.error("Error al obtener la Publicación" , response.e)
        } else {
            setPublication(response.data.publicaciones)
        }
        setIsLoading(false)
    }

    useEffect(()=>{
        fetchPublicacion()
    },[])

    return {
        publication,
        isLoading,
        fetchPublicacion
    }
}