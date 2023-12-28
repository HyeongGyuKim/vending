import './vending.scss'
import { Transition } from 'react-transition-group';
import { useRef, useState } from 'react';

const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1, top:"0%" },
  entered:  { opacity: 1, top:"0%" },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

function Alert({ isAnimation }) {
    // console.log(isAnimation);
    let [nodeRef] = useState(null);

    return(
        <Transition nodeRef={nodeRef} in={isAnimation} timeout={duration}>
      {state => (
        <div className='alert' ref={nodeRef} style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          123
        </div>
      )}
    </Transition>
        // <div className={`alert ${isAnimation ? '' : 'on' }`}>
        //     123
        // <button >클릭</button>
        // </div>
    )
}

export default Alert;