import { css } from 'styled-components';

const style = css`
  ${props => (props.isDisabled ? ` opacity: 0.6; ` : 'opacity: 1')};
`;

export default style;
