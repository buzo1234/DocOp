import React, { useEffect, useState } from 'react';

function List() {
  const [list, setList] = useState(['']);
  const [value, setValue] = useState('');

  console.log(list);

  function deletenode(e) {
    console.log(e);
    let n = list.indexOf(e);
    console.log(n);
    const result = list.filter(checkAdult);

    function checkAdult(ele) {
      return ele !== e;
    }

    setList(result);
  }

  function printout() {
    if (list[0] === '' && list.length === 1) {
      list.pop();
    }
    return (
      <div className='flex flex-wrap items-center justify-center '>
        {list.map((e) => (
          <div
            className='my-3 mx-3 flex items-center rounded-lg bg-blue-200 px-3 py-1 text-center'
            key={e}
          >
            {e}{' '}
            <span
              className='mx-2 cursor-pointer rounded-md bg-red-500 p-3 text-center font-black text-black '
              onClick={() => deletenode(e)}
            >
              x
            </span>
          </div>
        ))}
        <input
          type='text'
          id='textbox'
          value={value}
          placeholder='Enter a tag'
          className='font-semi-bold flex bg-backg py-3 px-4  text-white placeholder-white placeholder-opacity-100 outline-none'
          onKeyPress={(e) => {
            let flag = 0;
            if (e.code === 'Enter' && value !== '   ') {
              flag = 1;
              let item = value;
              setList((arr) => [...arr, item]);
            }
            if (flag === 1) {
              setValue('');
            }
            flag = 0;
          }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          autoFocus={false}
        />
      </div>
    );
  }
  return (
    <div className='mx-auto flex h-screen items-center justify-center '>
      <style>{'body { background-color: #4299e1; }'}</style>
      <div className='m-3 flex border-2 border-white'>{printout()}</div>
    </div>
  );
}

export default List;
