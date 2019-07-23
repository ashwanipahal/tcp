import styled, { css } from 'styled-components/native';

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
`;

const HeaderText = styled(StyledText)`
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
  border-top-width: 0px;
`;

const DropDownItem = styled(StyledText)`
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.XL};
  text-align: center;
`;

const Separator = styled.View`
  background-color: #9c9c9c;
  height: 1px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  flex: 1;
`;

export { style, HeaderText, Row, OverLayView, DropDownItem, Separator, StyledTouchableOpacity };
