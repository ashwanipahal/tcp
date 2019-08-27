import { css } from 'styled-components';
import { buttonPrev, buttonNext } from './CommonStyle';

const commonButtonCss = css`
  top: 50%;
  height: 36px;
  width: 36px;
  font-size: 0;
  border-radius: 50%;
  ::before {
    border-left: 2px solid ${props => props.theme.colors.ANCHOR.GRAYED};
    border-top: 2px solid ${props => props.theme.colors.ANCHOR.GRAYED};
    height: 10px;
    width: 10px;
  }
`;

const styles = css`
  margin-top: 0;
  width: 100%;
  position: relative;

  .button-prev {
    ${buttonPrev}
    ${commonButtonCss}
  }
  .button-next {
    ${buttonNext}
    ${commonButtonCss}
  }
  @media ${props => props.theme.mediaQuery.large} {
    .button-prev {
      display: none;
    }
    .button-next {
      display: none;
    }
  }
`;

export const imageAnchorInheritedStyles = css`
  display: block;
`;

export default styles;
