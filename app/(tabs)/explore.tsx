import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Button, View } from 'react-native';

import { useGetFavorite } from '@/hooks/useGetFavorites';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSaveToFavorite } from '@/hooks/useSaveToFavorite';

export default function TabTwoScreen() {
  const { data } = useGetFavorite()
  const { save } = useSaveToFavorite()

  const handleFavorite = (item: any) => {
    save(item)
  }

  return (
    <ThemedView style={styles.titleContainer}>
    {data?.map((item: any) => (
      <View key={item.name} style={{
        flexDirection: 'row'
      }}>
        <ThemedText >Nome: {item.name} {item.url} </ThemedText>
        <Button title='REMOVER dos Favorits' onPress={() => handleFavorite(item)}/>
      </View>
      ))}
    
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
  },
});
