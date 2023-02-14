import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeWithButton);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeWithButton);
  }

  closeWithButton = ({ code }) => {
    if (code === 'Escape') {
      this.props.close();
    }
  };

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget) {
      this.props.close();
    }
  };
  render() {
    const { children } = this.props;
    const { closeModal } = this;
    return createPortal(
      <div
        className={css.Overlay}
        onClick={closeModal}
      >
        <div className={css.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node,
};
