const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const insertProject = async ({
  lecturerId,
  studentLeaderId,
  title,
  description,
  semesterId,
  courseId,
  className,
  githubLink,
  projectLink,
  thumbnail,
  documentation,
  gallery,
  statusId,
  categoryId,
  majorId,
}: {
  lecturerId: string;
  studentLeaderId: string;
  title: string;
  description: string;
  semesterId: string;
  courseId: string;
  className: string;
  githubLink: string;
  projectLink: string;
  thumbnail?: File;
  documentation?: File;
  gallery: File[];
  statusId: number;
  categoryId: number;
  majorId: number;
}) => {
  try {
    const thumbnailBase64 = thumbnail ? await fileToBase64(thumbnail) : "";
    const documentationBase64 = documentation
      ? await fileToBase64(documentation)
      : "";
    const galleryBase64 = gallery ? await Promise.all(gallery.map(fileToBase64)) : "";

    const payload = {
      lecturer_id: "KS231",
      student_leader_id: "2540115465",
      title,
      description,
      semester_id: "be992b30-4b38-4361-8404-25f2d6912754",
      course_id: "COMP6100001",
      class: "BG01",
      github_link: githubLink,
      project_link: projectLink,
      thumbnail: thumbnailBase64,
      documentation: documentationBase64,
      gallery: galleryBase64,
      status_id: 1,
      category_id: 2,
      major_id: 6,
      technology_ids: [1, 5, 11],
    };
    console.log(payload);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}project/insert`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    console.log(result);
    if (response.ok && result.status) {
      return { success: true, data: result.data || "" };
    } else {
      return {
        success: false,
        message: result.message || "Failed to insert project",
      };
    }
  } catch (error: any) {
    console.error("API call failed:", error.message);
  }
};
