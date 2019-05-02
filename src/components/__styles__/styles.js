import styled from 'styled-components';

const colors = {
  primaryBlue: '#0074d9',
  secondaryOrange: '#ff9800',
  secondaryDarkOrange: '#e65100',
  secondaryLightOrange: '#ff945e',
  darkGrey: '#aaaaaa',
  lightGrey: '#e3e3e3',
  blueGrey: '#90a4ae',
  red: '#ff4136',
  green: '#3d9970'
};

const TabBarStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const TabBarTabStyle = styled.button`
  padding-left: 5px;
  padding-right: 5px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border: none;
  height: 56px;
  width: 100%;
  background-color: ${props => (props.isActive ? '#ffffff' : `${colors.darkGrey}`)};
  color: #111111;
  :hover {
    box-shadow: inset 0px 0px 0px 4px ${props => (props.isActive ? '#ffffff' : `${colors.darkGrey}`)},
      inset 0px 0px 0px 6px ${props => (props.isActive ? `${colors.primaryBlue}` : '#ffffff')};
    top: -4px;
    left: -4px;
  }
`;

const FormContainer = styled.div`
  grid-column: 2;
  grid-row: 2 / span 2;
  background-color: #ffffff;
  width: 100%;
  text-align: center;
  border: 1px solid ${colors.lightGrey};
  box-shadow: 4px 8px 10px 0px rgba(0, 0, 0, 0.2);
`;

const BG = styled.div`
  grid-column: 1 / span 3;
  grid-row: 1 / span 2;
  background-color: #004aa7;
  width: 100%;
  height: 300px;
`;

const InputStyle = styled.input`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 4px;
  border: ${props => (props.hasErrors ? `1px solid ${colors.red}` : `1px solid ${colors.primaryBlue}`)};
  text-align: center;
  height: 56px;
  font-size: 24px;
  box-shadow: 4px 0px 10px 0px rgba(0, 0, 0, 0.2);
  background-color: #efefef;
  color: #111111;

  :focus {
    outline-color: ${props => (props.hasErrors ? `${colors.red}` : `${colors.primaryBlue}`)};
  }
`;

const TextAreaStyle = styled.textarea`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border: 1px solid ${colors.primaryBlue};
  min-width: 80%;
  resize: vertical;
  height: 56px;
  background-color: #efefef;
  color: #111111;
  border: ${props => (props.hasErrors ? `1px solid ${colors.red}` : `1px solid ${colors.primaryBlue}`)};

  :focus {
    outline-color: ${props => (props.hasErrors ? `${colors.red}` : `${colors.primaryBlue}`)};
  }
`;

const SelectStyle = styled.select`
  color: #111111;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 4px;
  border: 1px solid ${colors.primaryBlue};
  background-color: ${colors.lightGrey};
  height: 36px;
`;

const LabelStyle = styled.label`
  text-align: center;
  font-size: 24px;
  display: block;
  color: ${colors.primaryBlue};
  margin-top: 10px;
`;

const ErrorDiv = styled.div`
  text-align: center;
  color: ${colors.red};
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border: 1px solid ${colors.red};
  background-color: ${colors.lightGrey};
  font-size: 16px;
`;

const SubjectItemContainer = styled.div`
  border: 1px solid ${colors.blueGrey};
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  grid-template-rows: minmax(56px, auto);
  grid-column: 2;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 1fr ${props => (props.width > 475 ? '110px' : '36px')} 36px;
  font-size: 20px;
  align-items: center;
  background-color: ${colors.primaryBlue};
`;

const SubjectDescriptionContainer = styled.div`
  grid-column: 1 / span 3;
  border-top: 1px solid ${colors.darkGrey};
  color: ${colors.darkGrey};
  padding-left: 8px;
  background-color: #ffffff;
  min-height: 56px;
`;

const UnstyledButton = styled.button`
  display: inline-block;
  border: none;
  padding: none;
  margin: none;
  background: none;
  text-align: center;
  font-size: inherit;
  cursor: pointer;
`;

const SubscribeButton = styled(UnstyledButton)`
  font-size: 16px;
  background-color: ${props => (props.isSubscribed ? '#3D9970' : colors.secondaryOrange)};
  border-radius: 8px;
  color: #ffffff;
  border: 1px solid ${props => (props.isSubscribed ? '#3D9970' : colors.secondaryDarkOrange)};
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
  height: 24px;
  display: flex;
`;

const CardContainerStyle = styled.div`
  border-radius: 4px;
  display: grid;
  width: 288px;
  grid-template-rows: auto auto auto 165px 40px auto auto auto 36px;
  grid-template-columns: auto 56px;
  font-family: 'IBMPlexSans-SemiBold';
  box-shadow: 4px 8px 10px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 12px;
  background-color: #f8f8f8;
`;

const TitleStyle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const ItemStyle = styled.div`
  font-size: 12px;
  color: #90a4ae;
`;

const DescriptionStyle = styled(ItemStyle)`
  padding-top: 10px;
  grid-column: 1 / span 2;
  grid-row: 8;
  overflow: hidden;
`;

const AvatarStyle = styled.img`
  grid-column: 2;
  grid-row: 1 / span 3;
  align-self: center;
`;

const PreviewStyle = styled.img`
  grid-column: 1 / span 2;
  grid-row: 4 / span 2;
`;
const PreviewA = styled.a`
  grid-column: 1 / span 2;
  grid-row: 4 / span 2;
  align-self: end;
`;

const PreviewLink = styled.a`
  grid-row: 5;
  grid-column: 1 / span 2;
  background-color: rgba(38, 50, 56, 0.55);
  height: 36px;
  color: white;
  align-content: center;
  display: grid;
  overflow: hidden;
`;

const LinkStyle = styled.div`
  font-size: 12px;
  align-self: center;
  margin-left: 16px;
  width: 100%;
  font-family: IBMPlexMono;
`;

const BottomContainer = styled.div`
  grid-column: 1 / span 2;
  grid-row: 9;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const ErrorFormContainer = styled.div`
  grid-column: 1 / span 2;
  background-color: #ffffff;
  border: 1px solid #efefef;
  text-align: center;
  box-shadow: 4px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding-top: 16px;
  margin-top: 8px;
`;

const FABDescriptionStyle = styled.span`
  color: ${colors.red};
  margin-left: 12px;
  font-weight: 600;
`;

const ModalContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 36px;
  grid-template-rows: max-content max-content auto;
`;

const ModalTitleStyle = styled.h1`
  grid-column: 1 / span 2;
  grid-row: 1;
  border-bottom: 1px solid #111111;
  color: ${colors.primaryBlue};
`;

const ModalDescriptionStyle = styled.div`
  color: #111111;
  grid-column: 1 / span 2;
  grid-row: 2;
`;

const ErrorDescriptionStyle = styled.div`
  color: #ff3000;
  grid-column: 1 / span 2;
  grid-row: 3;
`;

const ExtendedFloatingActionButtonStyle = styled(UnstyledButton)`
  background-color: ${props => props.backgroundColor};
  position: fixed;
  bottom: 4px;
  left: ${props => (props.windowWidth > 768 ? '64' : '16')}px;
  min-width: 56px;
  min-height: 56px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
  border: 1px solid #efefef;
`;

export {
  colors,
  TabBarStyle,
  TabBarTabStyle,
  FormContainer,
  BG,
  InputStyle,
  TextAreaStyle,
  SelectStyle,
  LabelStyle,
  ErrorDiv,
  SubjectItemContainer,
  SubjectDescriptionContainer,
  UnstyledButton,
  SubscribeButton,
  CardContainerStyle,
  TitleStyle,
  ItemStyle,
  DescriptionStyle,
  AvatarStyle,
  PreviewStyle,
  PreviewA,
  PreviewLink,
  LinkStyle,
  BottomContainer,
  FABDescriptionStyle,
  ModalContainer,
  ModalTitleStyle,
  ModalDescriptionStyle,
  ErrorDescriptionStyle,
  ErrorFormContainer,
  ExtendedFloatingActionButtonStyle
};
