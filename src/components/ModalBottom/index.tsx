import React, { forwardRef } from 'react';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetModal as ModalBottomRef,
  BottomSheetModalProps,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';

import { Backdrop } from './Backdrop';

interface Props extends BottomSheetModalProps {}

export type ModalBottomProps = Props;

const ModalBottom = forwardRef<ModalBottomRef, Props>(( {children,...rest}: Props, ref ) => {
  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={Backdrop}
      {...rest}
    >
      { children }
    </BottomSheetModal>
  );
});

export { BottomSheetModalProvider, ModalBottom, ModalBottomRef, useBottomSheetModal };
