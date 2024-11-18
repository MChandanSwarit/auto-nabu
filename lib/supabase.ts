import { Post } from '@/app/page';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or key is missing');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      throw error;
    }

    const formattedPosts = await Promise.all(
      data.map(async (post: Post) => {
        try {
          // console.log(`Loading image for post ${post.id}: ${post.image}`);
          const imageModule = await import(`../public${post.image}`);
          return { ...post, image: imageModule.default };
        } catch (error) {
          console.error(`Error loading image for post ${post.id}:`, error);
          return post;
        }
      })
    );

    return formattedPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}
