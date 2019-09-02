import { css } from 'styled-components';
import constants from '../../../organism/BirthdaySavingsList/BirthdaySavingsList.constants';

const styles = css`
  border: 1px solid ${props => props.theme.colorPalette.gray[900]};
  box-sizing: border-box;
  position: relative;
  padding: 6px 8px 8px;
  height: ${constants.BIRTHDAY_CARD_HEIGHT};

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
