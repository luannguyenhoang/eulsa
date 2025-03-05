"use client";

import { FormWrapper } from "../FormWrapper";
import { useState, useEffect } from "react";

export const CountdownTimer = ({
  title,
  day,
  hours = 0,
  minutes = 0,
  seconds = 0,
  startDate = new Date(),
}: {
  title: string;
  day: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  startDate?: Date;
}) => {
  const targetDate = new Date(startDate);
  targetDate.setDate(targetDate.getDate() + day);

  const [timeLeft, setTimeLeft] = useState({
    days: day,
    hours,
    minutes,
    seconds,
  });

  useEffect(() => {
    setTimeLeft({
      days: day,
      hours,
      minutes,
      seconds,
    });
  }, [day, hours, minutes, seconds]);

  useEffect(() => {
    if (
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]); 
  return (
    <div className="bg-[#1657A7] p-6 rounded-lg text-white mb-4">
      <h3 className="text-red-500 text-2xl font-bold mb-2">{title}</h3>
      <p className="text-lg mb-4">
        📅 Sự kiện diễn ra vào:{" "}
        {targetDate.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="grid grid-cols-4 gap-4">
        {[
          { value: timeLeft.days, label: "Ngày" },
          { value: timeLeft.hours, label: "Giờ" },
          { value: timeLeft.minutes, label: "Phút" },
          { value: timeLeft.seconds, label: "Giây" },
        ].map((item, index) => (
          <div key={item.label} className="border border-red-500 rounded p-2 text-center">
            <div className="text-2xl font-bold">{String(item.value).padStart(2, "0")}</div>
            <div className="text-sm">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Lkgs = (section_1: any) => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#1657A7] mb-8 italic">{section_1?.section_1?.title || "Lịch khai giảng khóa gần nhất"}</h1>
      <div className="border-t-2 border-blue-700 mb-8 w-full"></div>
      <div className="grid md:grid-cols-2 gap-8">
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
        <div className="bg-[#1657A7] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white text-center mb-6">NHẬN TÀI KHOẢN HỌC THỬ MIỄN PHÍ</h2>
          <FormWrapper type="form-main" />
        </div>
      </div>
    </div>
  );
};
