import styled from 'styled-components';

export default styled.div`
  .miniBagFooter {
    height: 137px;
    text-align: center;
    background-color: ${props => props.theme.colorPalette.gray['300']};
    padding-right: 0;
    padding-left: 0;
    border-bottom: ${props => props.theme.colorPalette.gray['600']};
  }
  .subTotal {
    text-align: center;
    padding: 13px 0 13px 0;
  }
  .checkout-button {
    padding-top: 10px;
  }

  .checkout {
    &:hover {
      background: ${props => props.theme.colors.PRIMARY.BLUE};
    }
    height: 48px;
    margin-left: 10px;
    flex: 1;

    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    @media ${props => props.theme.mediaQuery.smallMax} {
      margin-left: 0;
      width: 220px;
    }
  }
  .payPal-button {
    width: 220px;
  }
`;
