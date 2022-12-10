import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import hexOpacity from 'hex-opacity';

interface TitleButtonProps {
  isFavorite: boolean;
}

export const Container = styled(TouchableOpacity)`
  box-shadow: 0 1px 10px ${({ theme }) => hexOpacity.create(theme.colors.shape_secondary, 0.15)};
  border-radius: 4px;

  padding: 12px 16px;

  margin-bottom: 16px;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const HeaderCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 16px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const TitleCardWrapper = styled.View`
  flex-direction: row;
`;

export const OwnerName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text_primary};
`;

export const RepositoryName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text_primary};
`;

export const TitleCard = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text_primary};
`;

export const ImageContainer = styled.View``;

export const Image = styled.Image`
  height: ${RFValue(29)}px;
  width: ${RFValue(29)}px;

  border-radius: 29px;
`;

export const ContentCard = styled.View`
  margin: 16px 0;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text_secondary};
`;

export const FooterCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TitleButton = styled.Text<TitleButtonProps>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, isFavorite }) => (
    isFavorite ? theme.colors.text_primary : theme.colors.primary
  )};
  margin-left: 10px;
`;

export const StarsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AmountStars = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text_secondary};
  margin-left: 10px;
`;

export const StackRepositoryContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Dot = styled.View`
  height: ${RFValue(8)}px;
  width: ${RFValue(8)}px;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.dot};
`;

export const StackName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text_secondary};
  margin-left: 10px;
`;
