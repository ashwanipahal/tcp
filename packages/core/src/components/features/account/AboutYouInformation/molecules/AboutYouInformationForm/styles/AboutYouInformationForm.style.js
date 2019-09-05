import { css } from 'styled-components';

const styles = css`
  @media ${props => props.theme.mediaQuery.smallMax} {
    .aboutyou_cancel {
      order: 2;
    }

    .aboutyou_save {
      order: 1;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
`;
export default styles;
