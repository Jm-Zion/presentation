import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRive } from '@rive-app/react-canvas';
import CosmosRiv from './../images/cosmos.riv';
import { Layout, Hero, About, Jobs, Featured, Projects, Contact } from '@components';
import { AnalyticsProvider } from '../utils/analytics';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => {
  const { RiveComponent } = useRive({
    src: CosmosRiv,
    artboard: 'New Artboard',
    autoplay: true,
  });

  return (
    <AnalyticsProvider>
      <Layout location={location}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            overflow: 'hidden',
          }}>
          <RiveComponent style={{ height: '100%', width: '100%' }} />
        </div>

        <StyledMainContainer className="fillHeight">
          <Hero />
          <About />
          <Jobs />
          <Featured />
          <Projects />
          <Contact />
        </StyledMainContainer>
      </Layout>
    </AnalyticsProvider>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
