import { css } from 'styled-components';

const styles = css`
  height: 100%;
  @media ${props => props.theme.mediaQuery.smallMax} {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .pickup-store-details {
    height: 100%;
    padding: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    display: flex;
    flex-direction: 'row';
    border: solid 1px ${props => props.theme.colors.BORDER.NORMAL};
    background-color: ${props => props.theme.colors.WHITE};
    box-sizing: border-box;
  }
  .pickup-store-icon {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    margin-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  }
  .pickup-store-margin {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  @media ${props => props.theme.mediaQuery.mediumOnly} {
    .pickup-store-icon {
      margin-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    }
    .pickup-store-details {
      margin-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    }
  }
`;

export default styles;
