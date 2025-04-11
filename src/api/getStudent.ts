import { supabase } from "../../supabaseClient";
import { IFilters } from "../types/index";
const getStudents = async (
  currentPage: number,
  pageSize: number,
  filters: IFilters,
  searchValue: string
) => {
  let query = supabase
    .from("students")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });
  if (searchValue) {
    query = query.ilike("name", `%${searchValue}%`);
  }
  if (filters.phoneMin && filters.phoneMax) {
    query = query
      .gte("phone_number", filters.phoneMin)
      .lte("phone_number", filters.phoneMax);
  } else if (filters.phoneMin) {
    query = query.gte("phone_number", filters.phoneMin);
  } else if (filters.phoneMax) {
    query = query.lte("phone_number", filters.phoneMax);
  }
};
export default getStudents;
