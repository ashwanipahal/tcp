import { css } from 'styled-components';

const styles = css`
  border: ${props => props.view === 'edit' ? `1px solid ${props.theme.colorPalette.gray[500]}` : ''};
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 66px;
`;

export default styles;
