import styled, { css } from 'styled-components/native';

const style = css`
  border: 1px solid ${props => props.theme.colors.BUTTON.WHITE.BORDER};
  background-color: ${props => props.theme.colorPalette.gray[500]};
  height: 42px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const HeaderContainer = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const OverLayView = styled.View`
  position: absolute;
  z-index: 999;
  flex-direction: row;
  border: 1px solid ${props => props.theme.colors.BUTTON.WHITE.BORDER};
  border-top-width: 1px;
`;

const DropDownItemContainer = styled.TouchableHighlight.attrs({
  underlayColor: props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS,
})`
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.XL};
  background-color: ${props => props.theme.colors.WHITE};
`;

const Separator = styled.View`
  background-color: ${props => props.theme.colors.BUTTON.WHITE.BORDER};
  height: 1px;
`;

export { style, HeaderContainer, Row, OverLayView, DropDownItemContainer, Separator };
