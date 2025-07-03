/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { FormGetFly } from "./FormGetFly";
import { FormSam } from "./FormSam";
import { FormGoogle } from "./FormGoogle";

interface FormData {
  type: "form-getfly" | "form-sam" | "form-google" | "unknown";
  url: string;
  uuid: string;
  divId: string;
  divClass: string;
}

export const FormWrapper = ({
  title,
  color,
  type = "form-main"
}: {
  title?: string;
  color?: string;
  type?: "form-main" | "form-poup";
}) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const res = await fetch(`/api/gen-form/?type=${type}`);
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFormData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!formData) {
    return <h1 color="red.500">Unable to load form</h1>;
  }

  return (
    <>
      {title && <h2>{title}</h2>}
      {formData.type === "form-getfly" && <FormGetFly {...formData} />}
      {formData.type === "form-sam" && <FormSam {...formData} />}
      {formData.type === "form-google" && (
        <FormGoogle url={formData.url} divId={formData.divId} />
      )}
    </>
  );
};
