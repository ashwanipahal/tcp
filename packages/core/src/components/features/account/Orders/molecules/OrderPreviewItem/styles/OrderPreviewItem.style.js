import { css } from 'styled-components';

const styles = css`
  .product-spacing {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
  .quantity-spacing {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
      font-weight: ${props => props.theme.typography.fontWeights.regular};
    }
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
      font-weight: ${props => props.theme.typography.fontWeights.regular};
    }
  }
  .status-spacing {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    @media ${props => props.theme.mediaQuery.medium} {
      font-weight: ${props => props.theme.typography.fontWeights.regular};
    }
    @media ${props => props.theme.mediaQuery.large} {
      font-weight: ${props => props.theme.typography.fontWeights.regular};
    }
  }
  .image-sizing {
    width: 103px;
    @media ${props => props.theme.mediaQuery.large} {
      width: 90px;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      width: 162px;
    }
  }
  .product-name {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    }
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    }
  }

  .row-stlyler {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .itemInfo_details {
    display: flex;
    flex-flow: column;
    @media ${props => props.theme.mediaQuery.large} {
      flex-flow: row;
      justify-content: space-between;
    }
  }
  .brand-image {
    width: 64px;
    height: 22px;
  }
  .itemInfo_details_items {
    display: flex;
    flex-flow: row;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    @media ${props => props.theme.mediaQuery.large} {
      flex-flow: column;
      margin-bottom: 0;
    }
  }

  .itemInfo_details_items_leftMargin {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    @media ${props => props.theme.mediaQuery.large} {
      margin-left: 0;
    }
  }
`;

export default styles;
