import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

import { Button } from '../Button';

import {
  Container,
  HeaderCard,
  TitleCard,
  TitleCardWrapper,
  OwnerName,
  RepositoryName,
  ImageContainer,
  Image,
  ContentCard,
  Description,
  FooterCard,
  ButtonContent,
  TitleButton,
  StarsContainer,
  AmountStars,
  StackRepositoryContainer,
  Dot,
  StackName,
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

interface Props extends TouchableOpacityProps {
  data: RepositoryData;
  onFavoriteRepository: () => void;
  onPress: () => void;
}

export function RepositoryItem({ data, onFavoriteRepository, onPress }: Props) {
  const theme = useTheme();

  const ownerName = data.full_name.split('/')[0];
  const repositoryName = data.full_name.split('/')[1];

  return (
    <Container
      activeOpacity={0.7}
      onPress={onPress}
    >
      <HeaderCard>
        <TitleCardWrapper>
          <OwnerName>
            {`${ownerName}/`}
          </OwnerName>

          <RepositoryName>
            {repositoryName}
          </RepositoryName>
        </TitleCardWrapper>

        <ImageContainer>
          <Image source={{ uri: data.owner.avatar_url }} />
        </ImageContainer>
      </HeaderCard>

      <ContentCard>
        <Description numberOfLines={3}>
          {data.description ?? 'Repositório sem descrição'}
        </Description>
      </ContentCard>

      <FooterCard>
        <Button
          type={data.favoritedRepository
            ? 'outline'
            : 'filled'
          }
          color={data.favoritedRepository
            ? 'shape_secondary'
            : 'primary_light'
          }
          onPress={onFavoriteRepository}
        >
          <ButtonContent>
            <MaterialIcons
              name="star"
              size={20}
              color={data.favoritedRepository
                ? theme.colors.text_primary
                : theme.colors.primary
              }
            />

            <TitleButton isFavorite={data.favoritedRepository}>
              {data.favoritedRepository ? 'Desfavoritar' : 'Favoritar'}
            </TitleButton>
          </ButtonContent>
        </Button>

        <StarsContainer>
          <MaterialIcons
            name="star"
            size={20}
            color={theme.colors.primary}
          />

          <AmountStars>
            {data.stargazers_count}
          </AmountStars>
        </StarsContainer>

        <StackRepositoryContainer>
          <Dot />

          <StackName>
            {data.language ?? 'Sem linguagem'}
          </StackName>
        </StackRepositoryContainer>
      </FooterCard>
    </Container>
  );
}
