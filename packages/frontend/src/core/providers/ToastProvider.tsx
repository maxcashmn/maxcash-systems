import React, { PropsWithChildren } from 'react';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Global toast configuration.
 *
 * Individual toast calls can override these defaults when necessary.
 */
const toastConfig: ToastContainerProps = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'light',
};

/**
 * Provides a single global ToastContainer for the application.
 */
export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer {...toastConfig} />
    </>
  );
};




// import React from 'react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     <>
//       {children}
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </>
//   );
// };
