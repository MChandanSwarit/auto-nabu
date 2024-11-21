import { PostType } from '@/app/page';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or key is missing');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getPosts(): Promise<PostType[]> {
  try {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      throw error;
    }

    const formattedPosts = await Promise.all(
      data.map(async (post: PostType) => {
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

export async function getPost(id: string) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    if (!data || error) {
      console.log(`Post with id ${id} not found.`);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

export async function updatePost(id: string, title: string, content: string) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', id)
      .select("*")
      .single()

    if (error) {
      throw error;
    }
    console.log('Post updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}
