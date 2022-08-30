import styled from 'styled-components';

const Wrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const SendAnEmailGiftCardWrapper = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

const PromoLabel = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  justify-content: center;
`;

export { Wrapper, SendAnEmailGiftCardWrapper, PromoLabel };
