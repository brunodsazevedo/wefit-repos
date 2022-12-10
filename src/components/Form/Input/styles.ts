import styled from 'styled-components/native';
import hexOpacity from 'hex-opacity';
import { RFValue } from 'react-native-responsive-fontsize';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

interface ContainerProps {
  isFocus: boolean;
}

interface LabelProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  height: 56px;
  width: 100%;

  justify-content: flex-end;

  padding: 10px 12px;

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, isFocus }) => (
    isFocus ? theme.colors.shape_secondary : theme.colors.border
  )};

  background-color: ${({ theme }) => hexOpacity.create(theme.colors.shape_secondary, 0.06)};
`;

export const Label = styled.Text<LabelProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ isFocused, isFilled }) => (
    isFilled || isFocused ? `${RFValue(10)}px` : `${RFValue(12)}px`
  )};
  color: ${({ theme, isFocused }) => (
    isFocused ? theme.colors.text_primary : theme.colors.text_secondary
  )};
`;

export const InputComponent = styled(BottomSheetTextInput)`
  flex: 1;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text_primary};

  padding: 10px 0 0;
`;
