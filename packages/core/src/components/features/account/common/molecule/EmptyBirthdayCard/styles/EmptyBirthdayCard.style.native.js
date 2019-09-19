import styled from 'styled-components/native';
import constants from '../../../organism/BirthdaySavingsList/BirthdaySavingsList.constants';

const EmptyContainer = styled.View`
  border: ${props =>
    props.view === constants.VIEW.EDIT ? `1px solid ${props.theme.colorPalette.gray[600]}` : ''};
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: ${constants.BIRTHDAY_CARD_HEIGHT};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export { EmptyContainer, Row };
