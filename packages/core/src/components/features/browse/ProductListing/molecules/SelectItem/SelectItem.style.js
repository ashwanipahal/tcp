import { css } from 'styled-components';
import { getIconPath } from '../../../../../../utils';

const selectedNoCircleIcon = getIconPath('selected-item-check-no-circle');

export default css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  width: 156px;
  @media ${props => props.theme.mediaQuery.large} {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    width: auto;
  }

  &.disable-list-items {
    pointer-events: none;
    opacity: 0.5;
  }

  .selected-items {
    text-transform: capitalize;
    text-align: left;
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};

    @media ${props => props.theme.mediaQuery.large} {
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }

  .item-select {
    background: url(${selectedNoCircleIcon}) no-repeat left top;
    background-size: 18px 18px;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XSS};
    padding-bottom: 4px;
    display: flex;
    background-position: -3px;

    span {
      font-weight: ${props => props.theme.fonts.fontWeight.bold};
    }

    @media ${props => props.theme.mediaQuery.large} {
      background: url(${selectedNoCircleIcon}) no-repeat left top;
      background-size: 18px 18px;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XSS};
      padding-bottom: 4px;
      display: flex;
    }
  }
`;
