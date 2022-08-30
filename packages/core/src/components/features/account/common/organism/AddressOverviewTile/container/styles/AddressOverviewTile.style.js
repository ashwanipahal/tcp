import { css } from 'styled-components';

const styles = css`
  border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  padding: ${props => {
    const spacing = props.theme.spacing.ELEM_SPACING;
    return `${spacing.MED} ${spacing.MED} ${spacing.SM} ${spacing.MED}`;
  }};
  width: 100%;

  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .content {
    flex-grow: 1;
  }

  .heading {
    margin: 0;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    border-bottom: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  }
`;

export default styles;
