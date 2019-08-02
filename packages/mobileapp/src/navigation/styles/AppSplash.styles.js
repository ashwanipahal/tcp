import { css } from 'styled-components/native';

const SplashStyles = css`
  position: absolute;
  align-items: center;
  justify-content: center;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  ${props =>
    `background-color: ${props.theme.colors.WHITE}
     padding-top: ${props.theme.spacing.LAYOUT_SPACING.SM};
  `};
`;

export default SplashStyles;
