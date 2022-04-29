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
import SearchIcon from '@mui/icons-material/Search';
import ClinicDisplay from '../components/ClinicDisplay';
import SearchResults from '../components/SearchResults';

function Clinic() {
  const router = useRouter();
  const patientid = router.query.patientid;
  const [patientdata, setPatientdata] = useState([]);
  const [search, setSearch] = useState('');
  const [clinicdata, setClinicData] = useState([]);
  const [doctordata, setDoctorData] = useState([]);

  useEffect(() => {
    if (patientid) {
      onSnapshot(
        query(collection(db, 'patients'), where('__name__', '==', patientid)),

        (snapshot) => {
          setPatientdata(snapshot.docs);
        }
      );
      onSnapshot(
        query(collection(db, 'clinics')),
        orderBy('timestamp'),
        (snapshot) => {
          setClinicData(snapshot.docs);
        }
      );
      onSnapshot(
        query(collection(db, 'doctors')),
        orderBy('timestamp'),
        (snapshot) => {
          setDoctorData(snapshot.docs);
        }
      );
    }
  }, [router]);
  /*
  useEffect(() => {
    if (submit) {
      addNewDoctor();
      setSubmit(false);
      setSee(false);
    }
  }, [submit]);

  console.log(docdata);

  const addNewDoctor = async () => {
    const docRef = await addDoc(collection(db, 'doctors'), data);
    const data_id = docRef.id;
    alert('Doctor added with id: ' + data_id);
  };
 */

  function searchHandler() {
    console.log(search);
  }

  return (
    <div>
      {/* Navigation */}
      <div>
        <Header />
      </div>

      {patientdata[0] ? (
        <div>
          <div>
            <p className='mt-3 px-10 text-2xl font-semibold'>
              Welcome,
              <span className='text-4xl font-bold'>
                {' '}
                {patientdata[0].data().patientname}
              </span>
            </p>
          </div>
          <div className='flex w-full justify-center sticky top-0 left-0 bg-white pb-5 z-20'>
            <div className='flex justify-between w-2/4 border-[1.5px] border-black rounded-full pr-3 pl-4 py-3 mt-3'>
              <input
                type='text'
                placeholder='Search for Doctors'
                className='outline-none font-semibold w-full'
                onChange={(e) => setSearch(e.target.value)}
              />
              <div onClick={() => searchHandler()}>
                <SearchIcon className='cursor-pointer' />
              </div>
            </div>
          </div>
          <div>
            {/* Search Results */}
            <SearchResults
              docdata={doctordata}
              val={search}
              user={patientdata[0]}
            />
          </div>
          <div className='w-full mt-5 px-7'>
            <p className='px-3 font-bold text-2xl mb-3'>Clinics near you</p>
            {/* hospital category including all the doctors and some details */}
            <ClinicDisplay hosData={clinicdata} user={patientdata[0]} />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Clinic;
