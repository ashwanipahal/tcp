import styled from 'styled-components/native';
import { isAndroid } from '@tcp/core/src/utils/utils.app';

const getAdditionalStyle = props => {
  const { theme, showSearch } = props;
  const headerHeight = showSearch
    ? theme.spacing.LAYOUT_SPACING.LRGS
    : theme.spacing.LAYOUT_SPACING.LRG;

  return {
    ...(isAndroid() && { height: headerHeight }),
  };
};

const getSafeAreaStyle = props => {
  const { theme } = props;
  return `
  background: ${theme.colorPalette.white};
  border-bottom-color: ${theme.colorPalette.gray[500]};
  border-bottom-width: 1;
  `;
};

export const SafeAreaViewStyle = styled.SafeAreaView`
  ${getSafeAreaStyle}
  ${getAdditionalStyle}
`;

export const Container = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const TextConatiner = styled.View`
  margin-bottom: 40px;
`;
