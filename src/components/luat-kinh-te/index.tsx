import { useEffect, useState } from "react";
import { RegistrationSection } from "../layout/layoutNganh/CategoryLayout";
import { Card, Layout } from "../layout/layoutNganh/CategorySidebar";
import { ACard } from "../layout/layoutNganh/ACard";
import { WorldClassLearning } from "../home/WorldClassLearning";
export const Nganh2 = () => {
  const [homeContent, setHomeContent] = useState<any>(null);
  const [pageContent, setPageContent] = useState<any>(null);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=nganh-02`, {
          next: { revalidate: 3 },
        });
        const data = await res.json();
        setHomeContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };
    getHomeContent();
  }, []);

  useEffect(() => {
    const getPageContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=trang-chu`, {
          next: { revalidate: 3 }
        });
        const data = await res.json();
        setPageContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };
    getPageContent();
  }, []);
  const section = homeContent?.acf
  return (
    <>
      <RegistrationSection
        title={section?.list_1?.label_1 || "Ngôn ngữ Anh"}
        description={section?.list_1?.label_3 || "Ngôn ngữ Anh (English Studies) là ngành học nghiên cứu về các phương pháp học tập loại ngôn ngữ phổ biến, ở đây là tiếng Anh. Thế giới có đến 1,5 tỷ người sử dụng tiếng Anh để giao tiếp, hiện tại tiếng Anh là ngôn ngữ chính tại 50 nước và có hàng trăm đất nước khác chọn Anh ngữ là ngôn ngữ thứ 2."} />
      <Layout title={section?.list_2?.title || "Tại sao nên học Ngôn ngữ Anh - Trường Đại học Lao động - Xã hội"}>
        <Card title={section?.list_2?.title_1 || " THU NHẬP HẤP DẪN"}>
          {section?.list_2?.description_1 || "Ngôn ngữ Anh là một công việc dễ thăng tiến và phát triển, rất được coi trọng trong các doanh nghiệp và tổ chức nhà nước. Một trong những lý do lựa chọn ngành Kế toán rất được quan tâm và mang tính thiết thực chính là mức thu nhập cao, ổn định trong xã hội hiện nay."}
        </Card>
        <Card title={section?.list_2?.title_2 || " PHÁT TRIỂN TƯ DUY LOGIC "}>
          {section?.list_2?.description_2 || "Ngôn ngữ Anh là một công việc dễ thăng tiến và phát triển, rất được coi trọng trong các doanh nghiệp và tổ chức nhà nước. Một trong những lý do lựa chọn ngành Kế toán rất được quan tâm và mang tính thiết thực chính là mức thu nhập cao, ổn định trong xã hội hiện nay."}
        </Card>
        <Card title={section?.list_2?.title_3 || "VAI TRÒ TRONG XÃ HỘI"}>
          {section?.list_2?.description_3 || " Ngôn ngữ Anh là một công việc dễ thăng tiến và phát triển, rất được coi trọng trong các doanh nghiệp và tổ chức nhà nước. Một trong những lý do lựa chọn ngành Kế toán rất được quan tâm và mang tính thiết thực chính là mức thu nhập cao, ổn định trong xã hội hiện nay."}
        </Card>
      </Layout>
      <ACard section={section} />
      <WorldClassLearning section_5={pageContent?.acf?.section_5} />
    </>

  )
}