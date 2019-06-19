import styled from 'styled-components';
import themes from '../../../../../../styles/themes/TCP';

export default styled.ul`
  list-style-type: none;
  padding: 0;
  box-sizing: border-box;
  border-right: 1px solid ${themes.colors.FOOTER.DIVIDER};
  li {
    padding: 12px 0;

    a {
      text-decoration: none;
      font-size: ${themes.fonts.fontSize.listmenu.large}px;
      color: ${themes.colors.PRIMARY.GRAY};
    }

    a.selected {
      color: ${themes.colors.PRIMARY.DARK};
      font-weight: ${themes.fonts.fontWeight.bold};
    }
  }

  & & {
    padding-top: 12px;
    li {
      padding-bottom: 0;
      padding-left: 25px;
    }
    border: none;
  }
`;
