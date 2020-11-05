import * as React from 'react';
import {useEffect, useState} from "react";
import useCount from "./useCount";


const ToDo = () => {
  const [count, setCount] = useCount(0)

  return (
    <fieldset>
      <legend>ToDo</legend>
      {count}
      <div>
        <button onClick={() => setCount(count+1)}>UP</button>
      </div>
    </fieldset>
  );
};

export default ToDo;
