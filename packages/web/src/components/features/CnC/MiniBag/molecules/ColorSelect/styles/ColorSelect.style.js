import { css } from 'styled-components';

const styles = css`
  width: 87px;
  & img {
    width: 10px;
  }
`;

export const customSelectTile = css`
  .customSelectTitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    margin-top: 0;
  }
  font-size: ${props => props.theme.typography.fontSizes.fs10};
  font-weight: ${props => props.theme.fonts.fontWeight.bold};
`;

export default styles;
