import { css } from 'styled-components';
import constants from '../../../organism/BirthdaySavingsList/BirthdaySavingsList.constants';

const styles = css`
  .emptyBirthdayCard {
    border: ${props =>
      props.view === constants.VIEW.EDIT ? `1px solid ${props.theme.colorPalette.gray[600]}` : ''};
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: ${constants.BIRTHDAY_CARD_HEIGHT};
  }

  .emptyBirthdayCard__active {
    background-color: ${props => props.theme.colorPalette.gray[500]};
  }
`;

export default styles;
