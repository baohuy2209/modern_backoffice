import supabase from "../../supabaseClient";
const getPublicUrl = async (filePath: string) => {
  const { data } = supabase.storage.from("avatar").getPublicUrl(filePath);
  if (data?.publicUrl) {
    return data?.publicUrl;
  } else {
    return null;
  }
};
export default getPublicUrl;
