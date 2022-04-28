import React, { useState } from 'react';
import Image from 'next/image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DoctorCard = ({
  img,
  name,
  gender,
  special,
  days,
  average,
  slots,
  bookings,
  id,
}) => {
  const [status, setStatus] = useState(false);
  return (
    <div className='grid grid-cols-8 w-full bg-gray-100 rounded-lg p-3 m-3 items-center justify-center'>
      {/* Image with Name, Gender, Specialities, working days, average patient time */}
      <div className='col-span-2'>
        <Image
          src={img}
          width={150}
          height={150}
          objectFit='cover'
          className='rounded-full'
        />
      </div>
      <div className='col-span-6 bg-white p-2 rounded-lg'>
        <p className='text-xl font-bold'>{name}</p>
        <p>{gender}</p>
        <p>Average Patient Time : {average} hrs</p>
        <p className='font-semibold'>Specialities</p>
        <div className='flex space-x-2 space-y-1'>
          {special.map((quality) => (
            <p className='px-2 py-1 bg-bgg rounded-lg text-white text-lg'>
              {quality}
            </p>
          ))}
        </div>
        <p className='font-semibold'>Working Days</p>
        <div className='flex space-x-2 space-y-1'>
          {days.map((day) => (
            <p className='px-2 py-1 bg-black text-white rounded-lg'>
              {day.name}
            </p>
          ))}
        </div>
      </div>
      <p className='font-semibold'>Slots</p>
      <div className='flex col-span-8 w-full overscroll-x-none space-x-1  justify-center'>
        <div className='grid grid-cols-8 w-full gap-1 grid-rows-1'>
          {slots.map((slot) => (
            <div
              className={
                slot.status
                  ? 'col-span-1 px-2 py-1 justify-center overscroll-hidden flex font-semibold border-[1.5px] border-red-600 mx-1 my-1 bg-red-200 text-black rounded-lg w-full'
                  : 'col-span-1 px-2 py-1 justify-center overscroll-hidden flex font-semibold border-[1.5px] border-green-600 mx-1 my-1 bg-green-200 text-black rounded-lg w-full'
              }
            >
              <p>
                {slot.start} - {slot.start + Number(average)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='col-span-2'>
        <button
          className='bg-bgg text-white py-1 px-2 rounded-sm mt-2 mb-1'
          onClick={() => (status ? setStatus(false) : setStatus(true))}
        >
          {status ? 'Hide ' : 'Show '}
          Bookings <ChevronRightIcon />
        </button>
      </div>
      {status ? (
        <div className='col-span-8 grid grid-cols-2 flex-col w-full'>
          {bookings.map((book) => {
            if (book.data().docId === id) {
              console.log('ent');
              return (
                <>
                  <div className='col-span-2 grid grid-cols-2 w-full py-1 my-1 px-3 bg-white rounded-md '>
                    <p className='col-span-1 font-semibold'>
                      Patient Name:{' '}
                      <span className='font-bold text-lg'>
                        {book.data().patient}
                      </span>
                    </p>
                    <p className='col-span-1 font-semibold'>
                      From Time:{' '}
                      <span className='font-bold text-lg'>
                        {book.data().slot}
                      </span>
                    </p>
                  </div>
                </>
              );
            }
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default DoctorCard;
