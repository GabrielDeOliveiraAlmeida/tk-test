import { Image, StyleSheet, Platform, FlatList, TextInput, TextInputChangeEventData, TextInputProps, NativeSyntheticEvent, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGetPokemons } from '@/hooks/useGetPokemons';
import { useState } from 'react';
import { useGetSpecificPokemon } from '@/hooks/useGetSpecificPokemon';
import { env } from '@/config/env';
import { Link, useLocalSearchParams, usePathname, useSegments } from 'expo-router';
import { useGetEvolution } from '@/hooks/useGetEvolution';


export default function HomeScreen() {
  const { id } = useLocalSearchParams();
  const { data } = useGetSpecificPokemon(id as string)
  const {  data: evolutionData, isLoading } = useGetEvolution(data?.id)
  return (
    <>
        {data && (
          <View>
          Nome: {data.name}
          Peso: {data.weight}
          Altura: {data.height}
          Tipos: {data.types?.map((type) => type.name)}
          Habilidade: {data.abilities?.map(item => item.ability.name)}
          Categoria????
          
          </View>
          )}
          <View>Evolução (Pode por pra abrir o detalhes dele)</View>
          {isLoading && "Loading..."}
          {evolutionData && evolutionData.chain && evolutionData.chain?.evolves_to.length && (
            evolutionData.chain?.evolves_to.map((item) => {
              return (
                <View>
                  
                  <View>{item?.species?.name}</View>
                  
                  </View>
              )
            })
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
