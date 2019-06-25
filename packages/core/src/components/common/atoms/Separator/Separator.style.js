import { css } from 'styled-components';

const styles = css`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : props.theme.colors.BLACK};
  height: ${props => (props.height ? props.height : '3px')};
  border: none;
  margin-bottom: 40px;
`;

export default styles;
