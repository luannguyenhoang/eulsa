import { CountdownTimer } from "../lich-khai-giang/UpcomingEvents";
import Link from "next/link";

const courses = [
  { title: "Công tác xã hội", path: "/nganh-cong-tac-xa-hoi" },
  { title: "Luật kinh tế ", path: "/nganh-luat-kinh-te" },
  { title: "Ngôn ngữ Anh ", path: "/nganh-ngon-ngu-anh" },

];

export const CourseSchedule = (section_1: any) => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Lịch khai giảng</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {courses.map((course,index) => (
            <Link key={index} href={course.path} >
              <div className="bg-blue-700 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-blue-800 transition duration-300 mb-[15px]">
                <h2 className="text-xl font-bold">{course.title}</h2>
              </div>
            </Link>
          ))}
        </div>
        <div className="space-y-6">
        <CountdownTimer
            title={section_1?.section_1?.list_1?.title || "Tại Hà Nội"}
            day={parseInt(section_1?.section_1?.list_1?.label_2) || 10}
            hours={parseInt(section_1?.section_1?.list_1?.label_3) || 12}
            minutes={parseInt(section_1?.section_1?.list_1?.label_4) || 30}
            seconds={parseInt(section_1?.section_1?.list_1?.label_5) || 0}
          />
          <CountdownTimer
            title={section_1?.section_1?.list_2?.title || "Tại TP Hồ Chí Minh"}
            day={parseInt(section_1?.section_1?.list_2?.label_2) || 8}
            hours={parseInt(section_1?.section_1?.list_2?.label_3) || 15}
            minutes={parseInt(section_1?.section_1?.list_2?.label_4) || 45}
            seconds={parseInt(section_1?.section_1?.list_2?.label_5) || 10}
          />
        </div>
      </div>
    </div>
  );
};
