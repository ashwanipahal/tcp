import { css } from 'styled-components';

const styles = css`
  div.TCPModal__InnerContent {
    right: 0;
    left: auto;
    border: 1px solid #ccc;
    top: 0;
    transform: none;
    box-shadow: 0 4px 8px 0 rgba(163, 162, 162, 0.5);
    padding: 7px 20px 10px;
  }
  .Modal_Heading {
    border-bottom: 1px solid ${props => props.theme.colors.BLACK};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    margin-top: 0;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
     display: block;
    }
  }
  .addedToBagWrapper{
    overflow-y: auto;
    height: 100%;
  }

  @media ${props => props.theme.mediaQuery.medium} {

  }
`;

export default styles;
