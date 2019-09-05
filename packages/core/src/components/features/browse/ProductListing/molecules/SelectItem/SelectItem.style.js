import { css } from 'styled-components';
import { getIconPath } from '../../../../../../utils';

const selectedIcon = getIconPath('selected-item');

export default css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  width: 156px;
  @media ${props => props.theme.mediaQuery.large} {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    width: auto;
  }
  .selected-items {
    text-transform: capitalize;
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
    text-align: left;
  }

  .item-select {
    @media ${props => props.theme.mediaQuery.large} {
      background: url(${selectedIcon}) no-repeat left top;
      background-size: 18px 18px;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XSS};
      padding-bottom: 4px;
      display: flex;
    }
  }
`;
