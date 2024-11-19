import React, { useState } from 'react';
import { Button } from 'antd';

function App() {
  const [count, setCount] = useState(0);
  const addCount = () => {
    setCount(count + 1);
  };
  return (
    <div className="App">
      <Button onClick={() => addCount()}>add {count}</Button>
    </div>
  );
}

export default App;
