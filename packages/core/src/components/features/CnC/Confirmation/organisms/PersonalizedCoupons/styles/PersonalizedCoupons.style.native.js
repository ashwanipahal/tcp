import styled from 'styled-components/native';

const ModalTextWrapper = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const CouponSectionWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const SkeletonWrapper = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  width: 200px;
`;

export { ModalTextWrapper, CouponSectionWrapper, SkeletonWrapper };
