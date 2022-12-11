import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;

  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;

  padding: ${getStatusBarHeight() + 16}px 16px 16px;

  background-color: ${({ theme }) => theme.colors.shape_secondary};
`;

export const BackButtonContainer = styled.View`
  margin-right: 16px;
`;

export const BackButton = styled(BorderlessButton)``;

export const TitleHeader = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled.View`
  flex: 1;
`;

export const DetailsContainer = styled.View`
  padding: 16px;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text_primary};
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
`;

export const OwnerName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text_primary};
`;

export const RepositoryName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text_primary};
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text_secondary};

  margin: 16px 0;
`;

export const StackContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Dot = styled.View`
  height: 12px;
  width: 12px;

  border-radius: 12px;

  margin-right: 8px;

  background-color: ${({ theme }) => theme.colors.dot};
`;

export const StackName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_secondary};
`;

export const Footer = styled.View`
  padding: 16px 16px ${getBottomSpace() + 16}px;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const ButtonContainer = styled.View`
  margin-bottom: 10px;
`;

export const TextLinkButton = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.secondary};

  text-transform: uppercase;

  margin-right: 10px;
`;

export const TextButton = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text_primary};

  text-transform: uppercase;

  margin-right: 10px;
`;
