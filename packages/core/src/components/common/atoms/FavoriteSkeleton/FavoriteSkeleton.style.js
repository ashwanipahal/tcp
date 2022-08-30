import { css } from 'styled-components';

const style = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  border-bottom: 1px solid ${props => props.theme.colorPalette.black};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  .skeleton-wishListName,
  .skeleton-sortFilter {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  }
  .skeleton-displayFilter {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
`;
export default style;
