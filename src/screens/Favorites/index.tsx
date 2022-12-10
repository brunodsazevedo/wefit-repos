import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RepositoryItem } from '../../components/RepositoryItem';
import { LoaderView } from '../../components/LoaderView';

import {
  Container,
  Header,
  TitleHeader,
  Content,
  RepositoryList,
  NoDataText,
} from './styles';

export interface RepositoryData {
  id: number;
  full_name: string;
  description?: string;
  owner: {
    avatar_url: string;
  },
  stargazers_count: number;
  language?: string;
  favoritedRepository: boolean;
}

interface NavigationProps {
  navigate: (screen: string, params?: any) => void;
}

export function Favorites() {
  const [isFetching, setIsFetching] = useState(true);
  const [repositoriesFavorites, setRepositoriesFavorites] = useState<RepositoryData[]>([]);

  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();

  function handleNavigateToDetails(data: RepositoryData) {
    navigation.navigate('Details', {
      repositoryData: data,
    });
  }

  async function handleRemoveFavoriteRepository(repository: RepositoryData) {
    try {
      const data = await AsyncStorage.getItem('@wefit:repositories_favorites');
      const currentData: RepositoryData[] = data ? JSON.parse(data) : [];
  
      const dataFormatted = currentData.filter(item => item.id !== repository.id);
      await AsyncStorage.setItem('@wefit:repositories_favorites', JSON.stringify(dataFormatted));

      let repositoriesUpdated = repositoriesFavorites.filter((item) => item.id !== repository.id);
      setRepositoriesFavorites(repositoriesUpdated);
    } catch (error) {
      Alert.alert(
        "Erro favoritar repositório",
        "Por favor, tente novamente!"
      );
    }
  }

  async function loadRepositoriesFavorites() {
    try {
      const data = await AsyncStorage.getItem('@wefit:repositories_favorites');
      const repositories: RepositoryData[] = data ? JSON.parse(data) : [];

      let repositoriesFormatted = repositories.map((repository) => ({
        ...repository,
        favoritedRepository: true,
      }));
      
      setRepositoriesFavorites(repositoriesFormatted);
    } catch (error) {
      Alert.alert(
        "Erro ao carregar favoritos",
        "Por favor, tente novamente!"
      );
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    loadRepositoriesFavorites();
  }, []);

  useFocusEffect(useCallback(() => {
    loadRepositoriesFavorites();
  }, []));

  return (
    <Container>
      <StatusBar
        style="dark"
        translucent
      />

      <Header>
        <TitleHeader>WeFit</TitleHeader>
      </Header>

      <Content>
        {isFetching && (
          <LoaderView />
        )}

        {!isFetching && (
          <RepositoryList
            data={repositoriesFavorites}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <RepositoryItem
                data={item}
                onFavoriteRepository={() => handleRemoveFavoriteRepository(item)}
                onPress={() => handleNavigateToDetails(item)}
              />
            )}
            ListEmptyComponent={
              <NoDataText>
                Não há repositórios favoritos a serem listados
              </NoDataText>
            }
          />
        )}
      </Content>
    </Container>
  );
}
