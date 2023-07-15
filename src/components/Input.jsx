import React from 'react';

const Input = (props) => {
  const { hint, type, value, onChange, placeholder } = props;

  return (
    <>
     <div className="">
     <p className='text-white'>
        {hint}
      </p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='p-[10px] bg-blockFon border border-border rounded-lg hover:bg-[#132f4c] focus:border-contract text-white w-72 transition-all'
      />
     </div>
    </>
  );
};

export default Input;
