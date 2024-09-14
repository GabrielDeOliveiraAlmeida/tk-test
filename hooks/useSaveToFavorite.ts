import { env } from "@/config/env"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useAsyncLocalStorage } from "./useAsyncLocalStorage"

export function useSaveToFavorite() {
    const { storeData, getData } = useAsyncLocalStorage()
    const queryClient = useQueryClient()
    

    const save = async (pokemon: any) => {
        let newData = []
        const data = await getData('favorite')      
        
        if(!data) {
            newData = [pokemon]
        }
        const findItem = data.find(item => item.name == pokemon.name)
        console.log(findItem)
        if(findItem) {
            newData = data.filter(item => item.name != pokemon.name)
        } else {
            newData = [...data, pokemon]
        }
        queryClient.setQueryData(["favorite"], () => {
            return newData
        })
        await storeData('favorite', newData)
    }

    return { save }
    
}