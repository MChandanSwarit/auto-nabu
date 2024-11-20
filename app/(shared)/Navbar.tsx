// import Image from 'next/image'
import Link from 'next/link';
import React from 'react';
import SocialLinks from './SocialLinks';
import Image from 'next/image';
import Ad1 from '../../public/assets/ad-1.jpg'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Navbar = (props: Props) => {
  return (
    <header className="mb-5">
      <nav className="flex justify-between items-center w-full bg-wh-900 text-wh-10 px-10 py-4">
        <div className="hidden sm:block">
          <SocialLinks />
        </div>
        <div className="flex justify-between items-center gap-10">
          <Link href="/">Home</Link>
          <Link href="/">Trending</Link>
          <Link href="/">About</Link>
        </div>
        <div>
          <p>Sign In</p>
        </div>
      </nav>
      <div className="flex justify-between gap-8 mt-5 mb-4 mx-10">
        <div className="basis-2/3 md:mt-3">
          <h1 className="font-bold text-3xl md:text-5xl">
            AUTO NABU : BLOG OF THE FUTURE
          </h1>
          <p className="text-sm mt-3">Powered by AI</p>
        </div>
        <div className="basis-full relative w-auto h-32 bg-wh-500">
          <Image
            fill
            style={{ objectFit: 'cover' }}
            alt="ad"
            placeholder="blur"
            src={Ad1}
          />
          {/* <Image></Image> */}
        </div>
      </div>
      <hr className="border-1 mx-10"></hr>
    </header>
  );
};

export default Navbar;
