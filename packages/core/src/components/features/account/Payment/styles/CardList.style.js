import { css } from 'styled-components';

const styles = css`
  .cardList__heading {
    margin-top: 0;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    line-height: 2.8;
  }
  .cardList__col {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  }
  .cardList__ccAddCta {
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};

    @media ${props => props.theme.mediaQuery.smallOnly} {
      width: 65%;
    }
  }
  .giftcardList__col {
    width: 100%;
  }

  .payment__addBtn__cont {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      text-align: center;
    }
  }
`;

export default styles;
