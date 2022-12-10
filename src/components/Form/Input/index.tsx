import React, { useState, useEffect, useRef } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, TextInputProps } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {
  Container,
  Label,
  InputComponent,
} from './styles';

interface Props extends TextInputProps {
  label: string
}

export function Input({ value, onChangeText, label, ...rest }: Props) {
  const [ inputValue, setInputValue ] = useState(value);
  const [ isFocus, setIsFocus ] = useState(false);
  const [ isFilled, setIsFilled ] = useState(false);

  const positionLabel = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 12,
      top: positionLabel.value
    };
  });

  function handleChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    if(event.nativeEvent.text.length > 0) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }
  
  function handleChangeText(event: string) {
    onChangeText(event);
    setInputValue(event);
  }

  useEffect(() => {    
    if((isFocus && isFilled && inputValue.length > 0) || isFocus) {
      positionLabel.value = withTiming(0 , {
        duration: 100,
      });
    } else if(!isFocus && !isFilled && inputValue.length === 0) {
      positionLabel.value = withTiming(15 , {
        duration: 300,
      });
    }

  }, [isFocus, isFilled]);

  return (
    <Container isFocus={isFocus}>
      <Animated.View style={animatedStyles}>
        <Label
          isFocused={isFocus}
          isFilled={isFilled}
        >
          {label}
        </Label>
      </Animated.View>

      <InputComponent
        value={inputValue}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
        {...rest}
      />
    </Container>
  );
}
