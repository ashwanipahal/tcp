import styled from 'styled-components/native';

const PanelContainer = styled.View`
  overflow: hidden;
  flex: 1;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  height: 50px;
  align-items: center;
`;

const TouchableHeader = styled.TouchableHighlight.attrs({
  underlayColor: props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS,
})`
  flex: 1;
  justify-content: center;
  height: 50px;
`;

const PanelBody = styled.View`
  overflow: hidden;
  flex: 1;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export { PanelContainer, TitleContainer, TouchableHeader, PanelBody };
