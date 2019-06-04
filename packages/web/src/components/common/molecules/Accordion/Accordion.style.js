import { createGlobalStyle } from 'styled-components';
import theme from '@tcp/web/Styles/themes/primary';

const GlobalCss = createGlobalStyle`

.Collapsible__trigger{
    padding: 18px;  
    display: block;
    cursor: pointer;
    font-family: ${theme.fonts.secondaryFontFamily};
    font-size: ${theme.fonts.fontSize.body.large.secondary}px;
    background-color: ${theme.colors.PRIMARY.LIGHTGRAY};    
}
.Collapsible__trigger.is-open{
    background-color: ${theme.colors.PRIMARY.LIGHTGRAY};
    transition: background 0.5s fade;
}
.Collapsible__trigger.is-open:after{
    content: '-';
    float: right;
    font-weight: bold;
    font-size: ${theme.fonts.fontSize.heading.large.h6}px    
}

.Collapsible__trigger.is-closed{
    background-color: ${theme.colors.PRIMARY.PALEGRAY};
}

.Collapsible__trigger.is-closed:after{
    content: '+';
    float: right;
    font-weight: bold;
    font-size: ${theme.fonts.fontSize.heading.large.h6}px
}
.Collapsible__contentInner{
    padding: 0 28px;
    background: ${theme.colors.WHITE};
    font-family: ${theme.fonts.secondaryFontFamily};

}
.Collapsible__contentInner > p a{
    font-family: ${theme.fonts.secondaryFontFamily};
    font-size: ${theme.fonts.fontSize.body.large.secondary}px;
    text-decoration: none;
    color: ${theme.colors.BLACK};
    display: block;
    padding-bottom: 17px;
    padding-top: 18px;

}`;

export default GlobalCss;
