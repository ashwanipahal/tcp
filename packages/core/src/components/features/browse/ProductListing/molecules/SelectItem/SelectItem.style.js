import { css } from 'styled-components';
import { getIconPath } from '../../../../../../utils';

const selectedIcon = getIconPath('selected-item');

export default css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  width: 156px;
  @media ${props => props.theme.mediaQuery.large} {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    width: auto;
  }
  .item-select {
    text-transform: capitalize;
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XL};

    @media ${props => props.theme.mediaQuery.large} {
      background: url(${selectedIcon}) no-repeat left top;
      background-size: 20px 20px;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XSS};
      padding-bottom: 8px;
      display: flex;
    }
  }
`;
