import styled from 'styled-components/native';

const applyPositionClassStyle = props => {
  if (props.isPayPalWebViewEnable) {
    return `
    top: 0px;
    position: absolute;
    padding:0px;
    margin:0px;
    zIndex:999;
    bottom: 0;
    width:100%;
    `;
  }
  return 'position: relative;';
};

const Container = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  ${applyPositionClassStyle}
`;

export const BillingPageContainer = styled.View`
  ${applyPositionClassStyle}
`;

export default { Container };
