import { css } from 'styled-components';

const styles = css`
  .list-fontsizes {
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    @media ${props => props.theme.mediaQuery.medium} {
      font-size: ${props => props.theme.typography.fontSizes.fs16};
    }
    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs16};
    }
  }
`;

export default styles;
