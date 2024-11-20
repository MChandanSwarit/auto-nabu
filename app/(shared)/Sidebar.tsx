import React from 'react';
import SocialLinks from './SocialLinks';
import Subscribe from './Subscribe';
import Image from 'next/image';
import Ad2 from '../../public/assets/ad-2.png';
import AboutProfile from '../../public/assets/chandu_extra_cool.jpg';

type Props = unknown;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Sidebar = (props: Props) => {
  return (
    <section>
      <h4 className="bg-wh-900 py-3 px-5 text-wh-50 text-xs font-bold text-center">
        Subscribe and Follow
      </h4>
      <div className="my-5 mx-5">
        <SocialLinks isDark />
      </div>
      <Subscribe />
      <div className="hidden md:block my-8 w-full">
        <Image
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt="tech"
          placeholder="blur"
          src={Ad2}
        />
      </div>
      <h4 className="bg-wh-900 py-3 px-5 text-wh-50 text-xs font-bold text-center">
        About the Blog
      </h4>
      <div className="flex justify-center my-3">
        <Image
          style={{ width: '500px', height: '250px', objectFit: 'cover' }}
          alt="profile"
          placeholder="blur"
          src={AboutProfile}
        />
      </div>
      <h4 className="py-3 px-5 text-wh-500 font-bold text-center">
        Chandan Swarit
      </h4>
      <p className="text-wh-500 text-center text-sm">
        I&apos;m a passionate computer science student and full-stack developer. I have a keen interest
        in emerging technologies and enjoy sharing my knowledge with others. In
        my free time, I like to build stuff.
      </p>
    </section>
  );
};

export default Sidebar;
