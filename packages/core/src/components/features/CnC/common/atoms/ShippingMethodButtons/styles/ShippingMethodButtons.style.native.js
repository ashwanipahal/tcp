import styled from 'styled-components/native';


const Wrapper = styled.TouchableOpacity`
  border-width: 1px;
  border-radius: 6px;
  border-color: ${props => props.theme.colorPalette.gray[900]};
  text-align: center;
  width: 32%
  height: 30px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  background-color: ${props => props.checked ? props.theme.colorPalette.gray[900] : props.theme.colorPalette.white};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-right: ${props => props.index !== 2 ? props.theme.spacing.ELEM_SPACING.XXS : 0}
`;

export default Wrapper;

