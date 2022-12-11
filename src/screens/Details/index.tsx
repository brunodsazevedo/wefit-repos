import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../../components/Button';

import {
  Container,
  Header,
  BackButtonContainer,
  BackButton,
  TitleWrapper,
  OwnerName,
  RepositoryName,
  TitleHeader,
  Content,
  DetailsContainer,
  Title,
  Description,
  StackContainer,
  Dot,
  StackName,
  Footer,
  ButtonContainer,
  TextLinkButton,
  TextButton,
} from './styles';

interface NavigationProps {
  goBack: () => void;
}

interface RepositoryData {
  id: number;
  full_name: string;
  description?: string;
  owner: {
    avatar_url: string;
  },
  stargazers_count: number;
  language?: string;
  html_url: string;
  favoritedRepository: boolean;
}

interface Params {
  repositoryData: RepositoryData;
}

export function Details() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();

  const { repositoryData } = route.params as Params;

  const ownerName = repositoryData.full_name.split('/')[0];
  const repositoryName = repositoryData.full_name.split('/')[1];

  const [isFavorite, setIsFavorite] = useState(repositoryData.favoritedRepository);

  function handleBack() {
    navigation.goBack();
  }

  async function handleOpenRepositoryWeb() {
    await Linking.openURL(repositoryData.html_url);
  }

  async function handleToggleFavoriteRepository() {
    try {
      setIsFavorite(!isFavorite);
      
      const data = await AsyncStorage.getItem('@wefit:repositories_favorites');
      const currentData: RepositoryData[] = data ? JSON.parse(data) : [];
  
      const isRepositoryFavorite = currentData.find(item => item.id === repositoryData.id);
      if(isRepositoryFavorite) {
        const dataFormatted = currentData.filter(item => item.id !== repositoryData.id);
        await AsyncStorage.setItem('@wefit:repositories_favorites', JSON.stringify(dataFormatted));
      } else {
        const dataFormatted = [
          ...currentData,
          repositoryData,
        ];
        await AsyncStorage.setItem('@wefit:repositories_favorites', JSON.stringify(dataFormatted));
      }
    } catch (error) {
      
    }
  }

  return (
    <Container>
      <StatusBar
        style="light"
        translucent
      />

      <Header>
        <BackButtonContainer>
          <BackButton onPress={handleBack}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={theme.colors.shape}
            />
          </BackButton>
        </BackButtonContainer>

        <TitleHeader>Detalhes</TitleHeader>
      </Header>

      <Content>
        <DetailsContainer>

          <TitleWrapper>
            <OwnerName>{`${ownerName}/`}</OwnerName>

            <RepositoryName>{repositoryName}</RepositoryName>
          </TitleWrapper>

          <Description>
            {repositoryData.description ?? 'Não há descrição nesse repositório'}
          </Description>

          <StackContainer>
            <Dot />

            <StackName>
              {repositoryData.language ?? 'Nenhuma linguagem identificada'}
            </StackName>
          </StackContainer>
        </DetailsContainer>

      </Content>

      <Footer>
        <ButtonContainer>
          <Button
            type="link"
            onPress={handleOpenRepositoryWeb}
          >
            <TextLinkButton>Ver repositório</TextLinkButton>

            <MaterialIcons
              name="link"
              size={24}
              color={theme.colors.secondary}
            />
          </Button>
        </ButtonContainer>

        <Button
          type={isFavorite
            ? 'outline'
            : 'filled'
          }
          color={isFavorite
            ? 'shape_secondary'
            : 'primary'
          }
          onPress={handleToggleFavoriteRepository}
        >
          <TextButton>
            {isFavorite ? 'Desfavoritar' : 'Favoritar'}
          </TextButton>

          <MaterialIcons
            name="star"
            size={24}
            color={theme.colors.text_primary}
          />
        </Button>
      </Footer>
    </Container>
  );
}
