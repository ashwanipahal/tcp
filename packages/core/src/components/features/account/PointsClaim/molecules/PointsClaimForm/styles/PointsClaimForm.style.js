import { css } from 'styled-components';

const styles = css`
  .profileinfo-email_value {
    word-break: break-all;
  }
  .profileinfo-rewardsId_value {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .image_container {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .image_caption {
    background-color: ${props => props.theme.colorPalette.orange[800]};
    padding: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    color: #ffffff;
    width: 260px;
  }
  .selectBox_label {
    margin-bottom: -${props => props.theme.spacing.ELEM_SPACING.MED};
    font-size: 10px;
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    .points-claim_cancel {
      order: 2;
    }

    .points-claim_submit {
      order: 1;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
`;

export default styles;
