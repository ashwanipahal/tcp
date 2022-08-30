import { css } from 'styled-components';

const styles = css`
  .address-field-size {
    height: ${props => (props.isCardView ? '42px' : '20px')};
    width: ${props => (props.isCardView ? '100%' : '244px')};
    @media ${props => props.theme.mediaQuery.medium} {
      height: ${props => (props.isCardView ? '42px' : '20px')};
      width: ${props => (props.isCardView ? '100%' : '190px')};
    }
    @media ${props => props.theme.mediaQuery.large} {
      height: ${props => (props.isCardView ? '42px' : '20px')};
      width: ${props => (props.isCardView ? '100%' : '244px')};
    }
  }

  .address-field-centerSkeleton {
    width: ${props => (props.isCardView ? '75%' : '214px')};
    height: ${props => (props.isCardView ? '42px' : '20px')};
    @media ${props => props.theme.mediaQuery.medium} {
      width: ${props => (props.isCardView ? '75%' : '140px')};
      height: ${props => (props.isCardView ? '42px' : '20px')};
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: ${props => (props.isCardView ? '75%' : '214px')};
      height: ${props => (props.isCardView ? '42px' : '20px')};
    }
  }
  .address-field-margin {
    margin-bottom: 4px;
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default styles;
