import styled from 'styled-components/native';

const StyledBodyCopy = styled.View`
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const StyledAnchorWrapper = styled.View`
  justify-content: center;
  flex-direction: row;
`;

const AnchorLeftMargin = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const CouponHeading = styled.View`
  align-items: center;
`;

export { CouponHeading, StyledBodyCopy, StyledAnchorWrapper, AnchorLeftMargin };
