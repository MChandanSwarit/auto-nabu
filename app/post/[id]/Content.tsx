'use client';
import { FormattedPost } from '@/app/types';
import React, { useState } from 'react';
import Image from 'next/image';
import SocialLinks from '@/app/(shared)/SocialLinks';
import { Editor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CategoryAndEdit from './CategoryAndEdit';
import Article from './Article';

type Props = {
  post: FormattedPost;
};

const Content = ({ post }: Props) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(post.title);
  const [titleError, setTitleError] = useState<string>('');
  const [tempTitle, setTempTitle] = useState<string>(title);

  const [content, setContent] = useState<string>(post.content);
  const [contentError, setContentError] = useState<string>('');
  const [tempContent, setTempContent] = useState<string>(content);

  const [updateStatus, setUpdateStatus] = useState<string>('');

  const date = new Date(post?.created_at);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as any;
  const formattedDate = date.toLocaleDateString('en-US', options);

  const handleIsEditable = (bool: boolean) => {
    setIsEditable(bool);
    editor?.setEditable(bool);
  };

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (title) setTitleError('');
    setTitle(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChangeContent = ({ editor }: any) => {
    if (!(editor as Editor).isEmpty) setContentError('');
    setContent((editor as Editor).getHTML());
  };

  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: handleOnChangeContent,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm xl:prose-2xl leading-8 focus:outline-none w-full max-w-full',
      },
    },
    content: content,
    editable: isEditable,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation checks
    if (title.trim() === '') {
      setTitleError('This field is required.');
      return;
    }
    if (editor?.isEmpty) {
      setContentError('This field is required.');
      return;
    }

    setUpdateStatus('Updating...');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/post/${post?.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      if (!response.ok) {
        setUpdateStatus('Failed to update the post.');
        return;
      }

      const data = await response.json();

      // Update state with new data
      setTitle(data.title);
      setContent(data.content);
      editor?.commands.setContent(data.content);

      // Reset temp states and exit edit mode
      setTempTitle('');
      setTempContent('');
      handleIsEditable(false);

      setUpdateStatus('Post updated successfully! Refresh the page to see the updated Content.');
    } catch (error) {
      console.error('Error updating post:', error);
      setUpdateStatus('An error occurred while updating.');
    }
  };

  return (
    <div className="prose w-full max-w-full mb-10">
      {/* BREADCRUMBS */}
      <h5 className="text-wh-300">{`Home > ${post.category} > ${post.title}`}</h5>

      {/* CATEGORY AND EDIT */}
      <CategoryAndEdit
        isEditable={isEditable}
        handleIsEditable={handleIsEditable}
        title={title}
        setTitle={setTitle}
        tempTitle={tempTitle}
        setTempTitle={setTempTitle}
        tempContent={tempContent}
        setTempContent={setTempContent}
        editor={editor}
        post={post}
      />

      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <>
          {isEditable ? (
            <div>
              <textarea
                className="border-2 rounded-md bg-wh-50 p-3 w-full"
                placeholder="Title"
                onChange={handleOnChangeTitle}
                value={title}
              />
              {titleError && (
                <p className="mt-1 text-primary-500">{titleError}</p>
              )}
            </div>
          ) : (
            <h3 className="font-bold text-3xl mt-3">{title}</h3>
          )}
          <div className="flex gap-3">
            <h5 className="font-semibold text-xs">By {post.author}</h5>
            <h6 className="text-wh-300 text-xs">{formattedDate}</h6>
          </div>
        </>

        {/* IMAGE */}
        <div className="relative w-auto mt-2 mb-16 h-96">
          <Image
            fill
            alt={post.title}
            src={post.image}
            sizes="(max-width: 480px) 100vw,
                  (max-width: 768px) 85vw,
                  (max-width: 1060px) 75vw,
                  60vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* ARTICLE */}
        <Article
          contentError={contentError}
          editor={editor}
          isEditable={isEditable}
          setContent={setContent}
          title={title}
        />

        {/* SUBMIT BUTTON */}
        {isEditable && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-accent-red hover:bg-wh-500 text-wh-10 font-semibold py-2 px-5 mt-5"
            >
              SUBMIT
            </button>
          </div>
        )}
      </form>

      {/* UPDATE STATUS */}
      {updateStatus && <p className="text-green-500 mt-2">{updateStatus}</p>}

      {/* SOCIAL LINKS */}
      <div className="hidden md:block mt-10 w-1/3">
        <SocialLinks isDark />
      </div>
    </div>
  );
};

export default Content;
