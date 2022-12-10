import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList, FlatListProps } from 'react-native';

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

export const Content = styled.View`
  flex: 1;
`;

export const RepositoryList = styled(FlatList as new (props: FlatListProps<RepositoryData>) => FlatList<RepositoryData>).attrs({
  contentContainerStyle: {
    padding: 16,
  }
})``;

export const NoDataText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text_secondary};
  text-align: center;
`;
