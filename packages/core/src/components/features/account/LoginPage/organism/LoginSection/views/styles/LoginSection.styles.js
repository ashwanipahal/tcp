import { css } from 'styled-components';

const styles = css`
  .elem-pl-LRG {
    padding-left: 15px;
  }
  .elem-pr-LRG {
    padding-right: 15px;
  }
  .border {
    border-top: 1px solid ${props => props.theme.colors.BORDER.BLUE};

    p {
      max-width: 227px;
      margin: 0 auto;
    }
  }
  .create-acc-cta {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .border.elem-pt-MED {
    padding-top: 27px;
  }
  .border.elem-pt-LRG {
    padding-bottom: 27px;
  }
`;

export default styles;
