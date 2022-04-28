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
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from '@firebase/firestore';
import Image from 'next/image';

const DoctorCardHome = ({ cid, user }) => {
  const [docdata, setDocdata] = useState([]);
  const [bookdata, setBookdata] = useState([]);
  const [confirm, setConfirm] = useState({});

  useEffect(() => {
    if (cid) {
      onSnapshot(
        query(collection(db, 'doctors'), where('clinicId', '==', cid)),

        (snapshot) => {
          setDocdata(snapshot.docs);
        }
      );
    } else {
      console.log('loading');
    }
  }, [cid]);

  async function confirmRouter() {
    console.log('entered');
    console.log(confirm);
    if (confirm.docid !== undefined && confirm.startTime !== undefined) {
      const booking_details = {
        userId: user.id,
        patient: user.data().patientname,
        clinicId: cid,
        docId: confirm.docid,
        slot: confirm.startTime,
        timestamp: serverTimestamp(),
      };
      console.log(booking_details);
      const docRef = await addDoc(collection(db, 'bookings'), booking_details);
      alert(`Booking added with id ${docRef.id}`);

      const updateRef = doc(db, 'doctors', confirm.docid);
      try {
        await updateDoc(updateRef, {
          slots: arrayRemove({ start: confirm.startTime, status: false }),
        });
        await updateDoc(updateRef, {
          slots: arrayUnion({ start: confirm.startTime, status: true }),
        });
      } catch (err) {
        alert(err);
      }
    }
  }

  useEffect(() => {
    if (confirm.doc !== '' && confirm.startTime !== '') {
      confirmRouter();
    }
  }, [confirm]);

  const addSlot = (a, index, b, c) => {
    let booking = { docid: a, indexId: index, slotStart: b };

    if (c !== true) {
      setBookdata(bookdata.filter((item) => item.docid !== a));
      setBookdata((arr) => [...arr, booking]);
    }
  };

  const deleteSlot = (id) => {
    setBookdata(bookdata.filter((item) => item.docid !== id));
  };
  console.log(bookdata);

  const confirmBooking = (doc, start, index) => {
    let booking = { docid: doc, slotId: index, startTime: start };
    setConfirm(booking);
  };

  return (
    <div className='flex w-full overflow-x-auto'>
      {docdata[0] ? (
        <div className='flex'>
          {docdata.map((doc) => (
            <>
              <div className='flex flex-col justify-center items-center w-96 py-1 px-1 mx-3 bg-white rounded-sm mb-2'>
                <div className='flex'>
                  <div className='flex w-full space-x-2'>
                    <Image
                      alt='image'
                      src={doc.data().profile}
                      width='380'
                      height='380'
                      objectFit='cover'
                      className='rounded-sm w-full'
                    />
                    <div className='flex flex-col w-full '>
                      <p className='font-bold text-lg'>{doc.data().name}</p>
                      <p className='font-semibold text-sm mt-2'>
                        Specialities:
                      </p>
                      <div className='flex flex-wrap'>
                        {doc.data().speciality.map((special, index) => (
                          <p
                            key={special + index}
                            className='bg-black text-white px-1 py-1 mx-1 my-1 rounded-lg text-sm'
                          >
                            {special}
                          </p>
                        ))}
                      </div>
                      <p className='font-semibold text-sm mt-2'>
                        Working Days:
                      </p>

                      <div className='flex flex-wrap'>
                        {doc.data().working.map((day, index) => (
                          <p
                            key={day + index}
                            className=' px-1  rounded-lg text-sm'
                          >
                            {day.name},
                          </p>
                        ))}
                      </div>
                      <p className='font-semibold text-sm mt-2'>
                        Patient Time:{' '}
                        <span className='font-bold'>
                          {doc.data().avgTime} hrs
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='w-full'>
                  <p className='font-semibold mt-2'>Available Slots:</p>
                  <div className='flex w-full overflow-x-auto  '>
                    {doc.data().slots.map((slot, index) => (
                      <div
                        key={slot + index}
                        className={
                          slot.status
                            ? 'flex shrink-0 px-2 py-1 rounded-lg w-fit mx-1  my-1 bg-red-300'
                            : 'flex shrink-0 px-2 py-1 rounded-lg w-fit mx-1  my-1 bg-green-300 cursor-pointer focus:border-2 focus:border-green-500'
                        }
                        onClick={() =>
                          addSlot(doc.id, index, slot.start, slot.status)
                        }
                      >
                        <p className='font-semibold'>
                          {slot.start} -{' '}
                          {slot.start + Number(doc.data().avgTime)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex w-full px-2 py-1'>
                  {bookdata.map((book) => {
                    if (book.docid == doc.id) {
                      return (
                        <>
                          <div className='flex flex-col w-full'>
                            <p className=' font-semibold'>
                              Selected Slot:{' '}
                              <span className='font-bold'>
                                {book.slotStart} to{' '}
                                {Number(book.slotStart) +
                                  Number(doc.data().avgTime)}
                              </span>
                            </p>
                            <div className='grid grid-cols-2 mt-3'>
                              <button
                                className='col-span-1 border-2 border-bgg rounded-lg px-2 py-1 mx-5'
                                onClick={() => deleteSlot(doc.id)}
                              >
                                Cancel
                              </button>
                              <button
                                className='col-span-1 justify-center bg-bgg px-2 py-1 rounded-lg text-white font-semibold mx-5'
                                onClick={() =>
                                  confirmBooking(
                                    doc.id,
                                    book.slotStart,
                                    book.index
                                  )
                                }
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        <div className='flex justify-center'>
          <h2>No Doctors Found!</h2>
        </div>
      )}
    </div>
  );
};

export default DoctorCardHome;
