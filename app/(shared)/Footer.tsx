import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-wh-900 text-wh-50 py-10 px-10">
      <div className="justify-between mx-auto gap-16 sm:flex">
        {/*FIRST COLUMN */}
        <div className="mt-16 basis-1/2 sm:mt-0">
          <h4 className="font-bold">AUTO NABU</h4>
          <p className="my-5">
            Explore insightful articles on technology, business, and lifestyle,
            designed to inform and inspire. With built-in AI tools, Auto Nabu
            empowers creators to streamline content creation, write smarter, and
            boost productivity—delivering engaging reads every time.
          </p>
          <p>Auto Nabu &copy; 2024</p>
        </div>
        {/*SECOND COLUMN */}
        <div className="mt-16 basis-1/4 sm:mt-0">
          <h4 className="font-bold">Links</h4>
          <p className="my-5">Home</p>
          <p className="my-5">About</p>
          <p className="my-5">Trending</p>
        </div>
        {/*THIRD COLUMN */}
        <div className="mt-16 basis-1/4 sm:mt-0">
          <h4 className="font-bold">Contact Us</h4>
          <p>
            We&apos;d love to hear from you! For inquiries, collaborations, or
            feedback, feel free to reach out:
          </p>
          <p className="my-5">busniess-email@example.com</p>
          <p className="my-5">+91 1234567890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
