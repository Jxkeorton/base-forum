import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [review, setReview] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  }
  const hideModal = () => {
    setIsModalVisible(false);
    setReview(null); 
  };

  const openCreateModal = () => {
    setReview(null); 
    showModal();
  };

  const openEditModal = (selectedReview, onUpdateReview) => {
    setReview(selectedReview);
    showModal();
  };

  return (
    <ModalContext.Provider value={{ 
      isModalVisible, 
      showModal,
      hideModal,
      review,
      openCreateModal,
      openEditModal   
    }}>
      {children}
    </ModalContext.Provider>
  );
};