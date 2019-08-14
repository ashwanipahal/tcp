import styled, { css } from 'styled-components';

const styles = css``;

const WrapperStyle = styled.View`
  display: flex;
  flex-direction: column;
`;
const PCContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const TitleContainer = styled.View`
  margin-bottom: 24px;
  padding: 0px 15px 0px 13px;
`;

const CardContainer = styled.View`
  width: 100%;
`;

const ShowMoreContainer = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 15px 0px 13px;
`;

export { styles, WrapperStyle, PCContainer, TitleContainer, CardContainer, ShowMoreContainer };
