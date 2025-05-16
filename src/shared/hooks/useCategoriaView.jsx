import { useEffect, useState } from "react";
import { categoriaWiew } from "../../services";

export const useCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCategorias = async () => {
        setIsLoading(true);
        const response = await categoriaWiew();
        if (response.error) {
            console.error("Error al obtener categorías", response.error);
        } else {
            setCategorias(response.data)
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    return { categorias, isLoading };
};
