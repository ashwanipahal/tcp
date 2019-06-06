import theme from '@tcp/web/Styles/themes/primary';
import { css } from 'styled-components';

const GlobalCss = css`
.accordion > div{
    padding: 0 28px;
    background: ${theme.colors.WHITE};
    font-family: ${theme.fonts.secondaryFontFamily};
    display: block;
    padding-bottom: 17px;
    padding-top: 18px;
    font-family: ${theme.fonts.secondaryFontFamily};
    font-size: ${theme.fonts.fontSize.body.large.secondary}px;

}
.accordion > a{
    font-family: ${theme.fonts.secondaryFontFamily};
    font-size: ${theme.fonts.fontSize.body.large.secondary}px;
    text-decoration: none;
    color: ${theme.colors.BLACK};
    

}
.head-icon {
    cursor: pointer;
    border: none;
  }

  .head {
    padding: 18px;  
    display: block;
    cursor: pointer;
    font-family: ${theme.fonts.secondaryFontFamily};
    font-size: ${theme.fonts.fontSize.body.large.secondary}px;
    background-color: ${theme.colors.PRIMARY.LIGHTGRAY};    
  }

  .head.active{
    background-color: ${theme.colors.PRIMARY.PALEGRAY};
    transition: background 0.5s fade;
  }

  .active::after {
    content: '+';
    float: right;
    font-weight: bold;
    font-size: ${theme.fonts.fontSize.heading.large.h6}px
    top: 9px;
  }

  .inactive::after {
    content: '+';
    float: right;
    font-weight: bold;
    font-size: ${theme.fonts.fontSize.heading.large.h6}px
  }
`;

export default GlobalCss;
