import { css } from 'styled-components';

const styles = css`
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
  }

  @media ${props => props.theme.mediaQuery.medium} {
    min-height: 250px;
    height: 100%;
  }
  @media ${props => props.theme.mediaQuery.large} {
    width: 80%;
  }
`;

export default styles;
