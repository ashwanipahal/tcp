import styled, { css } from 'styled-components/native';

const style = css`
  padding-top: 10px;
`;

export const AlternateSizeButton = styled.View`
  flex-direction: row;
  justify-content: center;
  border-top-width: 1px;
  border-bottom-width: 1px;
  padding-top: 13px;
  padding-bottom: 6.5px;
  border-color: ${props => props.theme.colorPalette.gray[500]};
`;

export const AlternateSizeLink = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  flex: 1;
`;

export const AnchorWrapper = styled.View`
  margin-bottom: 6.5px;
  padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XS};
  border-right-width: ${props => (props.noRightBorder ? 0 : '1px')};
  border-right-color: ${props => props.theme.colorPalette.gray[500]};
`;

export default style;
