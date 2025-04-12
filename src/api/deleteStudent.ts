import supabase from "../../supabaseClient";
const deleteStudent = async (studentId: string) => {
  const { data, error } = await supabase
    .from("students")
    .delete()
    .eq("id", studentId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
export default deleteStudent;
