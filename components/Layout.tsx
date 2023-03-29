import Link from 'next/link';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import { logo } from '../public/assets';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link href={'/'}>
          <Image
            src={logo}
            alt='logo'
            width={100}
            height={50}
            className='w-28 object-contain'
          />
        </Link>
        <Link
          href={'/createPost'}
          className='font-medium bg-indigo-500 text-white px-4 py-2 rounded-md'
        >
          Create
        </Link>
      </header>
      <main
        className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] h-full min-h-[calc(100vh-73px)]'
      >
        {children}
      </main>
    </>
  );
};

export default Layout;