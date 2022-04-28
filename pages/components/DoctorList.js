import React, { useEffect } from 'react';
import DoctorCard from './DoctorCard';

export const DoctorList = ({ docdata, bookdata }) => {
  return (
    <div>
      {/* Doctor Card */}
      {docdata.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          id={doctor.id}
          name={doctor.data().name}
          gender={doctor.data().gender}
          img={doctor.data().profile}
          average={doctor.data().avgTime}
          special={doctor.data().speciality}
          days={doctor.data().working}
          slots={doctor.data().slots}
          bookings={bookdata}
        />
      ))}
    </div>
  );
};
