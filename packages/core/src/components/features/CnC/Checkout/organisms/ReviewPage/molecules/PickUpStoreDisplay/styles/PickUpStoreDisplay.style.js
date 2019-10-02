import { css } from 'styled-components';

const styles = css`
  @media ${props => props.theme.mediaQuery.smallMax} {
    margin-top: 16px;
  }
  .pickup-store-details {
    padding: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    display: flex;
    flex-direction: 'row';
    border: solid 1px ${props => props.theme.colors.BORDER.NORMAL};
    background-color: ${props => props.theme.colors.WHITE};
  }
  .pickup-store-icon {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    margin-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  }
  .pickup-store-margin {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
`;

export default styles;
