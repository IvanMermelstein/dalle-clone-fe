import { FC } from 'react';
import Card from './Card';

interface CardListProps {
  data: any,
  title: string
}

const CardList: FC<CardListProps> = ({ data, title }) => {
  if (data?.length <= 0) {
    return (
      <h2 className='mt-5 font-bold text-indigo-500 text-xl uppercase'>
        {title}
      </h2>);
  }

  return (
    data?.map((post: any) => (
      <Card
        key={post.id}
        {...post}
      />
    ))
  );
};

export default CardList;