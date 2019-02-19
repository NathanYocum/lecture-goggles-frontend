import styled from 'styled-components';

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
  background-color: ${props => (props.isActive ? '#ffffff' : '#efefef')};
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
  border: ${props => (props.hasErrors ? '1px solid #ff4136' : '1px solid #0074d9')};
  text-align: center;
  height: 56px;
  font-size: 24px;
  box-shadow: 4px 0px 10px 0px rgba(0, 0, 0, 0.2);

  :focus {
    outline-color: ${props => (props.hasErrors ? '#ff4136' : '#0074d9')};
  }
`;

const TextAreaStyle = styled.textarea`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border: 1px solid #0074d9;
  min-width: 80%;
  resize: vertical;
  height: 56px;
  border: ${props => (props.hasErrors ? '1px solid #ff4136' : '1px solid #0074d9')};

  :focus {
    outline-color: ${props => (props.hasErrors ? '#ff4136' : '#0074d9')};
  }
`;

const SelectStyle = styled.select`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 4px;
  border: 1px solid #0074d9;
  background-color: #e3e3e3;
`;

const LabelStyle = styled.label`
  text-align: center;
  font-size: 24px;
  display: block;
  color: #0074d9;
  margin-top: 10px;
`;

const ErrorDiv = styled.div`
  text-align: center;
  color: #ff4136;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border: 1px solid #ff4136;
  background-color: #e3e3e3;
  font-size: 16px;
`;

export { TabBarStyle, TabBarTabStyle, FormContainer, BG, InputStyle, TextAreaStyle, SelectStyle, LabelStyle, ErrorDiv };
