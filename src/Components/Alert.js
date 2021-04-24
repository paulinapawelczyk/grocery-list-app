import React, { useEffect } from 'react';

const Alert = ({ type, message, hideAlert }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      hideAlert();
    }, 2000);
    return () => clearTimeout(timeoutId);
  });

  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
