import React, { useState, useEffect } from 'react';
import LoaderRiv from './../images/loader.riv';
import PropTypes from 'prop-types';
import { useStateMachineInput, useRive } from '@rive-app/react-canvas';
import styled from 'styled-components';

const STATE_MACHINE_NAME = 'State Machine 1';
const ON_PRESSED_INPUT_NAME = 'pressed';
const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--navy);
  z-index: 99;
  transition: var(--transition);
  opacity: ${props => (props.startUnmount ? 0 : 1)};

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
      #B {
        opacity: 0;
      }
    }
  }

  .fade-out-image {
    animation: fadeOut 1s;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted] = useState(false);
  const [startUnmount, setStartUnmount] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: LoaderRiv,
    stateMachines: STATE_MACHINE_NAME,
    artboard: 'FUI Login Screen',
    autoplay: true,
  });

  const onPressedInput = useStateMachineInput(rive, STATE_MACHINE_NAME, ON_PRESSED_INPUT_NAME);

  useEffect(() => {
    if (onPressedInput) {
      setTimeout(() => {
        setTimeout(() => setStartUnmount(() => true), 1000);
        onPressedInput.value = true;
        setTimeout(() => {
          finishLoading();
        }, 1700);
      }, 4000);
    }
  }, [onPressedInput]);
  useEffect(() => {}, []);

  return (
    <StyledLoader
      className={`loader fade-out-image ${startUnmount ? 'fade-out-image' : ''}`}
      startUnmount={startUnmount}
      isMounted={isMounted}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <RiveComponent style={{ width: 500, height: 500 }} />
        <div style={{ width: 'fit-content' }}>
          <div className="typewriter">
            <h5>Identification in progress... &#20;&#20;&#20;</h5>
          </div>
        </div>
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
