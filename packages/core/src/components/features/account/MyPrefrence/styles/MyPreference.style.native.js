import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';

const MyPrefContainer = css`
  margin-bottom: ${Platform.OS === 'ios' ? '100px' : '50px'};
`;

const UnderlineStyle = styled.View`
  height: 3px;
  background-color: ${props => props.theme.colorPalette.black};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

export { MyPrefContainer, UnderlineStyle };
