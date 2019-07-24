import styled, { css } from 'styled-components/native';

const style = css`
  border: 1px solid #9c9c9c;
  background-color: #eeeeee;
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
  background-color: #fff;
  z-index: 999;
  flex-direction: row;
  border: 1px solid #9c9c9c;
  border-top-width: 1px;
`;

const DropDownItemContainer = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const Separator = styled.View`
  background-color: #9c9c9c;
  height: 1px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  flex: 1;
`;

export {
  style,
  HeaderContainer,
  Row,
  OverLayView,
  DropDownItemContainer,
  Separator,
  StyledTouchableOpacity,
};
