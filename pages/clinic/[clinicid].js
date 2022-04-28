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
  orderBy,
} from '@firebase/firestore';
import Header from '../components/Header';
import { ClinicInfo } from '../components/ClinicInfo';
import { DoctorList } from '../components/DoctorList';
import AddDForm from '../components/AddDForm';

function Clinic() {
  const router = useRouter();
  const clinicid = router.query.clinicid;
  const [clinicdata, setClinicdata] = useState([]);
  const [see, setSee] = useState(false);
  const [data, setData] = useState({});
  const [submit, setSubmit] = useState(false);
  const [docdata, setDocData] = useState([]);
  const [bookdata, setBookData] = useState([]);
  console.log(see);

  useEffect(() => {
    if (clinicid) {
      onSnapshot(
        query(collection(db, 'clinics'), where('__name__', '==', clinicid)),

        (snapshot) => {
          setClinicdata(snapshot.docs);
        }
      );
      onSnapshot(
        query(collection(db, 'doctors'), where('clinicId', '==', clinicid)),
        orderBy('timestamp'),
        (snapshot) => {
          setDocData(snapshot.docs);
        }
      );
      onSnapshot(
        query(collection(db, 'bookings'), where('clinicId', '==', clinicid)),
        orderBy('timestamp'),
        (snapshot) => {
          setBookData(snapshot.docs);
        }
      );
    }
  }, [router, clinicid]);

  useEffect(() => {
    if (submit) {
      const addNewDoctor = async () => {
        const docRef = await addDoc(collection(db, 'doctors'), data);
        const data_id = docRef.id;
        alert('Doctor added with id: ' + data_id);
      };

      addNewDoctor();
      setSubmit(false);
      setSee(false);
    }
  }, [submit]);

  console.log(docdata);

  return (
    <div>
      {/* Navigation */}
      <div>
        <Header />
      </div>

      {/* {clinicdata.map((clinic) => (
        <ul key={clinic.id}>
          <li>Clinic id : {clinic.id}</li>
          <li>Clinic Name : {clinic.data().clinicname}</li>
          <li>Clinic Number : {clinic.data().cliniccontact}</li>
          <li>Clinic Address : {clinic.data().clinicaddress}</li>
          <li>Clinic Fee : {clinic.data().clinicfee}</li>
        </ul>
      ))} */}

      {/* CLinicInfo */}
      {clinicdata[0] ? (
        <ClinicInfo
          name={clinicdata[0].data().clinicname}
          address={clinicdata[0].data().clinicaddress}
        />
      ) : (
        ''
      )}

      <div className='flex flex-col w-full  '>
        {!see ? (
          <div className='flex w-full justify-center'>
            <input
              type='button'
              name='adoc'
              id='adoc'
              className='bg-blue-500 rounded-lg text-white p-3 text-xl font-bold m-5 cursor-pointer'
              value='Add a doctor'
              onClick={() => setSee(true)}
            />
          </div>
        ) : (
          ''
        )}
        {see ? (
          <div className='flex w-full justify-center '>
            <AddDForm
              setview={setSee}
              setFormData={setData}
              setsent={setSubmit}
              cid={clinicid}
            />
          </div>
        ) : (
          ''
        )}
      </div>

      {/* Doctor list */}
      <div className='flex w-full flex-col p-10'>
        <p className='text-2xl font-semibold'>Doctor List</p>
        <DoctorList docdata={docdata} bookdata={bookdata} />
      </div>
    </div>
  );
}

export default Clinic;
