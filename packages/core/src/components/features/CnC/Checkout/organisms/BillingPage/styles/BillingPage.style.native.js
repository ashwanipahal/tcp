import styled from 'styled-components/native';

const applyPositionClassStyle = props => {
  const { isPayPalWebViewEnable } = props;
  if (isPayPalWebViewEnable) {
    return `
    top:0px;
    position:absolute;
    padding:0px;
    margin:0px;
    zIndex:990;
    height:100%;
    width:100%;
    `;
  }
  return null;
};

const Container = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  ${applyPositionClassStyle}
`;

export const BillingPageContainer = styled.View`
  ${applyPositionClassStyle}
`;

export default { Container };
