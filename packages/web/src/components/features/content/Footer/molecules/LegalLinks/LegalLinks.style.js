import { css } from 'styled-components';

export default css`
  font-size: 12px;
  font-family: ${props => props.theme.fonts.secondaryFontFamily};
  color: ${props => props.theme.colors.TEXT.DARKERGRAY};
  list-style-type: none;
  margin: 0;
  padding: 16px 0 0 0;
  border-top: 2px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};

  li {
    padding: 0 0 16px 0;
  }

  a {
    color: ${props => props.theme.colors.PRIMARY.GRAY};
  }

  a:hover {
    color: ${props => props.theme.colors.PRIMARY.BLUE};
    cursor: pointer;
  }

  @media ${props => props.theme.mediaQuery.large} {
    padding: 24px 0 12px;
    display: flex;
    border-top: 0;

    li {
      padding: 0 20px;
      border-left: 1px solid ${props => props.theme.colors.TEXT.DARKERGRAY};
    }

    li:first-child {
      border-left: none;
    }

    a {
      color: ${props => props.theme.colors.TEXT.DARKERGRAY};
    }
  }
`;
