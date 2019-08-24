import styled from 'styled-components/native';

export const BadgeView = styled.View`
  display: flex;
  flex-direction: row;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
`;

export const DefaultBadgeView = styled.View`
  background-color: ${props => props.theme.colorPalette.gray[800]};
  margin-bottom: ${props => (props.noMargin ? 0 : props.theme.spacing.ELEM_SPACING.XS)};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXXS}
    ${props => props.theme.spacing.ELEM_SPACING.XXS};
  border: 1px solid ${props => props.theme.colorPalette.gray[800]};
  border-top-left-radius: ${props => props.theme.spacing.ELEM_SPACING.SM};
  border-bottom-left-radius: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const PrimaryBadgeView = styled.View`
  margin-bottom: ${props => (props.noMargin ? 0 : props.theme.spacing.ELEM_SPACING.XS)};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXXS}
    ${props => props.theme.spacing.ELEM_SPACING.XXS};
  border: 1px solid;
  border-top-left-radius: ${props => props.theme.spacing.ELEM_SPACING.SM};
  border-bottom-left-radius: ${props => props.theme.spacing.ELEM_SPACING.SM};
  background-color: ${props => props.theme.colors.PRIMARY.GRAY};
  border-color: ${props => props.theme.colors.PRIMARY.GRAY};
`;

export default { BadgeView, DefaultBadgeView, PrimaryBadgeView };
