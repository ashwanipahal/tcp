import { css } from 'styled-components';

const styles = css`
  margin-bottom: 36px;

  .row-one {
    margin-bottom: 24px;
  }
  .row-two {
    margin-bottom: 24px;
  }
  .header {
    display: flex;
    flex-direction: 'row';
    margin-bottom: 26px;
  }
  .EditAnchor {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    align-self: flex-end;
    padding-bottom: 2px;
  }
  .anchorStyle {
    font-size: 12px;
    color: ${props => props.theme.colors.ANCHOR.PRIMARY};
  }
  .pickup-store-details-container {
    display: flex;
    flex-direction: 'row';
  }
  .pickupTitle {
    margin-bottom: 14px;
  }
`;

export default styles;
