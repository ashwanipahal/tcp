import { css } from 'styled-components/native';

const DamImageStyle = css`
  width: ${props => props.width || '100px'};
  height: ${props => props.height || '100px'};
  .img-placeholder {
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '100%'};
  }
`;

export default DamImageStyle;
