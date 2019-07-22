import { css } from 'styled-components';

export default css`
  .moduleL__mobile-web-container {
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
  .moduleL__tile {
    background-color: ${props => props.theme.colorPalette.gray['300']};
    display: flex;
    flex-direction: row;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    text-align: left;

    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
  .moduleL__tile-image {
    max-width: 103px;

    @media ${props => props.theme.mediaQuery.medium} {
      max-width: 180px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      max-width: 210px;
    }
  }
  .moduleL__tile-text {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
  .moduleL__tile-title {
    font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy6}px;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }

    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy10}px;
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }

    @media ${props => props.theme.mediaQuery.xlarge} {
      margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
    }
  }
  .moduleL__tile-link {
    color: ${props => props.theme.colorPalette.gray['900']};
    font-size: ${props => props.theme.fonts.fontSize.anchor.large}px;
  }
`;
