import styled, { css } from 'styled-components';

const styles = css`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  margin-bottom: ${props => (props.isOutfitPage ? '0' : props.theme.spacing.LAYOUT_SPACING.SM)};
`;

export const RowViewContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

export const SizeViewContainer = styled.View`
  position: relative;
`;

export const UnavailableLink = styled.View`
  flex-direction: row;
  border-top-width: 0;
  border-bottom-width: 1px;
  padding-top: 13px;
  padding-bottom: 13px;
  border-color: ${props => props.theme.colorPalette.gray[500]};
`;

export default styles;
