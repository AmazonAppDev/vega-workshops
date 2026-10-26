import React, {useRef} from 'react';
import {Text} from 'react-native';

export const RenderBadge = ({
  isFocused: _isFocused,
}: {
  isFocused: boolean;
}) => {
  const count = useRef(0);
  count.current += 1;
  return <Text>({count.current})</Text>;
};
