import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RepositoryItem } from '../../components/RepositoryItem';
import { ModalBottom, ModalBottomRef } from '../../components/ModalBottom';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Button';
import { LoaderView } from '../../components/LoaderView';

import { githubService } from '../../services/githubService';

import {
  Container,
  Header,
  TitleHeader,
  SettingsButton,
  Content,
  InfoText,
  RepositoryList,
  NoDataText,
  ContainerModal,
  TitleModal,
  Form,
  FooterModal,
  ButtonContainer,
} from './styles';

interface GithubRepositoryResponse {
  id: number;
  full_name: string;
  description?: string;
  owner: {
    avatar_url: string;
  },
  stargazers_count: number;
  language?: string;
}

export interface RepositoryData extends GithubRepositoryResponse {
  favoritedRepository: boolean;
}

interface NavigationProps {
  navigate: (screen: string, params?: any) => void;
}

export function Repositories() {
  const [isFetching, setIsFetching] = useState(true);
  const [repositories, setRepositories] = useState<RepositoryData[]>([]);
  const [ownerName, setOwnerName] = useState('');

  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();

  const settingsModalRef= useRef<ModalBottomRef>(null);

  function handleShowSettingsModal() {
    settingsModalRef.current.present();
  }

  function handleNavigateToDetails(data: RepositoryData) {
    navigation.navigate('Details', {
      repositoryData: data,
    });
  }

  async function handleToggleFavoriteRepository(repository: RepositoryData) {
    try {
      let repositoriesUpdated = repositories.map(item => ({
        ...item,
        favoritedRepository: item.id === repository.id ? !item.favoritedRepository : item.favoritedRepository,
      }));
  
      setRepositories(repositoriesUpdated);
      
      const data = await AsyncStorage.getItem('@wefit:repositories_favorites');
      const currentData: RepositoryData[] = data ? JSON.parse(data) : [];
  
      const isRepositoryFavorite = currentData.find(item => item.id === repository.id);
      if(isRepositoryFavorite) {
        const dataFormatted = currentData.filter(item => item.id !== repository.id);
        await AsyncStorage.setItem('@wefit:repositories_favorites', JSON.stringify(dataFormatted));
      } else {
        const dataFormatted = [
          ...currentData,
          repository,
        ];
        await AsyncStorage.setItem('@wefit:repositories_favorites', JSON.stringify(dataFormatted));
      }
    } catch (error) {
      Alert.alert(
        "Erro favoritar repositório",
        "Por favor, tente novamente!"
      );
    }
  }

  function handleSearchRepositoriesByOwner() {
    settingsModalRef.current.dismiss();
    fetchRepositories();
  }

  function handleCloseModal() {
    settingsModalRef.current.dismiss();
  }

  async function fetchRepositories() {
    try {
      if(ownerName.length === 0) {
        return;
      }

      setIsFetching(true);

      const storageResponse = await AsyncStorage.getItem('@wefit:repositories_favorites');
      const repositoriesFavorites: RepositoryData[] = storageResponse ? JSON.parse(storageResponse) : [];

      const response = await githubService.get(`/users/${ownerName}/repos`);
      const data: GithubRepositoryResponse[] = response.data;

      let repositoriesFormatted = data.map((item) => {
        let isFavoriteRepository = repositoriesFavorites.find((repository) => repository.id === item.id);

        return {
          ...item,
          favoritedRepository: isFavoriteRepository ? true : false,
        }
      });

      setRepositories(repositoriesFormatted);
    } catch (error) {
      Alert.alert(
        "Erro ao buscar repositórios",
        "Verifique sua conexão a internet e tente novamente!"
      )
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchRepositories();
  }, []);

  useFocusEffect(useCallback(() => {
    fetchRepositories();
  }, []));

  return (
    <Container>
      <StatusBar
        style="dark"
        translucent
      />

      <Header>
        <TitleHeader>
          WeFit
        </TitleHeader>

        <SettingsButton onPress={handleShowSettingsModal}>
          <MaterialIcons
            name="settings"
            size={24}
            color={theme.colors.text_primary}
          />
        </SettingsButton>
      </Header>

      <Content>
        {isFetching && (
          <LoaderView />
        )}

        {!isFetching && !!ownerName === false && (
          <InfoText>
            Para iniciar, pressione o botão de configurações e insira um nome de usuário existente no Github para listar os repositórios.
          </InfoText>
        )}

        {!isFetching && !!ownerName === true && (
          <RepositoryList
            data={repositories}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <RepositoryItem
                data={item}
                onFavoriteRepository={() => handleToggleFavoriteRepository(item)}
                onPress={() => handleNavigateToDetails(item)}
              />
            )}
            ListEmptyComponent={
              <NoDataText>
                Não foi encontrado nenhum repositórios no Github com o usuário informado.
              </NoDataText>
            }
          />
        )}
      </Content>

      <ModalBottom
        ref={settingsModalRef}
        snapPoints={[RFPercentage(28), RFPercentage(28)]}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
      >
        <ContainerModal>
          <TitleModal>Alterar usuário selecionado</TitleModal>

            <Form>
              <Input
                value={ownerName}
                onChangeText={setOwnerName}
                label="Nome do usuário"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </Form>

          <FooterModal>

            <ButtonContainer>
              <Button
                type="link"
                title="Cancelar"
                color="secondary"
                onPress={handleCloseModal}
              />
            </ButtonContainer>

            <ButtonContainer>
              <Button
                title="Salvar"
                color="secondary"
                onPress={handleSearchRepositoriesByOwner}
              />
            </ButtonContainer>
          </FooterModal>
        </ContainerModal>
      </ModalBottom>
    </Container>
  );
}
