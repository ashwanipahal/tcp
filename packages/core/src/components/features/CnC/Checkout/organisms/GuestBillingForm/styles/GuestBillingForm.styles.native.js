import styled from 'styled-components/native';

const GuestBillingFormWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
`;

const applyPositionClassStyle = props => {
  if (props.isPayPalWebViewEnable) {
    return `
    top: 0px;
    position: absolute;
    `;
  }
  return 'position: relative;';
};

export const GuestBillingConatiner = styled.View`
  ${applyPositionClassStyle}
`;

export default GuestBillingFormWrapper;
