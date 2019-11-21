import { css } from 'styled-components';

const styles = css``;

export const customHeaderStyle = css`
  .Modal_Heading {
    border-bottom: none;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    font-size: ${props => props.theme.typography.fontSizes.fs22};
    display: none;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
    }
  }

  .color-chips-selector {
    &-container {
      margin-bottom: 25px;
    }
    &-title,
    &-title-name {
      font-size: ${props => props.theme.fonts.fontSize.listmenu.large}px;
      font-weight: ${props => props.theme.fonts.fontWeight.black};
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      color: ${props => props.theme.colors.PRIMARY.DARK};
    }
    &-title-name {
      font-weight: normal;
      margin-left: 6px;
    }
  }
`;

export default styles;
