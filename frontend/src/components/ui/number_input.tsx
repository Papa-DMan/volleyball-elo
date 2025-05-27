import React, { useState } from 'react';

function NumberInput({ min = 0, max = Infinity, step = 1 , value = 0, setValue = (val : number) => {}}) {

  const handleIncrement = () => {
    setValue(Math.min(value + step, max));
  };

  const handleDecrement = () => {
    setValue(Math.max(value - step, min));
  };

  const handleChange = (e: { target: { value: string; }; }) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      setValue(Math.min(Math.max(newValue, min), max));
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button onClick={handleDecrement} type="button">-</button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        style={{ textAlign: 'center', margin: '0 8px' }}
      />
      <button onClick={handleIncrement} type="button">+</button>
    </div>
  );
}

export default NumberInput;
