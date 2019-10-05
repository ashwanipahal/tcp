import styled, { css } from 'styled-components';
import { getScreenWidth } from '../../../../utils/index.native';

const styles = css`
  margin: -${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS} 0px ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  justify-content: center;
`;

export const TouchableOpacityContainer = styled.TouchableOpacity`
  border-radius: 15px;
  background: ${props => props.theme.colorPalette.gray[300]};
  height: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${getScreenWidth() - 29};
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export default styles;
