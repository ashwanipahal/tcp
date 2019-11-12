import styled from 'styled-components/native';

export const ViewStyleWrapper = styled.View`
  padding: 6px 0 32px 0;
`;

export const ButtonTabWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 22px;
  width: 100%;
`;

export const Border = styled.View`
  height: 1px;
  width: 27%;
  background-color: ${props => props.theme.colorPalette.gray[800]};
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 40%;
`;
