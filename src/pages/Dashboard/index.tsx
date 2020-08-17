import React from 'react';

import { Container, Content } from './styles';

import Calendar from '../../components/Calendar';

const Dashboard: React.FC = () => (
  <Container>
    <Content>
      <Calendar />
    </Content>
  </Container>
);
export default Dashboard;
