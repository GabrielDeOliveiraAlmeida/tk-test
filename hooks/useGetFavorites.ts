import { env } from "@/config/env"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useAsyncLocalStorage } from "./useAsyncLocalStorage"

export function useGetFavorite() {
    const { getData } = useAsyncLocalStorage()
    
    const fetchPokemon = async () => {
        const data = await getData('favorite')
        return data
    }

    return useQuery({
        queryKey: ['favorite'],
        queryFn: fetchPokemon,
    })
}