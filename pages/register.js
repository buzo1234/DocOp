import Head from 'next/head';
import Image from 'next/image';
import Footer from './components/Footer';
import Header from './components/Header';
import Link from 'next/link';

export default function Register() {
  return (
    <div className='w-full'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='grid w-full grid-cols-2 justify-center bg-bgg/80 py-10'>
        <div className='col-span-2 w-full flex-col justify-center lg:col-span-1  items-center space-x-5'>
          <div className='flex flex-col justify-center h-full items-center space-y-16'>
            <Link href='/clinicregister'>
              <div className=' w-3/5 cursor-pointer  rounded-full bg-black  px-5 py-5 text-center text-2xl text-white shadow-lg'>
                Register as a Clinic
              </div>
            </Link>
            <Link href='/patientregister'>
              <div className=' w-3/5 cursor-pointer  rounded-full bg-black px-5 py-5 text-center text-2xl text-white shadow-lg'>
                Register as a Patient
              </div>
            </Link>
          </div>
        </div>
        <div className='mx-auto hidden flex-col items-center lg:col-span-1 lg:block'>
          <Image
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
