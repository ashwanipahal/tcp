import { css } from 'styled-components';

const styles = css`
  .address-field-size {
    height: ${props => (props.isCardView ? '42px' : '20px')};
    width: ${props => (props.isCardView ? '100%' : '244px')};
  }

  .address-field-centerSkeleton {
    width: ${props => (props.isCardView ? '75%' : '214px')};
    height: ${props => (props.isCardView ? '42px' : '20px')};
  }
  .address-field-margin {
    margin-bottom: 4px;
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default styles;
