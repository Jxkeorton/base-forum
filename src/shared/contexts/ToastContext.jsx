import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

export const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            marginTop: 90,
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              marginTop: 90,
              background: '#059669',
            },
          },
          error: {
            duration: 4000,
            style: {
              marginTop: 90,
              background: '#DC2626',
            },
          },
        }}
      />
    </>
  );
};

export const useCustomToast = () => {
  const showToast = {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    loading: (message) => toast.loading(message),
    dismiss: toast.dismiss,
  };

  return showToast;
};