import styled from 'styled-components/native';
import { COUPON_REDEMPTION_TYPE } from '../../../../../../../services/abstractors/CnC/CartItemTile';

const CouponReward = styled.View`
  justify-content: center;
  align-items: center;
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  background-color: ${props =>
    props.type === COUPON_REDEMPTION_TYPE.PLACECASH
      ? props.theme.colorPalette.green[300]
      : props.theme.colorPalette.orange[800]};
`;

export default CouponReward;
