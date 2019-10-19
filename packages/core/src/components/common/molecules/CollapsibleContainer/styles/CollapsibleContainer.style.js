import { css } from 'styled-components';

const styles = css`
  position: relative;

  .collapsible-header {
    height: 50px;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    box-sizing: border-box;
    width: 100%;
    border: none;
    background: none;
    display: ${props => (props.isDefaultView ? 'none' : 'block')};
    ${props =>
      props.showHeaderAlways
        ? css`
            height: auto;
            display: block;
            padding: 0;
          `
        : css`
            @media ${props.theme.mediaQuery.medium} {
              display: none;
            }
          `};
  }

  .collapsible-icon {
    position: absolute;
    right: 0;
    display: none;
    top: 30px;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: ${props => (props.showHeaderAlways && props.isDefaultView ? 'none' : 'block')};
    }
  }

  .item-opened {
    display: block;
  }

  .item-closed {
    display: ${props => (props.isDefaultView ? 'block' : 'none')};
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
    }
  }
`;

export default styles;
