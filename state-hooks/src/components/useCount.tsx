import {useState} from "react";


function useCount() {
  const [count, setCount] = useState(0)

  return [count, setCount];
}

export default  useCount;
