import { css } from 'styled-components';

const styles = css`
  .itemInfo_details {
    display: flex;
    flex-flow: column;
    @media ${props => props.theme.mediaQuery.large} {
      flex-flow: row;
      justify-content: space-between;
      max-width: ${props => (props.isShowWriteReview ? '432px' : '305px')};
    }
  }
  .product-name {
    @media ${props => props.theme.mediaQuery.medium} {
      max-width: 231px;
    }
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
