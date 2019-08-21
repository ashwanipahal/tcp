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
`;

const ModalHeading = styled.Text`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

const ModalViewWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
`;

const LineWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export {
  ParentContainer,
  StyledHeading,
  UnderlineStyle,
  ModalHeading,
  ModalViewWrapper,
  LineWrapper,
};
