import styled from 'styled-components';

export default styled.div`
  .plcc_button_wrapper {
    justify-content: space-around;
  }

  .checkout_button {
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0px
      ${props => props.theme.spacing.ELEM_SPACING.MED} 0px;
  }

  .continue_button {
    margin: 0px 0px ${props => props.theme.spacing.ELEM_SPACING.LRG} 0px;
  }
`;
