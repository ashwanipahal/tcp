import styled, { css } from 'styled-components/native';

const PanelContainer = styled.View`
  overflow: hidden;
  flex: 1;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  height: 50px;
`;

const TouchableHeader = styled.TouchableHighlight.attrs({
  underlayColor: props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS,
})`
  flex: 1;
  justify-content: center;
`;

const PanelBody = styled.View`
  overflow: hidden;
  flex: 1;
  padding: 10px;
`;

const CarrotImage = css`
  margin-top: 5px;
  justify-content: center;
`;

export { PanelContainer, TitleContainer, TouchableHeader, PanelBody, CarrotImage };
