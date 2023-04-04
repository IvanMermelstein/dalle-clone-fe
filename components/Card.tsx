import React, { FC } from 'react';
import { download } from '@/public/assets';
import { downloadImage } from '@/utils';
import Image from 'next/image';

interface CardProps {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
}

const Card: FC<CardProps> = ({ _id, name, prompt, photo }) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <Image
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
        width={1024}
        height={1024}
      />
      <div className='group-hover:flex flex-col max-h-[95%] hidden absolute bottom-0 left-0 right-0 bg-gray-900 m-2 p-4 rounded-md'>
        <p className='text-white text-md overflow-y-auto prompt'>
          {prompt}
        </p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold'>
              {name[0]}
            </div>
            <p className='text-white text-sm'>
              {name}
            </p>
          </div>
          <button
            type='button'
            onClick={() => downloadImage(_id, photo)}
            className='outline-none bg-transparent border-none'
          >
            <Image
              src={download}
              alt='download'
              className='w-6 h-6 object-contain invert'
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;