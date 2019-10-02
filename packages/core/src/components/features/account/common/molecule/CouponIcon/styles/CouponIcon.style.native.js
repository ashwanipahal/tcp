import styled from 'styled-components/native';
import { COUPON_REDEMPTION_TYPE } from '../../../../../../../services/abstractors/CnC/CartItemTile';

const IconText = styled.View`
  justify-content: center;
  align-items: center;
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  width: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
  padding: ${props => `0 ${props.theme.spacing.ELEM_SPACING.XS}`};
  ${props =>
    props.type === COUPON_REDEMPTION_TYPE.PLACECASH
      ? ` background: ${props.theme.colorPalette.green[300]};`
      : ''};
  ${props =>
    props.type === COUPON_REDEMPTION_TYPE.SAVING
      ? ` background: ${props.theme.colorPalette.purple};`
      : ''};
  ${props =>
    props.type === COUPON_REDEMPTION_TYPE.REWARDS
      ? ` background: ${props.theme.colorPalette.orange[800]};`
      : ''};
`;

export default IconText;
