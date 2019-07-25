import styled, { css } from 'styled-components/native';

const style = css`
  height: ${props => props.height};
  ${props =>
    props.variation === 'primary'
      ? `border: 1px solid ${props.theme.colors.BUTTON.WHITE.BORDER}`
      : `border-bottom-width: 1px; border-bottom-color: ${props.theme.colors.BUTTON.WHITE.BORDER}`};
  background-color: ${props =>
    props.variation === 'primary'
      ? props.theme.colorPalette.gray[500]
      : props.theme.colorPalette.white};
`;

const HeaderContainer = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  ${props =>
    props.variation === 'primary' ? 'justify-content: center' : 'justify-content:space-between'};
  align-items: center;
  padding: ${props => (props.variation === 'primary' ? '0' : '0 5px')};
`;

const OverLayView = styled.View`
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
