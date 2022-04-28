import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default ClinicInfo = ({ name, address }) => {
  return (
    <div className='flex w-full z-20 bg-white justify-between sticky top-0 items-center p-2 border-b-[1.5px] border-gray-300 '>
      <div className='text-2xl font-semibold flex w-full px-7 '>{name}</div>
      <div className='flex w-full justify-center items-center'>
        <div className='flex space-x-3'>
          <LocationOnIcon />
          <p className='truncate flex w-3/4'>{address}</p>
        </div>
      </div>
    </div>
  );
};
