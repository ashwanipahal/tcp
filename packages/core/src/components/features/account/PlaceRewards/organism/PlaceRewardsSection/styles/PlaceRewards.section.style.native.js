import styled, { css } from 'styled-components/native';

const ParentContainer = css`
  margin-bottom: 120px;
`;

const StyledHeading = styled.Text`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.SM};
`;
const UnderlineStyle = styled.View`
  height: 3px;
  background-color: ${props => props.theme.colorPalette.black};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const StyledView = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const StyledViewLargeMargin = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

export { ParentContainer, StyledHeading, UnderlineStyle, StyledView, StyledViewLargeMargin };
