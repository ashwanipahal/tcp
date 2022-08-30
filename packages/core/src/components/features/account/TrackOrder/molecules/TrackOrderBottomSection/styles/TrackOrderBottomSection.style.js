import { css } from 'styled-components';

const styles = css`
  padding: ${props => props.theme.spacing.ELEM_SPACING.LRG};

  .trackorder__modal__section {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  .center-align {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .center-align-row {
    flex-direction: row;
  }

  .trackorder__modal__clickhere_link {
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
`;

export default styles;
