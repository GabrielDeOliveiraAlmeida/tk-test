import { env } from "@/config/env"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import axios from "axios"


const api = "https://pokeapi.co/api/v2/evolution-chain"

export function useGetEvolution(id?: number) {
    const fetchPokemon = async () => {
        const { data } = await axios.get(`${api}/${id}`)
        return data
    }

    return useQuery({
        queryKey: ['evolution', id],
        enabled: id !== undefined && id !== null,
        queryFn: fetchPokemon,
    })
}