import { css } from 'styled-components';
import constants from '../../../organism/BirthdaySavingsList/BirthdaySavingsList.constants';

const styles = css`
  border: 1px solid ${props => props.theme.colorPalette.gray[900]};
  box-sizing: border-box;
  position: relative;
  padding: 6px 8px 8px;
  height: ${constants.BIRTHDAY_CARD_HEIGHT};

  .closeIcon {
    cursor: pointer;
    position: absolute;
    right: 12px;
    top: 12px;
  }

  .genderIcon {
    height: 24px;
  }

  .cardInfo {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .text-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default styles;
