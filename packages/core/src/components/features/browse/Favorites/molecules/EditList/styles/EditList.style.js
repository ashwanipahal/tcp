import { css } from 'styled-components';

export default css`
  .add-list-field {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  }
  .add-list-fav-check {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  }
  .add-list-save {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  }
  .add-list-cancel {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  }
  .default-check-row {
    p {
      padding-top: 5px;
    }
  }
`;
