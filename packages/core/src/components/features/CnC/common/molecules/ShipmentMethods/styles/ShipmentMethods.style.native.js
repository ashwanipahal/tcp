import styled from 'styled-components/native';

const ShippingMsgWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const FieldWrapper = styled.View`
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const italicStyle = {
  fontStyle: 'italic'
}

export {
  ShippingMsgWrapper,
  FieldWrapper,
  italicStyle
}
