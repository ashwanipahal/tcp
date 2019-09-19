import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};

  .row-one {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .row-two {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .header {
    display: flex;
    flex-direction: 'row';
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .EditAnchor {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    align-self: flex-end;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  }
  .anchorStyle {
    font-size: ${props => props.theme.spacing.ELEM_SPACING.SM};
    color: ${props => props.theme.colors.ANCHOR.PRIMARY};
  }
  .pickup-store-details-container {
    display: flex;
    flex-direction: 'row';
  }
  .pickupTitle {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
`;

export default styles;
