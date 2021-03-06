import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { db, storage } from '../firebase';
import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import OtpInput from 'react-otp-input';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';

import { firebase } from '../firebase.js';
import { useRouter } from 'next/router';

function Patientregister() {
  const [name, setName] = useState('');
  const [cnumber, setCnumber] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('Male');
  const [spassword, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [status, setStatus] = useState(false);
  const [otp, setOtp] = useState('');

  const router = useRouter();

  const configurecaptcha = () => {
    console.log('Entered');
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      },
      auth
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    console.log('press hua');

    configurecaptcha();
    const auth = getAuth();

    const phoneNumber = '+91' + cnumber;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log('msg sent');
        window.confirmationResult = confirmationResult;
        setStatus(true);
        window.scrollTo(0, 0);
        // ...
      })
      .catch((error) => {
        console.log(error);
        alert('Some Error happened');
      });
  };

  const handleotp = (e) => {
    e.preventDefault();
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        // ...
        console.log('Correct');

        alert('Verified');
        confirmRouter();
        console.log('db inserted');
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log('wrong');
      });
  };

  const confirmRouter = async () => {
    let text1 = spassword;
    let text2 = cpassword;
    let result = text1.localeCompare(text2);
    if (
      name === '' ||
      cnumber === '' ||
      address === '' ||
      gender === '' ||
      spassword === '' ||
      cpassword === '' ||
      result !== 0
    ) {
      return;
    }

    const patient_details = {
      patientname: name,
      patientcontact: cnumber,
      patientaddress: address,
      gender: gender,
      password: spassword,
      timestamp: serverTimestamp(),
    };
    console.log('db post entered');
    const docRef = await addDoc(collection(db, 'patients'), patient_details);
    const data_id = docRef.id;
    localStorage.setItem('UserId', data_id);
    router.push(`/patient/${data_id}`);
  };
  const handleChange = (val) => setOtp(val);

  console.log(otp);
  return (
    <div>
      <Head>
        <title>DocOp</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <style>
        {`
            .custom-otp{
              display: flex;
              width:50%;
            }`}
      </style>

      <Header reg={true} />
      <div className='grid grid-cols-2 justify-center bg-bgg/80'>
        <div className='col-span-2 flex justify-center lg:col-span-1 '>
          {!status ? (
            <>
              <div className=' flex w-full flex-col items-center rounded-md p-5 '>
                <p className='m-6 p-5 text-center font-sans text-5xl font-bold'>
                  Register as a Patient
                </p>
                <form
                  action=''
                  onSubmit={(e) => onSignInSubmit(e)}
                  className='flex flex-col justify-center items-center w-full'
                >
                  {' '}
                  <div id='sign-in-button'></div>
                  <input
                    type='text'
                    placeholder='Enter Name'
                    className='my-3 w-4/5 rounded-lg border-2 border-black px-3  py-2'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type='tel'
                    placeholder='Enter Contact Number'
                    className='my-3 w-4/5  rounded-lg border-2 border-black px-3  py-2 relative'
                    value={cnumber}
                    onChange={(e) => setCnumber(e.target.value)}
                    pattern='^\d{10}$'
                    required
                  />
                  <input
                    type='text'
                    placeholder='Enter Address'
                    className='my-3 w-4/5  rounded-lg border-2 border-black px-3  py-2'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <div className='py-2'>
                    <label className='font-semibold'>Gender : </label>

                    <select
                      name='gender'
                      id='gender'
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className='rounded-lg p-3'
                    >
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                      <option value='mercedes'>Other</option>
                    </select>
                  </div>
                  <input
                    type='password'
                    placeholder='Set a Password'
                    className='my-3 w-4/5  rounded-lg border-2 border-black px-3 py-2'
                    value={spassword}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    type='password'
                    placeholder='Confirm password'
                    className='my-3 w-4/5 rounded-lg border-2 border-black px-3  py-2'
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    required
                  />
                  <button
                    className=' mb-10 mt-10  w-4/5 lg:w-2/5 rounded-full bg-black px-6 py-2 text-white text-center text-xl flex justify-center'
                    type='submit'
                  >
                    Proceed to OTP Verfication
                  </button>
                </form>

                <p className='text-md'>
                  Already have an account?
                  <Link href='/' passHref>
                    <span className='cursor-pointer px-3 font-bold text-lg text-red-600 underline'>
                      SignIn
                    </span>
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className='flex flex-col mx-auto h-screen'>
                <div>
                  <p className='text-xl font-semibold mx-3 my-10 text-center'>
                    Verify OTP sent to your mobile number
                  </p>
                </div>
                <form
                  action=''
                  onSubmit={(e) => handleotp(e)}
                  className='flex justify-center items-center flex-col'
                >
                  <OtpInput
                    numInputs={6}
                    value={otp}
                    onChange={handleChange}
                    className='flex space-x-3'
                    isInputNum={true}
                    inputStyle={{
                      margin: '0.3rem',
                      fontSize: '2rem',
                      borderRadius: 4,
                      border: '1px solid rgba(0,0,0,0.3)',
                    }}
                  ></OtpInput>
                  <button
                    className=' mb-10 mt-10  w-4/5 lg:w-2/5 rounded-full bg-black px-6 py-2 text-white text-center flex justify-center'
                    type='submit'
                  >
                    Verify and login
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
        <div className='mx-auto hidden h-full w-full items-center justify-center lg:col-span-1 lg:flex'>
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

export default Patientregister;
