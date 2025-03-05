import Image from 'next/image';

export const ACard = (section: any) => {
    return (
        <div className='bg-blue-700 '>
            <div className="container max-w-7xl mx-auto text-white py-12 px-6 md:px-20 flex flex-col md:flex-row gap-8 ">
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-3xl md:text-3xl font-bold my-4">{section?.section?.list_4?.title || "KHÔNG CẦN ĐẾN TRƯỜNG"}</h1>
                    <Image src="/assets/ab.png" alt="Học trực tuyến" width={300} height={300} className="mx-auto md:mx-0" />
                </div>
                <div className="md:w-1/2 grid grid-cols-2 gap-4">
                    {[
                        { title: section?.section?.list_4?.list_1?.title || "Thời gian đào tạo", desc: section?.section?.list_4?.list_1?.label_1 || "Thời gian học chỉ từ 2 - 2,5 năm" },
                        { title: section?.section?.list_4?.list_2?.title || "Chương trình", desc: section?.section?.list_4?.list_2?.label_1 || "Thời gian học chỉ từ 2 - 2,5 năm" },
                        { title: section?.section?.list_4?.list_3?.title || "Bằng cấp", desc: section?.section?.list_4?.list_3?.label_1 || "Thời gian học chỉ từ 2 - 2,5 năm" },
                        { title: section?.section?.list_4?.list_4?.title || "Quản lý học tập", desc: section?.section?.list_4?.list_4?.label_1 || "Thời gian học chỉ từ 2 - 2,5 năm" }
                    ].map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-[#1657A7] text-center">
                            <div className="text-3xl mb-2">💻</div>
                            <h3 className="text-lg font-bold text-[#1657A7]">{item.title}</h3>
                            <p className="text-sm mt-2 text-[#1657A7] whitespace-pre-line">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
