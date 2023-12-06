import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import LoaderRiv from './../../images/loader.riv';

import { usePrefersReducedMotion } from '@hooks';
import { useRive } from '@rive-app/react-canvas';

const STATE_MACHINE_NAME = 'State Machine 1';
const StyledAboutSection = styled.section`
  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  margin: 50px auto 0;

  @media (max-width: 900px) {
    margin: 50px auto 0;
    width: 340px;
    height: 340px;
  }

  @media (max-width: 800px) {
    margin: 50px auto 0;
    width: 400px;
    height: 400px;
  }

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 100%;
    height: 300px;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    /* background-color: var(--green); */

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;
function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = React.useState(false);

  const observer = React.useMemo(
    () => new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting)),
    [ref],
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
}
const About = () => {
  const divRef = React.useRef(null);
  const isVisible = useOnScreen(divRef);

  const { rive, RiveComponent } = useRive({
    src: LoaderRiv,
    stateMachines: STATE_MACHINE_NAME,
    artboard: 'FUI Login Screen',
    autoplay: false,
  });

  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isVisible && rive) {
      rive.play();
    }
  }, [isVisible, rive]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'JavaScript (ES6+)',
    'TypeScript',
    'React',
    'Node.js',
    'React-Native',
    'Nestjs',
    'Hygen',
    'Fastlane',
    'Android',
    'iOS',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Your go-to Full Stack Developer with a twist. Whether it's crafting sleek React-Native
              interfaces, dancing with the React.js orchestra, or diving into the wild worlds of
              NestJS and Golang—I'm all in.
            </p>
            <p>
              Do you know what has won me over recently ? Creating tools that make fellow
              developers' lives easier.
            </p>
            <p>
              I'm the person who sets up the stage for your applications, handling from code quality
              checks to releases pipelines. Oh, and did I mention I've been the tech leading some
              cool projects ? Let's build something awesome together. Beyond the code, I'm your
              adaptable ally. Socially, I'm the team energizer, fostering collaboration and making
              the tech journey enjoyable.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic ref={divRef}>
          <RiveComponent style={{ height: '100%', width: '100%' }} />

          {/*          <StaticImage
            className="img"
            src="../../images/me.jpg"
            width={500}
            quality={95}
            formats={['AUTO', 'WEBP', 'AVIF']}
            alt="Headshot"
          />*/}
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
