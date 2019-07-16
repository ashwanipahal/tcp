import { css } from 'styled-components';

const deleteCreditCardModalStyle = css`

.CreditCardHeading{
  margin-top: 20px;
}


.CreditCardInfo{
  margin-top: 20px;
}
.CreditCardAddress{
  margin-left: 50px;
  margin-top: 15px;
  @media ${props => props.theme.mediaQuery.medium} {
    width: 100%;
    text-align: center;
  }
}
`;

export default deleteCreditCardModalStyle;
