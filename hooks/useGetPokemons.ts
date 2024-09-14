import { env } from "@/config/env"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"

const url = "https://pokeapi.co/api/v2/pokemon"

export function useGetPokemons() {
    const fetchPokemons = async ({ pageParam = 0 }) => {
        const { data } = await axios.get(url, {
            params: {
                offset: pageParam,
                limit: 20
            }
        })
        return { ...data, prevOffset: pageParam }
    }

    return useInfiniteQuery({
        queryKey: ['fetchPokemons'],
        queryFn: fetchPokemons,
        initialPageParam: 0,

        getNextPageParam: (lastPage) => {
            if (lastPage.prevOffset + 20 > lastPage.count) {
                return false
            }
            return lastPage.prevOffset + 20
        }
    })
}