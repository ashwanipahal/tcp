import styled from 'styled-components/native';

export const TimingsList = styled.View`
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const TimingsItem = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const StoreHoursTitle = styled.Text`
  font-size: ${props => props.theme.fonts.fontSize.body.small.secondary};
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-weight: ${props => props.theme.fonts.fontWeight.black};
  color: ${props => props.theme.colors.TEXT.DARK};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  text-align: ${props => props.textAlign || 'center'};
`;

export const TimingsText = styled.Text`
  font-size: ${props => props.theme.fonts.fontSize.body.small.secondary};
  font-weight: ${props => props.theme.fonts.fontWeight.normal};
  color: ${props => props.theme.colors.TEXT.DARK};
  text-align: ${props => props.textAlign || 'left'};
  flex: 1;
  ${props => (props.textAlign === 'left' ? `text-transform: capitalize;` : '')}
`;

export default styled.View`
  width: 100%;
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;
