import styled, { css } from 'styled-components';

const style = css`
  border: 1px solid #9c9c9c;
  background-color: #eeeeee;
  height: 42px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const StyledText = styled.Text`
  color: ${props => props.theme.colorPalette.gray[800]};
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-size: ${props => props.theme.typography.fontSizes.fs13};
  font-weight: ${props => props.theme.typography.fontWeights.black};
  font-style: normal;
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const OverLayView = styled.View`
  position: absolute;
  top: 42px;
  background-color: #eeeeee;
  z-index: 999;
`;

export { style, StyledText, Row, OverLayView };
