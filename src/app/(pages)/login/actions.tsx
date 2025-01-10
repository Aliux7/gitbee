export const login = async (microsoftToken: string) => {
  try {
    const responselogin = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ microsoft_token: microsoftToken }),
      }
    );

    const resultlogin = await responselogin.json();
    console.log(resultlogin);
    if (resultlogin.status) {
      return { success: true, data: resultlogin.data };
    } else {
      return { success: false, message: resultlogin.message };
    }
  } catch (error: any) {
    console.error("API call failed:", error.message);
  }
};
