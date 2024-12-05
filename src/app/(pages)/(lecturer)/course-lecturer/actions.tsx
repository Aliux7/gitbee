export const getAllGroupByClass = async (
  semester_id: string,
  course_id: string,
  class_id: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}project/lecturer/class?semester_id=${semester_id}&course_id=${course_id}&class=${class_id}`
    );
    const result = await response.json();

    if (result.status) {
      return { success: true, data: result.data ? result.data : "" };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error: any) {
    console.error("API call failed:", error.message);
  }
};
