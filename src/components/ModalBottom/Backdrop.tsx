import React from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

const Backdrop = ({ ...rest }: BottomSheetBackdropProps) => {

  return (
    <BottomSheetBackdrop
      opacity={0.7}
      disappearsOnIndex={-1}
      {...rest}
    />
  );
};

export { Backdrop };
