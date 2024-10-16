export const getAllCategory = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}category/all`
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

export const getAllMajor = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}major/all`
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

export const getAllTech = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}technology/all`
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

export const getAllProjects = async (search: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}project/all?search=${search}`
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

//   export const clockIn = async (businessId: string, staffId: string) => {
//     try {
//       const responseClockIn = await fetch("/api/staff/attendance/clockin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ businessId, staffId }),
//       });

//       const resultClockIn = await responseClockIn.json();

//       if (resultClockIn.success) {
//         return { success: true, message: "ClockIn Successful" };
//       } else {
//         return { success: false, message: resultClockIn.message };
//       }
//     } catch (error: any) {
//       console.error("API call failed:", error.message);
//     }
//   };
