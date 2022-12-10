import React, { ReactNode } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  ButtonContainer,
  ButtonComponent,
  TitleButton,
} from './styles';

interface Props extends RectButtonProps {
  title?: string;
  type?: 'filled' | 'outline' | 'link';
  color?: string;
  children?: ReactNode;
}

export function Button({ title, type = 'filled', color = 'primary', children, ...rest }: Props) {
  return (
    <ButtonContainer
      type={type}
      color={color}
    >
      <ButtonComponent
        {...rest}
      >
        {title && (
          <TitleButton
            colorTitle={color}
            type={type}
          >
            {title}
          </TitleButton>
        )}
        {children}
      </ButtonComponent>
    </ButtonContainer>
  );
}
