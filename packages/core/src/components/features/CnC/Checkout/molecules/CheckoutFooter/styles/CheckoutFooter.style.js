import { css } from 'styled-components';

const styles = css`
  border-top: 1px solid ${props => props.theme.colors.BLACK};
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding-top: 32px;
  .back-link {
    margin-top: ;
  }
  .back-link-image {
    width: 9px;
    height: 18px;
  }
  .footer-button {
    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    color: ${props => props.theme.colors.WHITE};
  }
`;

export default styles;
