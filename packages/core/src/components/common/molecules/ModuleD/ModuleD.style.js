import { css } from 'styled-components';

export default css`
  border: 1px solid ${props => props.theme.colors.BUTTON.BORDER};

  a {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.fonts.fontSize.nav}px;
    color: ${props => props.theme.colors.TEXT.DARKGRAY};
    cursor: pointer;
    margin-top: 10px;
    display: block;
    text-align: center;
  }

  button {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    text-transform: uppercase;
    font-size: ${props => props.theme.fonts.fontSize.heading.small.h6}px;
    border: 1px solid ${props => props.theme.colors.BUTTON.BORDER};
    color: ${props => props.theme.colors.TEXT.DARKGRAY};
    padding: 19px 80px;
    text-align: center;
    margin: 60px auto;
  }

  h2 {
    font-family: ${props => props.theme.fonts.primaryFontBlackFamily};
    font-weight: ${props => props.theme.fonts.fontWeight.black};
    text-transform: uppercase;
    font-size: ${props => props.theme.fonts.fontSize.heading.small.h1}px;
    text-align: center;
  }

  img {
    width: 100%;
  }

  .moduleD__image-container:nth-child(even) {
    @media ${props => props.theme.mediaQuery.mediumMax} {
      padding-right: 0;
    }
  }
`;
