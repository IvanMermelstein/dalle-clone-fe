import CardList from '@/components/CardList';
import FormField from '@/components/FormField';
import Loader from '@/components/Loader';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState<any>();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        console.log(e.target.value);
        const searchResults = allPosts.filter((item: any) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.prompt.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div className='mt-16'>
        <FormField
          labelName='Search posts'
          type='text'
          name='text'
          placeholder='Search posts'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className='mt-10'>
        {
          loading ? (
            <div className='flex justify-center items-center'>
              <Loader />
            </div>
          ) : (
            <>
              {
                searchText && (
                  <h2 className='font-medium text-gray-400 text-xl mb-3'>
                    Showing results for
                    {' '}
                    <span className='text-gray-900 '>
                      {searchText}
                    </span>
                  </h2>
                )
              }
              <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                <CardList
                  data={searchText ? searchedResults : allPosts}
                  title={searchText ? 'No search results found' : 'No posts found'}
                />
              </div>
            </>)
        }
      </div>
    </section>
  );
};

export default Home;