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
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const CardInfo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const CloseIcon = styled.View`
  position: absolute;
  right: 3px;
  top: 3px;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export { CardInfo, BirthdayCardContainer, NameWrapper, CloseIcon };
