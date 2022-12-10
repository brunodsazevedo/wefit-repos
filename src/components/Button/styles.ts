import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface ButtonContainerProps {
  type: 'filled' | 'outline' | 'link';
  color: string;
}

interface ButtonProps {
  children?: React.ReactNode;
}

interface TitleButtonProps {
  colorTitle: string;
  type: 'filled' | 'outline' | 'link';
} 

export const ButtonContainer = styled.View<ButtonContainerProps>`
  border-radius: 4px;

  background-color: ${({ theme, type, color }) => (
    type === 'filled'
      ? theme.colors[color]
      : 'transparent'
  )};

  ${({ theme, type, color }) => (
    type === 'outline'
    ? css`
      border: 2px;
      border-style: solid;
      border-color: ${theme.colors[color]};
    `
    : type === 'link'
    ? css`
      background-color: transparent;
    `
    : css`
      background-color: ${theme.colors[color]};
    `
  )};
`;

export const ButtonComponent = styled(RectButton)<ButtonProps>`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 12px 16px;

  border-radius: 4px;
`;

export const TitleButton = styled.Text<TitleButtonProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, type, colorTitle }) => (
    type !== 'filled' ? theme.colors[colorTitle] : theme.colors.shape
  )};
`;
