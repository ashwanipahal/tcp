import { css } from 'styled-components/native';

const DamImageStyle = css`
  width: ${props => props.width || '100px'};
  height: ${props => props.height || '100px'};
`;

export default DamImageStyle;
