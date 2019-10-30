import { css } from 'styled-components';

const styles = css`
  border: 1px solid ${props => props.theme.colorPalette.gray[800]};
  margin: 0 auto;
  position: relative;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XL};
  @media ${props => props.theme.mediaQuery.smallOnly} {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XL}
      ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .confirmation-item-count {
    color: ${props => props.theme.colorPalette.gray[900]};
    line-height: 2.4;
    background: ${props => props.theme.colorPalette.white};
    position: absolute;
    left: 50%;
    top: 0;
    margin: 0 -50% 0 0;
    transform: translate(-50%, -50%);
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  .confirmation-order-details-wrapper {
    display: flex;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    justify-content: space-between;
  }
`;

export default styles;
