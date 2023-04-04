import FormField from '@/components/FormField';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import getRandomPrompt from '../utils/index';
import { preview } from '@/public/assets';
import Image from 'next/image';
import Loader from '@/components/Loader';

const CreatePost = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt })
        });

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        console.log(error);
      }
      finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };

  return (
    <form
      className='mt-16 max-w-7xl mx-auto'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col gap-5'>
        <FormField
          labelName='Your name'
          type='text'
          name='name'
          placeholder='John Doe'
          value={form.name}
          handleChange={handleChange}
        />
        <FormField
          labelName='Prompt'
          type='text'
          name='prompt'
          placeholder={getRandomPrompt('')}
          value={form.prompt}
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMe={handleSurpriseMe}
        />
        <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
          <Image
            unoptimized
            src={form?.photo ? form.photo : preview}
            alt={form?.photo ? form.prompt : 'preview'}
            width={50}
            height={50}
            className={form?.photo ? 'w-full h-full object-contain' : 'w-9/12 h-9/12 object-contain opacity-40'}
          />
          {
            generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-md'>
                <Loader />
              </div>
            )
          }
        </div>
      </div>
      <div className='mt-5 flex gap-5'>
        <button
          type='button'
          onClick={generateImage}
          className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          {
            generatingImg ? 'Generating...' : 'Generate'
          }
        </button>
      </div>
      <div className='mt-10'>
        <p className='mt-2 text-gray-500 text-sm'>
          Once you have created the image you want, you can share it with others in the community
        </p>
        <button
          type='submit'
          className='mt-3 text-white bg-indigo-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          {loading ? 'Sharing' : 'Share with the community'}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
