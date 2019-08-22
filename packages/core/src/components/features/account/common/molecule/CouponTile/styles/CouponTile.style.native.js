import styled from 'styled-components/native';

const CouponTileSection = styled.View`
  flex: 1;
  justify-content: flex-start;
  margin: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
`;

const CouponInfo = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const CouponWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  justify-content: flex-start;
`;

const CouponReward = styled.View`
  justify-content: center;
  align-items: center;
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  width: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
  background-color: ${props => props.theme.colorPalette.orange[800]};
`;

export { CouponTileSection, CouponWrapper, CouponInfo, CouponReward };
