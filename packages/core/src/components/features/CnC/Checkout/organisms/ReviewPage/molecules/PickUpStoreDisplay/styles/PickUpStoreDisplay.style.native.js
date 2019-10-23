import styled from 'styled-components';

const PickupStoreDetails = styled.View`
  padding: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  display: flex;
  flex-direction: row;
  border: solid 1px ${props => props.theme.colors.BORDER.NORMAL};
  background-color: ${props => props.theme.colors.WHITE};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const PickupStoreIcon = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  margin-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
`;
const PickupStoreMargin = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export { PickupStoreDetails, PickupStoreIcon, PickupStoreMargin };
