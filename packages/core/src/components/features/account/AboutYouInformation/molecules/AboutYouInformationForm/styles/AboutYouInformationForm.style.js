import { css } from 'styled-components';

const styles = css`
  .aboutyou-wrapper {
    width: 72%;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    margin-left: 0px;
  }

  .actions-wrapper {
    justify-content: center;
    margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
  }

  .aboutyou_cancel {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }

  @media ${props => props.theme.mediaQuery.small} {
    .aboutyou_cancel {
      order: 1;
    }

    .aboutyou_save {
      order: 2;
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }

    .aboutyou-radio {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
      margin-left: -10px;
    }

    .aboutyou-checkbox {
      padding: 10px 0;
    }
  }
  @media ${props => props.theme.mediaQuery.smallOnly} {
    .aboutyou-wrapper {
      width: 90%;
    }

    .aboutyou_save {
      order: 1;
      margin-left: 0;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }

    .aboutyou-radio {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
      margin-left: -10px;
    }

    .aboutyou-checkbox {
      padding: 10px 0;
    }
  }
  @media ${props => props.theme.mediaQuery.smallOnly} {
    .aboutyou-wrapper {
      width: 90%;
    }

    .aboutyou_cancel {
      order: 1;
      margin-left: 0;
    }
    .actions-wrapper {
      justify-content: center;
      margin-left: 0;
    }
  }
`;
export default styles;
