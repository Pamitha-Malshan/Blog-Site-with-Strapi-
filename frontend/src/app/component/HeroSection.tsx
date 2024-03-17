"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

interface BlogSection {
  title: string;
  Background: { url: string };
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogSection[]>([]);

  console.log(blogs);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/heroes?populate=Background"
      );
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {blogs?.map((blog: any, index: number) => (
        <div key={index} className="relative">
          {blog.attributes.Background &&
            blog.attributes.Background.data.map((image: any) => (
              <img
                key={image.id}
                className="w-full"
                src={`http://localhost:1337${image.attributes.url}`}
                alt={image.attributes.name}
              />
            ))}

          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-[4rem] text-center text-white px-4 py-2">
              {blog.attributes.Title}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}
