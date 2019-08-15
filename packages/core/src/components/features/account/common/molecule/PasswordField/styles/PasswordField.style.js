import { css } from 'styled-components';

const styles = css`
  position: relative;

  .rightAlignedContent {
    position: absolute;
    right: 0;
    top: ${props => (props.tooltipContent ? '0' : '12px')};
    width: 30px;

    a {
      display: block;
    }

    .tooltip-bubble {
      li {
        text-align: left;
      }

      @media ${props => props.theme.mediaQuery.medium} {
        min-width: 350px;
      }
    }

    .tooltip-bubble li:before {
      content: '-';
      text-indent: -5px;
    }

    .tooltip {
      width: 10px;
      height: 10px;
    }
  }
`;

export default styles;
