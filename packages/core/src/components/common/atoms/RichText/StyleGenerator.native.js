import styled from 'styled-components/native';
import { View } from 'react-native';

export const getStyledViewComponent = (StyledStrings, className) => {
  if (!StyledStrings[className]) {
    return View;
  }

  const rules = StyledStrings[className].split(';');

  return styled.View`
    color: red;
    ${rules.map(rule => `${rule};`)}
  `;
};
