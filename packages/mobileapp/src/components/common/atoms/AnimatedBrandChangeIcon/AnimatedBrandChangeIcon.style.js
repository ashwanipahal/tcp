import styled, { css } from 'styled-components';

const Container = styled.TouchableOpacity`
  align-items: center;
  background: transparent;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const brandIconStyles = css`
  border-radius: 100px;
  position: absolute;
  bottom: 0px;
  left: -40px;
  width: 90px;
  height: 90px;
  align-items: center;
  justify-content: center;
`;

const TCPIcon = styled.TouchableOpacity`
  ${props => `
    border: 2px solid ${props.theme.colorPalette.blue[700]};
    box-shadow: 2px 2px 2px ${props.theme.colorPalette.blue[700]}; 
    background: ${props.theme.colorPalette.white};
    ${brandIconStyles};
  `};
`;

const GymIcon = styled.TouchableOpacity`
  ${props => `
    border: 2px solid ${props.theme.colorPalette.orange[800]};
    box-shadow: 2px 2px 2px ${props.theme.colorPalette.orange[700]}; 
    background: ${props.theme.colorPalette.white};
    ${brandIconStyles};
  `};
`;

const styles = {
  brandContainer: {
    position: 'absolute',
    bottom: 80,
  },
};

export { Container, TCPIcon, GymIcon, styles };
