import React, { useEffect, useState } from 'react';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';

import { firebase } from '../firebase.js';

function Verification() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
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

    const phoneNumber = '+91' + phone;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log('msg sent');
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        console.log(error);
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
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log('wrong');
      });
  };
  return (
    <div>
      <form action='' onSubmit={(e) => onSignInSubmit(e)}>
        <div id='sign-in-button'></div>
        <input
          type='text'
          placeholder='Enter Contact Number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type='submit'>Send OTP</button>
      </form>
      <form action='' onSubmit={(e) => handleotp(e)}>
        <input
          type='text'
          placeholder='enter otp'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type='submit'>Verify</button>
      </form>
    </div>
  );
}
export default Verification;
