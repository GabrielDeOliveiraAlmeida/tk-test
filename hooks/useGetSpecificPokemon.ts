import { env } from "@/config/env"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import axios from "axios"


export function useGetSpecificPokemon(name?: string) {
    const fetchPokemon = async () => {
        const { data } = await axios.get(`${env.pokemonApi}/${name}`)
        console.log("response", data)
        return data
    }

    return useQuery({
        queryKey: ['pokemon', name],
        enabled: name !== "",
        queryFn: fetchPokemon,
    })
}