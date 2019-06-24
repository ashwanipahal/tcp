import styled from 'styled-components';
import themes from '../../../../../../styles/themes/TCP';

export default styled.ul`
  list-style-type: none;
  padding: 0;
  box-sizing: border-box;
  @media ${themes.mediaQuery.large} {
    border-right: ${themes.spacing.ELEMENT_SPACING.XXXS} solid ${themes.colors.FOOTER.DIVIDER};
  }
  li {
    padding: ${themes.spacing.ELEMENT_SPACING.SM} 0;
  }

  & & {
    padding-top: ${themes.spacing.ELEMENT_SPACING.SM};
    border: none;
    li {
      padding-bottom: 0;
      padding-left: ${themes.spacing.ELEMENT_SPACING.LRG};
    }
  }
`;
