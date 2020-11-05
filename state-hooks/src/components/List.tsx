import React, {useState} from 'react';
import useCount from "./useCount";

const List = () => {
  const [count, setCount] = useCount()

  return (
    <fieldset>
      <legend>Count output</legend>
      Count is: {count}
    </fieldset>
  );
};

export default List;
