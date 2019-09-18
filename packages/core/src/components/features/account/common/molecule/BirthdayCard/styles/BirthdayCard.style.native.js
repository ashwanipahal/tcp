import styled from 'styled-components/native';
import constants from '../../../organism/BirthdaySavingsList/BirthdaySavingsList.constants';

const BirthdayCardContainer = styled.View`
  display: flex;
  border: 1px solid ${props => props.theme.colorPalette.gray[900]};
  position: relative;
  padding: 6px 8px 8px;
  height: ${constants.BIRTHDAY_CARD_HEIGHT};
`;

const NameWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const CardInfo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export { CardInfo, BirthdayCardContainer, NameWrapper };
