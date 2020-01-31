import { useState } from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = useState('');

  return {
    showModal,
    closeModal: () => setShowModal(''),
    openModal: modal => setShowModal(modal),
  };
};

export default useModal;
