import styled from 'styled-components';

const ModalBottomView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnchorTextView = styled.View`
  display: flex;
  flex-direction: row;
  font-size: 20px;
`;

const LogginView = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXXL} 0
    ${props => props.theme.spacing.ELEM_SPACING.XL};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { AnchorTextView, LogginView, ModalBottomView };
