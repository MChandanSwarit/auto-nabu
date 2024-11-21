import { supabase } from '@/lib/supabase';
import React from 'react';
import Sidebar from '@/app/(shared)/Sidebar';
import Content from '@/app/post/[id]/Content';
import { FormattedPost } from '@/app/types';

type Props = {
  params: { id: string };
};

export const revalidate = 60;

const getPost = async (id: string): Promise<FormattedPost | null> => {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    console.error(`Error fetching post with id ${id}:`, error?.message);
    return null;
  }

  return post as FormattedPost;
};

const Post = async ({ params }: Props) => {
  const { id } = params;
  const post = await getPost(id);

  if (!post) {
    return <div>Post Not Found</div>;
  }

  return (
    <main className="px-10 leading-7">
      <div className="md:flex gap-10 mb-5">
        <div className="basis-3/4">
          <Content post={post} />
        </div>
        <div className="basis-1/4">
          <Sidebar />
        </div>
      </div>
    </main>
  );
};

export default Post;
