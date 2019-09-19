import styled from 'styled-components/native';
import constants from '../../../organism/BirthdaySavingsList/BirthdaySavingsList.constants';

const BirthdayCardContainer = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[900]};
  padding: 6px ${props => props.theme.spacing.ELEM_SPACING.XS}
    ${props => props.theme.spacing.ELEM_SPACING.XS};
  height: ${constants.BIRTHDAY_CARD_HEIGHT};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
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
