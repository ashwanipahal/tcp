import styled, { css } from 'styled-components';

const styles = css`
  padding: 1px;
`;

const WrapperStyle = styled.View`
  display: flex;
  flex-direction: column;
  padding: 1px;
  background-color: rgba(243, 243, 243, 1);
`;
const PCContainer = styled.View`
  flex-direction: row;
`;

const TitleContainer = styled.View`
  margin-top: 8px;
`;

const CardContainer = styled.View`
  width: 100%;
  margin-top: 25px;
`;

const ModalContainer = styled.View`
  padding: 1px;
`;

export { styles, WrapperStyle, PCContainer, TitleContainer, CardContainer, ModalContainer };
