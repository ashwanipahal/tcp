import styled from 'styled-components';

export default styled.div`
  .underprogress_application {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card-InProgress-header {
    text-align: center;
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0px;
  }

  .submit_plcc_form {
    justify-content: space-around;
  }

  .underprogress_checkout_button {
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0px
      ${props => props.theme.spacing.ELEM_SPACING.MED} 0px;
  }

  .underprogress_continue_button {
    margin: 0px 0px ${props => props.theme.spacing.ELEM_SPACING.LRG} 0px;
  }
`;
