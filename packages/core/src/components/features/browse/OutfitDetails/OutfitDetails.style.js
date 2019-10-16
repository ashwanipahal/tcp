import { css } from 'styled-components';

export default css`
  .outfiting-list-details {
    margin-right: 0;
    margin-left: 0;
    width: 100%;
  }

  .outfiting-list-container {
    @media ${props => props.theme.mediaQuery.large} {
      position: relative;
    }
  }

  .outfit-image {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  .outfit-line-break {
    width: 100%;
    border-color: ${props => props.theme.colorPalette.gray[500]};
    border-top: 0;

    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }

  li {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
  }
`;
