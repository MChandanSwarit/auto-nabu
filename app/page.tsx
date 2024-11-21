import Trending from './(home)/Trending';
import Tech from './(home)/Tech';
import Travel from './(home)/Travel';
import Other from './(shared)/Other';
import Subscribe from './(shared)/Subscribe';
import Sidebar from './(shared)/Sidebar';
import { getPosts } from '../lib/supabase';
import { FormattedPost } from './types';

export interface PostType {
  id: string;
  title: string;
  category: string;
  content: string;
  image: string;
  snippet: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export const revalidate = 60;

export default async function Home() {
  const posts = await getPosts();
  // console.log('posts', posts);

  const formatPosts = () => {
    const trendingPosts: Array<FormattedPost> = [];
    const techPosts: Array<FormattedPost> = [];
    const travelPosts: Array<FormattedPost> = [];
    const otherPosts: Array<FormattedPost> = [];

    posts.forEach((post, i) => {
      if (i < 4) {
        trendingPosts.push(post);
      }
      if (post?.category === 'Tech') {
        techPosts.push(post);
      } else if (post?.category === 'Travel') {
        travelPosts.push(post);
      } else if (post?.category === 'Interior Design') {
        otherPosts.push(post);
      }
    });
    return [trendingPosts, techPosts, travelPosts, otherPosts];
  };

  const [trendingPosts, techPosts, travelPosts, otherPosts] = formatPosts();

  return (
    <main className="px-10 leading-7">
      <Trending trendingPosts={trendingPosts} />
      <div className="md:flex gap-10 mb-5">
        <div className="basis-3/4">
          <Tech techPosts={techPosts} />
          <Travel travelPosts={travelPosts} />
          <Other otherPosts={otherPosts} />
          <div className="hidden md:block">
            <Subscribe />
          </div>
        </div>
        <div className="basis-1/4">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}
