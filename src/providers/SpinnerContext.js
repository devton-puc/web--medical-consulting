import React, { createContext, useState, useContext } from 'react';
import Spinner from '../components/Spinner';
const SpinnerContext = createContext();

export const SpinnerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showSpinner = () => setIsLoading(true);

  const hideSpinner = () => setIsLoading(false);

  return (
    <SpinnerContext.Provider value={{ isLoading, showSpinner, hideSpinner }}>
      {children}
      <Spinner />
    </SpinnerContext.Provider>
  );
};

export const useSpinner = () => {
  return useContext(SpinnerContext);
};