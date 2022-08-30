import { css } from 'styled-components';

const styles = css`
  .survey__container {
    width: 100%;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM} 0
      ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
  }
  .options__container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .options {
    align-items: center;
    justify-content: center;
    margin: ${props => props.theme.spacing.ELEM_SPACING.SM};
    text-align: center;
  }

  .question-text {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
`;

export default styles;
