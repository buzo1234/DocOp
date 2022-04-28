import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import DoctorCardHome from './DoctorCardHome';

const ClinicDisplay = ({ hosData, user }) => {
  return (
    <div className='flex w-full flex-col'>
      {hosData.map((clinic) => (
        <div className='px-3 py-1 bg-gray-200 my-1 mx-2'>
          <div key={clinic.id} className='grid grid-cols-5  mb-3 mt-2'>
            <div className='col-span-3'>
              <p className='text-xl font-semibold'>
                {clinic.data().clinicname}
              </p>
            </div>
            <div className='col-span-1 '>
              <p>
                <CallIcon />
                {clinic.data().cliniccontact}
              </p>
            </div>
            <div className='col-span-1 '>
              <p className='truncate px-3 mx-2'>
                <LocationOnIcon />
                {clinic.data().clinicaddress}
              </p>
            </div>
          </div>
          <div className='flex'>
            <DoctorCardHome cid={clinic.id} user={user} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClinicDisplay;
