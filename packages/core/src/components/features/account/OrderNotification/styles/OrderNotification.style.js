import { css } from 'styled-components';

const styles = css`
  background-color: ${props => props.theme.colorPalette.black};

  .view-order-link {
    color: ${props => props.theme.colorPalette.white};
  }
  .separator-line {
    border-bottom: solid ${props => (props.separator ? '1px' : '0px')}
      ${props => props.theme.colorPalette.white};
  }
`;

export default styles;
