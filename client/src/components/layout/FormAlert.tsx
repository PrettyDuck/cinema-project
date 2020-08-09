import React from 'react';

const FormAlert: React.FC<{ alertMessage: string }> = ({ alertMessage }): any => {
  return (
    alertMessage !== '' && (
      <div
        className='container flex justify-center items-center rounded-md w-2/6 h-20 mt-6'
        style={{ backgroundColor: '#333333' }}>
        <span className='text-white'>{alertMessage}</span>
      </div>
    )
  );
};

export default FormAlert;
