import React from 'react';
import { useSpinner } from '../providers/SpinnerContext';

const Spinner = () => {
  const { isLoading } = useSpinner();

  return (
    <div className={`spinner-overlay ${isLoading ? 'active' : ''}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;

