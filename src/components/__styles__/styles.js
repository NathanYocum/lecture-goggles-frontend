import styled from 'styled-components';

const primaryBlue = '#0074d9';
const secondaryOrange = '#ff9800';
const secondaryDarkOrange = '#e65100';
const darkGrey = '#aaaaaa';
// const lightGrey = '#e3e3e3';
const blueGrey = '#90a4ae';
const red = '#ff4136';

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
  background-color: ${props => (props.isActive ? '#ffffff' : `${darkGrey}`)};
  :hover {
    box-shadow: inset 0px 0px 0px 4px ${props => (props.isActive ? '#ffffff' : `${darkGrey}`)},
      inset 0px 0px 0px 6px ${props => (props.isActive ? `${primaryBlue}` : '#ffffff')};
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
  border: 1px solid #e3e3e3;
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
  border: ${props => (props.hasErrors ? `1px solid ${red}` : `1px solid ${primaryBlue}`)};
  text-align: center;
  height: 56px;
  font-size: 24px;
  box-shadow: 4px 0px 10px 0px rgba(0, 0, 0, 0.2);

  :focus {
    outline-color: ${props => (props.hasErrors ? `${red}` : `${primaryBlue}`)};
  }
`;

const TextAreaStyle = styled.textarea`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border: 1px solid ${primaryBlue};
  min-width: 80%;
  resize: vertical;
  height: 56px;
  border: ${props => (props.hasErrors ? `1px solid ${red}` : `1px solid ${primaryBlue}`)};

  :focus {
    outline-color: ${props => (props.hasErrors ? `${red}` : `${primaryBlue}`)};
  }
`;

const SelectStyle = styled.select`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 4px;
  border: 1px solid ${primaryBlue};
  background-color: #e3e3e3;
`;

const LabelStyle = styled.label`
  text-align: center;
  font-size: 24px;
  display: block;
  color: ${primaryBlue};
  margin-top: 10px;
`;

const ErrorDiv = styled.div`
  text-align: center;
  color: ${red};
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border: 1px solid ${red};
  background-color: #e3e3e3;
  font-size: 16px;
`;

const SubjectItemContainer = styled.div`
  border: 1px solid ${blueGrey};
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  grid-template-rows: 56px;
  grid-column: 2;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 1fr ${props => (props.width > 475 ? '110px' : '36px')} 36px;
  font-size: 20px;
  align-items: center;
  background-color: ${primaryBlue};
`;

const SubjectDescriptionContainer = styled.div`
  grid-column: 1 / span 3;
  border-top: 1px solid ${darkGrey};
  color: ${darkGrey};
  padding-left: 8px;
  background-color: #ffffff;
`;

const UnstyledButton = styled.button`
  display: inline-block;
  border: none;
  padding: none;
  margin: none;
  background: none;
  text-align: center;
  font-size: inherit;
`;

const SubscribeButton = styled(UnstyledButton)`
  font-size: 16px;
  background-color: ${secondaryOrange};
  border-radius: 8px;
  color: #ffffff;
  border: 1px solid ${secondaryDarkOrange};
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
  height: 24px;
`;

const CardContainerStyle = styled.div`
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  display: grid;
  width: 345px;
  grid-template-rows: 20px 12px 12px 159px 36px repeat(2, 15px) 62px;
  grid-template-columns: auto 56px;
  font-family: 'IBMPlexSans-SemiBold';
  box-shadow: 4px 8px 10px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 12px;
`;

const TitleStyle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ItemStyle = styled.div`
  font-size: 12px;
  color: #90a4ae;
`;

const DescriptionStyle = styled(ItemStyle)`
  padding-top: 10px;
`;

const AvatarStyle = styled.img`
  grid-column: 2;
  grid-row: 1 / span 3;
  align-self: center;
`;

const PreviewStyle = styled.img`
  grid-column: 1 / span 2;
  grid-row: 4 / span 2;
  align-self: center;
`;
const PreviewA = styled.a`
  grid-column: 1 / span 2;
  grid-row: 4 / span 2;
`;

const PreviewLink = styled.div`
  grid-row: 5;
  grid-column: 1 / span 2;
  background-color: rgba(38, 50, 56, 0.55);
  height: 36px;
  color: white;
  display: flex;
`;

const LinkStyle = styled.div`
  font-size: 12px;
  align-self: center;
  margin-left: 16px;
  width: 100%;
  font-family: IBMPlexMono;
`;

const BottomContainer = styled.div`
  grid-column: 2;
`;

export {
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
  BottomContainer
};
