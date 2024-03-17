"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

interface CardSection {
  title: string;
  Image: { url: string };
  content: string;
}

export default function blog() {
  const [cardSections, setCardSections] = useState<CardSection[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/card-sections?populate=Image"
      );
      // console.log(response);
      setCardSections(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mx-auto my-24">
      <div className="grid grid-cols-3 gap-10">
        {cardSections?.map((section: any, i: number) => (
          <div key={section.attributes.id} className="bg-[#EEE5DD]">
            {section.attributes.Image &&
              section.attributes.Image.data.map((image: any) => (
                <img
                  key={image.id}
                  className="w-full"
                  src={`http://localhost:1337${image.attributes.url}`}
                  alt={image.attributes.name}
                />
              ))}
            <div className="p-6">
              <div className="flex">
                <p className="Lexend-Medium text-[#642C06]">
                  by Serendib Hotels & Resorts{" "}
                </p>
                <div className="flex items-center mx-4">
                  <Image
                    src="/Images/dot.png"
                    width={7}
                    height={7}
                    sizes="100vw"
                    alt="about-img"
                  />
                </div>
                <p className="date Lexend-Medium font-medium text-[#642C06]">
                  Apr 25, 2023
                </p>
              </div>

              <h2 className="Lexend-Medium text-[27px] my-3">
                {section.attributes.Title}
              </h2>

              <p className="Lexend text-[19px]">{section.attributes.Content}</p>

              <div>
                <p className="Lexend-Medium text-[#642C06] mt-4">
                  Blog, Malawi,
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
