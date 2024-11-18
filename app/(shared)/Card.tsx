import Link from 'next/link';
import React from 'react';
import { Post } from '../page';

type Props = {
  className?: string;
  post: Post;
  imageHeight: string;
  isSmallCard?: boolean;
  isLongForm?: boolean;
};

const Card = ({
  className,
  imageHeight,
  post,
  isSmallCard,
  isLongForm,
}: Props) => {
  const { id, title, author, created_at, snippet } = post || {};
  const date = new Date(created_at);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-US', options);
  // console.log(date);
  return (
    <div className={className}>
      <Link
        className="basis-full hover:opacity-70"
        href={`${process.env.NEXT_PUBLIC_URL}/post/${id}`}
      >
        <div className={`relative w-auto mb-3 ${imageHeight}`}>image</div>
      </Link>
      <div className="basis-full">
        <Link href={`${process.env.NEXT_PUBLIC_URL}/post/${id}`}>
          <h4
            className={`font-bold hover:text-accent-green ${
              isSmallCard ? 'text-base line-clamp-2' : 'text-lg'
            }`}
          >
            {title}
          </h4>
        </Link>

        <div className={`${isSmallCard ? 'my-2' : 'flex my-3'} gap-3`}>
          <h5 className="px-1 font-semibold text-xs">{author}</h5>
          <h6 className="px-1 text-wh-300 text-xs">{formattedDate}</h6>
        </div>
        <p
          className={`text-wh-100 ${
            isLongForm ? 'line-clamp-5' : 'line-clamp-3'
          }`}
        >
          {snippet}
        </p>
      </div>
    </div>
  );
};

export default Card;
