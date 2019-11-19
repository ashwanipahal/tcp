import { css } from 'styled-components';

const styles = css`
  .address-field-size {
    height: ${props => (props.variation === 'secondary' ? '20px' : '42px')};
    width: ${props => (props.variation === 'secondary' ? '244px' : '100%')};
  }

  .address-field-centerSkeleton {
    width: ${props => (props.variation === 'secondary' ? '214px' : '75%')};
    height: ${props => (props.variation === 'secondary' ? '20px' : '42px')};
  }
  .address-field-margin {
    margin-bottom: 4px;
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default styles;
