import { css } from 'styled-components';

const styles = css`
  border: 1px solid ${props => props.theme.colorPalette.gray[500]};
  box-sizing: border-box;
  position: relative;
  padding: 6px 8px 8px;
  height: 66px;

  .closeIcon {
    position: absolute;
    right: 6px;
    top: 6px;
  }

  .genderIcon {
    height: 24px;
  }

  .cardInfo {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export default styles;
