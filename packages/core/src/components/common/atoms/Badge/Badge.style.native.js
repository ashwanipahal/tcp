import styled, { css } from 'styled-components/native';

import {
  typography as typographyStyleSystem,
  color as colorStyleSystem,
} from '@tcp/core/styles/rwdStyleSystem';

export const BadgeStyles = css`
  ${typographyStyleSystem}
  ${colorStyleSystem}
`;

export const BadgeView = styled.TouchableOpacity`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const DefaultBadgeView = styled.View`
  background-color: ${props => props.theme.colors.TEXT.DARKERGRAY};
  border: 1px solid ${props => props.theme.colors.TEXT.DARKERGRAY};
  color: ${props => props.theme.colors.WHITE};
  margin-bottom: ${props => (props.noMargin ? 0 : props.theme.spacing.ELEM_SPACING.XS)};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXXS}
    ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export default { BadgeStyles, BadgeView, DefaultBadgeView };
