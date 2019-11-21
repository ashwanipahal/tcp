import styled from 'styled-components/native';

export const Container = styled.View`
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.XXS} 0;
`;
export const RichTextContainer = styled.View`
  width: 100%;
  min-height: 100px;
`;
export const CashBannerWrapper = styled.View`
  background-color: ${props => props.theme.colorPalette.gray[500]};
  margin: ${props => props.theme.spacing.ELEM_SPACING.XXL} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
`;

export const BorderWrapper = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[500]};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;
export default { Container, RichTextContainer, CashBannerWrapper, BorderWrapper };
