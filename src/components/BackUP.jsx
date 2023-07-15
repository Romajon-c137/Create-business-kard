import React, { useState } from 'react';

function BackUP() {
  const [count, setCount] = useState(2);
  const [prevCount, setPrevCount] = useState(0);

  const handleIncrement = () => {
    setPrevCount(count); // Сохраняем предыдущее состояние перед обновлением
    setCount(count + 1);
  };

  const handleRestore = () => {
    setCount(prevCount); // Восстанавливаем предыдущее состояние
  };

  return (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={() => {setCount(count + 1)}} >+++++</button>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleRestore}>Restore Previous Count</button>
    </div>
  );
}

export default BackUP;
