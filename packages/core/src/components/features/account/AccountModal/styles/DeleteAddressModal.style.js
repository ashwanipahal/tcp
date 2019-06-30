import { css } from 'styled-components';

const DeleteAddressModalStyle = css`
  margin: 0 ${props => props.theme.spacing.LAYOUT_SPACING.XL};
  .address_to_delete {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.medium} {
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }
  .delete_confirm {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
`;

export default DeleteAddressModalStyle;
