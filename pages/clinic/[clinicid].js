import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { db, storage } from '../../firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
} from '@firebase/firestore';

function Clinic() {
  const router = useRouter();
  const clinicid = router.query.clinicid;
  const [clinicdata, setClinicdata] = useState([]);

  useEffect(() => {
    if (clinicid) {
      console.log(clinicid);
      onSnapshot(
        query(collection(db, 'clinics'), where('__name__', '==', clinicid)),
        (snapshot) => {
          setClinicdata(snapshot.docs);
        }
      );
    }
  }, [router]);

  console.log(clinicdata);

  return (
    <div>
      {clinicdata.map((clinic) => (
        <ul key={clinic.id}>
          <li>Clinic id : {clinic.id}</li>
          <li>Clinic Name : {clinic.data().clinicname}</li>
          <li>Clinic Number : {clinic.data().cliniccontact}</li>
          <li>Clinic Address : {clinic.data().clinicaddress}</li>
          <li>Clinic Fee : {clinic.data().clinicfee}</li>
        </ul>
      ))}
    </div>
  );
}

export default Clinic;
