import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import ChatDoctor from './components/ChatDoctor';
import Header from './components/Header';

function chat() {
  const [usertext, setUsertext] = useState();
  const [disease, setDisease] = useState();
  const [days, setDay] = useState();
  const [othersym, setOthersym] = useState([]);
  const [sym, setSym] = useState([]);
  const [sev, setSev] = useState();
  const [description, setDescription] = useState();
  const [pdisease, setPresentDisease] = useState();
  const [prec, setPrec] = useState([]);

  useEffect(() => {
    console.log('entered');
    fetch('http://localhost:5000/', {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      Authorization: 'Bearer key',
    }).then((res) =>
      res.json().then((data) => {
        // Setting a data from api
        console.log(data);
      })
    );
  });

  async function clickHandler() {
    const text = { num_days: days, disease_input: disease };
    await fetch('http://localhost:5000/findPossibleSymptoms', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      },

      body: JSON.stringify(text),
    }).then((res) =>
      res.json().then((data) => {
        console.log('From Server : ', data);
        data.possibleSymptoms.map((sym) => {
          setOthersym((arr) => [...arr, sym]);
        });
      })
    );
  }

  async function clickHandler2() {
    const text = { have_symptoms: sym, ndays: days };
    await fetch('http://localhost:5000/find', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      },

      body: JSON.stringify(text),
    }).then((res) =>
      res.json().then((data) => {
        console.log('From Server : ', data.severity);
        setSev(data.severity);
      })
    );

    await fetch('http://localhost:5000/getDescription', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      },
    }).then((res) =>
      res.json().then((data) => {
        console.log('From Server : ', data.diseaseDesc);
        setDescription(data.diseaseDesc);
        setPresentDisease(data.disease);
        setPrec(data.precautions);
      })
    );
  }

  function addSym(symp) {
    setSym((arr) => [...arr, symp]);
  }

  console.log(sym);

  return (
    <div className='w-full'>
      <Header />
      <div className='flex flex-col max-w-5xl mx-auto p-10 mt-5'>
        <p className='text-xl font-bold mb-2'>Enter your Symptom : </p>
        <input
          type='text'
          placeholder='Enter Symptom'
          onChange={(e) => setDisease(e.target.value)}
          className='text-lg border-2 border-bgg mb-7 rounded-lg px-3'
        />
        <p className='text-xl font-bold mb-2'>
          From how many days are you experiencing it?
        </p>
        <input
          type='text'
          placeholder='Enter Number of Days'
          onChange={(e) => setDay(e.target.value)}
          className='text-lg border-2 border-bgg mb-7 rounded-lg px-3'
        />
        <input
          type='button'
          name=''
          id=''
          value='submit'
          onClick={() => clickHandler()}
          className='flex justify-center w-1/4 bg-bgg text-white font-semibold text-lg px-3 py-1 rounded-md cursor-pointer'
        />
        {othersym.length > 1 ? (
          <p className='font-bold text-xl mt-10'>
            Are you expericing any of it?
          </p>
        ) : (
          ''
        )}
        <div className='flex flex-col w-full'>
          {othersym
            ? othersym.map((sym) => (
                <div
                  className='flex w-full justify-between bg-gray-200 px-2 py-1 my-2 cursor-pointer'
                  onClick={() => addSym(sym)}
                >
                  <p>{sym}</p>
                </div>
              ))
            : ''}
        </div>
        <div className='flex flex-wrap w-full'>
          {sym.map((item) => (
            <p className='px-2 mx-1 my-1 py-1 rounded-lg text-white font-bold bg-black'>
              {item}
            </p>
          ))}
        </div>
        {sym.length > 1 ? (
          <input
            type='button'
            className='flex justify-center w-1/4 bg-bgg text-white font-semibold text-lg px-3 py-1 rounded-md cursor-pointer'
            value='submit'
            onClick={() => clickHandler2()}
          />
        ) : (
          ''
        )}
        {sev === 'high' ? (
          <div className='flex flex-col w-full'>
            <p className='mt-5 text-xl font-bold'>
              According to the predicted Severity :
            </p>
            <p>Please Consult a Doctor, Severity is HIGH</p>
          </div>
        ) : (
          ''
        )}
        ;
        {sev === 'low' ? (
          <div className='flex flex-col w-full'>
            <p className='mt-5 text-xl font-bold'>
              According to the predicted Severity :
            </p>
            <p>Severity is LOW, No need to panic</p>
          </div>
        ) : (
          ''
        )}
        {pdisease && description ? (
          <div>
            <p className='mt-5 font-bold text-xl'>Predicted Disease : </p>
            <p className='text-lg'>{pdisease}</p>
            <p className='mt-5 font-bold text-xl'>Description : </p>
            <p className='text-lg'>{description}</p>
            <p className='mt-5 font-bold text-xl'>
              Some Precautions you can take :{' '}
            </p>
            {prec.map((p) => (
              <p className='pl-3 text-lg'>{p}</p>
            ))}
            <div className='flex bg-gray-200 rounded-md py-3 px-2'>
              <ChatDoctor cid='uGe2mCyYTtrEy1KRXOBk' user={'sdasdadadadacaf'} />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default chat;
