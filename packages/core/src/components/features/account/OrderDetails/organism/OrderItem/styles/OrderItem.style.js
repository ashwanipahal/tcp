import { css } from 'styled-components';

const styles = css`
  .itemInfo_details {
    display: flex;
    flex-flow: column;
    @media ${props => props.theme.mediaQuery.large} {
      flex-flow: row;
      justify-content: space-between;
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
  .item-preview-details {
    @media ${props => props.theme.mediaQuery.medium} {
      min-height: 115px;
    }
  }
`;

export default styles;
