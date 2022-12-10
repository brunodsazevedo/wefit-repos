import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import { RepositoryData } from '.';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: ${getStatusBarHeight() + 16}px 16px 16px;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const TitleHeader = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text_primary};
`;

export const SettingsButton = styled(BorderlessButton)``;

export const Content = styled.View`
  flex: 1;
`;

export const RepositoryList = styled(FlatList as new (props: FlatListProps<RepositoryData>) => FlatList<RepositoryData>).attrs({
  contentContainerStyle: {
    padding: 16,
  }
})``;

export const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text_secondary};
  text-align: center;

  padding: 16px;
`;

export const NoDataText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text_secondary};
  text-align: center;
`;

export const ContainerModal = styled.View`
  padding: 16px 16px ${getBottomSpace() + 16}px;
`;

export const Form = styled.View`
  margin: 10px 0;
`;

export const TitleModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text_primary};
`;

export const FooterModal = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
`;

export const ButtonContainer = styled.View`
  width: 48%;
`;
