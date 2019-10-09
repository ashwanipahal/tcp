import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components';

const Screen = Dimensions.get('window');
const ScreenHeight = Screen.height;

const getAdditionalStyle = props => {
  const { margins, padding } = props;
  return {
    ...(margins && { margin: margins }),
    ...(padding && { padding }),
  };
};

const PageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  height: ${ScreenHeight - 150};
`;

const Container = styled.View`
  ${getAdditionalStyle}
`;

const styles = css``;

export { styles, PageContainer, Container };
