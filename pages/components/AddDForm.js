import React, { useState } from 'react';
import List from './List';
import Image from 'next/image';
import Multiselect from 'multiselect-react-dropdown';
import { serverTimestamp } from '@firebase/firestore';

const AddDForm = ({ setview, setFormData, setsent, cid }) => {
  const [purl, setpurl] = useState(
    'data:image/png;base64,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'
  );

  const [dname, setdname] = useState('');
  const [gender, setgender] = useState('');

  const [time1, settime1] = useState();
  const [time2, settime2] = useState();
  const [avg, setavg] = useState();

  const days = [
    { name: 'Monday', id: 1 },
    { name: 'Tuesday', id: 2 },
    { name: 'Wednesday', id: 3 },
    { name: 'Thursday', id: 4 },
    { name: 'Friday', id: 5 },
    { name: 'Saturday', id: 6 },
    { name: 'Sunday', id: 7 },
  ];
  const [sdays, setDays] = useState([]);
  const [special, setSpecial] = useState([]);

  function onSelect(selectedList, selectedItem) {
    setDays((selectList) => [...selectList, selectedItem]);
  }

  function onRemove(selectedList, removedItem) {
    setDays(sdays.filter((item) => item != removedItem));
  }

  function formHandler() {
    const numSlots = Number((time2 - time1) / avg);
    let localSlots = [];
    for (var i = 0; i < numSlots; i++) {
      let start = Number(Number(time1) + Number(i * avg));
      let status = false;
      let slot = { start, status };
      localSlots.push(slot);
    }

    const formdata = {
      clinicId: cid,
      name: dname,
      profile: purl,
      gender: gender,
      speciality: special,
      working: sdays,
      timeFrom: time1,
      timeTo: time2,
      avgTime: avg,
      slots: localSlots,
      timestamp: serverTimestamp(),
    };

    setFormData(formdata);
    setsent(true);
  }

  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <div className='flex w-full justify-center m-5'>
        <Image
          src={purl}
          width={200}
          height={200}
          className='rounded-full'
          objectFit='cover'
        />
      </div>
      <form action='' className=' w-3/4 flex justify-center '>
        <table className='table-fixed '>
          <tbody>
            <tr>
              <td className='text-left'>Name:</td>
              <td className='flex justify-center'>
                <input
                  type='text'
                  placeholder='Enter name'
                  className='flex w-64 border-[1.5px] px-2 py-1 border-black rounded-lg m-3'
                  onChange={(e) => setdname(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className='text-left'>Profile Image url:</td>
              <td className='flex justify-center'>
                <input
                  type='text'
                  placeholder='Enter url'
                  className='flex w-64 border-[1.5px] px-2 py-1 border-black rounded-lg m-3'
                  onChange={(e) => setpurl(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className='text-left'>Gender:</td>
              <td className='flex justify-evenly items-center'>
                <div>
                  <input
                    name='gender'
                    type='radio'
                    className='border-[1.5px] px-2 py-1 border-black rounded-lg m-3'
                    value='Male'
                    onChange={(e) => setgender(e.target.value)}
                  />
                  Male
                </div>
                <div>
                  <input
                    name='gender'
                    type='radio'
                    className='border-[1.5px] px-2 py-1 border-black rounded-lg m-3'
                    value='Female'
                    onChange={(e) => setgender(e.target.value)}
                  />
                  Female
                </div>
              </td>
            </tr>
            <tr>
              <td className='text-left'>Specialities:</td>
              <td className='flex justify-center items-center'>
                <div className='flex border-[1.5px] border-black rounded-lg justify-center px-1 py-1 max-h-44 overflow-y-auto w-64 overflow-x-hidden m-3 '>
                  <List setlist={setSpecial} />
                </div>
              </td>
            </tr>
            <tr>
              <td className='text-left'>Working Days:</td>
              <td className='flex justify-center items-center'>
                <div className='flex w-64 border-black rounded-lg border-[1.5px]'>
                  <Multiselect
                    options={days}
                    displayValue='name'
                    onSelect={onSelect}
                    onRemove={onRemove}
                    style={{
                      multiselectContainer: {},
                      searchBox: {
                        border: 'none',
                      },
                    }}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className='text-left'>Working Hours:</td>
              <td className='flex justify-center items-center w-64  ml-3'>
                <td className='flex flex-col justify-center items-center'>
                  <input
                    type='number'
                    placeholder='time'
                    className='border-[1.5px] px-2 py-1 border-black w-20 rounded-lg m-3'
                    onChange={(e) => settime1(e.target.value)}
                  />
                </td>
                <td>
                  <p className='p-4'>to</p>
                </td>
                <td className='flex flex-col items-center '>
                  <input
                    type='number'
                    placeholder='time'
                    className='border-[1.5px] px-2 py-1 border-black w-20 rounded-lg m-3'
                    onChange={(e) => settime2(e.target.value)}
                  />
                </td>
              </td>
            </tr>
            <tr>
              <td className='text-left'>Average patient time:</td>
              <td className='flex justify-center items-center'>
                <input
                  required
                  type='number'
                  placeholder='Enter time in hours'
                  className='border-[1.5px] px-2 py-1 border-black rounded-lg m-3 w-64'
                  onChange={(e) => setavg(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td className='flex w-full justify-end space-x-3 items-center'>
                <td>
                  <input
                    type='button'
                    value='Cancel'
                    className='border-bgg border-2 w-28 py-1 px-3 text-center text-bgg font-semibold text-lg rounded-lg cursor-pointer '
                    onClick={() => setview(false)}
                  />
                </td>
                <td>
                  <input
                    type='button'
                    value='Add Doctor'
                    className='bg-bgg text-center text-white font-semibold text-lg px-3 py-2 rounded-lg cursor-pointer'
                    onClick={() => formHandler()}
                  />
                </td>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddDForm;
