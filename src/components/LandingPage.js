import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LandingPage = () => {
  return (
    <Wrapper>
      <Content>
        <h1>This is the landing page.</h1>
        <p>What experience do you want to see?</p>

        <ButtonWrapper>
          <Link to="/shop">
            <ExperienceButton>Shop Experience</ExperienceButton>
          </Link>
          <Link to="/courier">
            <ExperienceButton>Courier Experience</ExperienceButton>
          </Link>
          <Link to="/shopper">
            <ExperienceButton>Shopper Experience</ExperienceButton>
          </Link>
          <Link to="/login">
            <ExperienceButton>Log in</ExperienceButton>
          </Link>
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

const ButtonWrapper = styled.ul`
  display: flex;
  padding: 0;
`;

const ExperienceButton = styled.li`
  margin-right: 10px;
  list-style-type: none;
  padding: 5px;
  border-radius: 5px;
  border: 1px grey solid;
`;