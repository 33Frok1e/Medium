import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const uploadImage = async (img) => {
  const fileExt = img.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `blog/${fileName}`;

  const { error } = await supabase
    .storage
    .from('medium-clone') // your bucket name
    .upload(filePath, img, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error("Upload Error:", error.message);
    return null;
  }

  const { data } = supabase
    .storage
    .from('medium-clone')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
