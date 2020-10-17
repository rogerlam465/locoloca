import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import styled from 'styled-components';

const LandingPage = () => {
  return (
    <Wrapper>
      <Content>
        <h1>This is the landing page.</h1>
        <p>What experience do you want to see?</p>
        <ButtonWrapper>
          <ExperienceButton>Shop Experience</ExperienceButton>
          <ExperienceButton>Courier Experience</ExperienceButton>
          <ExperienceButton>Shopper Experience</ExperienceButton>
        </ButtonWrapper>
      </Content>
    </Wrapper>
  );
};

export default LandingPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 80%;
  background: lightgrey;
  border-radius: 15px;
  padding: 30px;
  margin: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const ExperienceButton = styled.button`
  margin-right: 10px;
`;