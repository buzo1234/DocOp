import React, { useEffect, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

function List({ setlist }) {
  const [list, setList] = useState(['']);
  const [value, setValue] = useState('');

  function deletenode(n) {
    setList(list.filter((item) => item != list[n]));
  }
  setlist(list);

  function printout() {
    if (list[0] === '' && list.length === 1) {
      list.pop();
    }
    return (
      <div className='flex flex-wrap  justify-start w-full '>
        {list.map((e, index) => (
          <div
            className=' flex items-center rounded-xl  bg-black text-white text-md py-1  pl-2 text-center my-1 mx-1 h-fit'
            key={e + index}
          >
            {e}{' '}
            <span
              className='mx-1 cursor-pointer rounded-sm px-1 text-center font-black text-white '
              onClick={() => deletenode(index)}
            >
              <CancelIcon style={{ fontSize: '17px' }} />
            </span>
          </div>
        ))}
        <input
          type='text'
          id='textbox'
          value={value}
          placeholder='Enter Speciality'
          className='  w-full justify-center sticky -bottom-1 border-t-[1.3px] border-gray-300 outline-0 '
          onKeyPress={(e) => {
            let flag = 0;
            if (
              (e.key === ',' || e.key === 188) &&
              value !== '' &&
              !list.find((val) => val === value)
            ) {
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
  return <div className='flex w-full justify-center '>{printout()}</div>;
}

export default List;
