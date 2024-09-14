import { Image, StyleSheet, Platform, FlatList, TextInput, TextInputChangeEventData, TextInputProps, NativeSyntheticEvent, Button } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGetPokemons } from '@/hooks/useGetPokemons';
import { useState } from 'react';
import { useGetSpecificPokemon } from '@/hooks/useGetSpecificPokemon';
import { env } from '@/config/env';
import { Link, router } from 'expo-router';
import { useAsyncLocalStorage } from '@/hooks/useAsyncLocalStorage';
import { useSaveToFavorite } from '@/hooks/useSaveToFavorite';



export default function HomeScreen() {
  const [search, setSearch] = useState<string>('')
  const { data, isLoading, hasNextPage, fetchNextPage } = useGetPokemons()
  const { data: pokemon } = useGetSpecificPokemon(search)
  const { save } = useSaveToFavorite()
  const dataArr = data?.pages?.map(page => page.results).flat()
  const keyExtractor = (poke: any) => {
    return poke.name
  }
  const handleReachEnd = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }

  const RenderItem = ({ item }: {item: { name: string; url: string}}) => {
    
    
    const handleNavigate = () => {
      router.push(`(pokemon)/${item.name}`)
    }
  
    const handleFavorite = () => {
      save(item)
    }
    return (
      <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" onPress={handleNavigate}>{item?.name}</ThemedText>
          <Button title='Favorito' onPress={handleFavorite} />
      </ThemedView>
    )
  }

  return (
    <>
      <TextInput onChangeText={setSearch} value={search} />
      {search && pokemon &&  (
        <RenderItem item={{ name: pokemon.name, url: `${env.pokemonApi}/${search}` }} />
      )}      
      {search == "" && (
        <FlatList
          data={dataArr}
          keyExtractor={keyExtractor}
          renderItem={RenderItem}
          onEndReached={handleReachEnd}
          onEndReachedThreshold={0.5}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
