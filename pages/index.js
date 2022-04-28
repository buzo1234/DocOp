import Head from 'next/head';
import Image from 'next/image';
import Footer from './components/Footer';
import Header from './components/Header';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from '@firebase/firestore';
import { useRouter } from 'next/router';

export default function Home() {
  const [login, setLogin] = useState([]);
  const router = useRouter();
  const [phone, setPhone] = useState();
  const [pass, setPass] = useState();
  const [user, setUser] = useState('patient');

  const LogUserIn = () => {
    if (phone && pass) {
      console.log(phone, ' ', pass);
      if (user === 'patient') {
        onSnapshot(
          query(
            collection(db, 'patients'),
            where('patientcontact', '==', phone),
            where('password', '==', pass)
          ),

          (snapshot) => {
            console.log(snapshot.docs);
            setLogin(snapshot.docs);
            if (snapshot.docs[0]) {
              router.push(`/patient/${snapshot.docs[0].id}`);
            }
          }
        );
      } else {
        onSnapshot(
          query(
            collection(db, 'clinics'),
            where('cliniccontact', '==', phone),
            where('password', '==', pass)
          ),

          (snapshot) => {
            setLogin(snapshot.docs);
            if (snapshot.docs[0]) {
              router.push(`/clinic/${snapshot.docs[0].id}`);
            }
          }
        );
      }
    }
  };

  console.log(login);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header reg={true} />
      <div className='grid grid-cols-2 justify-center bg-bgg/80 py-10'>
        <div className='col-span-2 flex justify-center lg:col-span-1  '>
          <div className=' flex w-full flex-col items-center rounded-md p-5 '>
            <p className='m-6 p-5 text-center font-sans text-5xl font-bold'>
              Log In
            </p>

            <div className='flex w-full justify-center mb-5'>
              <div
                className={
                  user === 'patient'
                    ? 'text-lg px-3 py-1 bg-black text-white font-semibold rounded-full cursor-pointer'
                    : 'text-lg px-3 py-1 bg-bgg/10 text-black font-semibold rounded-full cursor-pointer'
                }
                onClick={() => setUser('patient')}
              >
                Patient
              </div>
              <div
                className={
                  user === 'clinic'
                    ? 'text-lg px-3 py-1 bg-black text-white font-semibold rounded-full cursor-pointer'
                    : 'text-lg px-3 py-1 bg-bgg/10 text-black font-semibold rounded-full cursor-pointer'
                }
                onClick={() => setUser('clinic')}
              >
                Clinic
              </div>
            </div>

            <input
              type='text'
              placeholder='Enter Contact Number'
              className='my-3 w-4/5 rounded-lg border-2 border-black px-3  py-2'
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type='password'
              placeholder='Enter Password'
              className='my-3 w-4/5 rounded-lg border-2 border-black px-3 py-2'
              onChange={(e) => setPass(e.target.value)}
            />

            <button
              className=' mb-10 mt-10 w-2/5 rounded-full bg-black text-2xl px-6 py-2 text-white'
              onClick={() => LogUserIn()}
            >
              Login
            </button>

            <p className='text-md'>
              Don&apos;t have an account?
              <Link href='/register' passHref>
                <span className='cursor-pointer px-3 font-bold text-red-600 text-lg underline'>
                  Register Now
                </span>
              </Link>
            </p>
          </div>
        </div>
        <div className='mx-auto hidden flex-col items-center lg:col-span-1 lg:block'>
          <Image
            alt='logo'
            src='/doctor-appointment-development.png'
            width={500}
            height={500}
            objectFit='contain'
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
