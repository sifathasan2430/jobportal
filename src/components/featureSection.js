import React from "react";
import { useId } from "react";
import { ShimmerButton } from "./magicui/shimmer-button";

export function FeaturesSectionDemo() {
  const id = useId();

  return (
    <div className="mb-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center pb-12 md:pb-16 tracking-tight drop-shadow-lg md:text-5xl text-neutral-800 dark:text-neutral-100">
        Latest And Top Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {grid.map((feature, index) => (
          <div
            key={`${id}-${index}`}
            className="relative bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-950 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="flex items-center mx-auto justify-center h-20 w-30 mb-4">
              <img
                src={feature.logo}
                alt={`${feature.company} logo`}
                className="h-full w-full object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3 text-center">
              {feature.title}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm text-center mb-6 min-h-[60px]">
              {feature.description}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {feature.tags.map((tag, tagIndex) => (
                <ShimmerButton
                  key={`${id}-tag-${tagIndex}`}
                  className="shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <span className="whitespace-nowrap text-center text-xs font-medium tracking-tight text-white dark:from-white dark:to-slate-900/10">
                    {tag}
                  </span>
                </ShimmerButton>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = [
  {
    title: "Full Stack Python Developer",
    company: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/420px-Google_2015_logo.svg.png",
    description:
      "Join our team to build HIPAA and SOC2 compliant applications, ensuring data security and reliability.",
    tags: ["Full Time", "12 Positions", "Remote", "24 LPA", "Bangladesh"],
  },
  {
    title: "Data Engineer",
    company: "WebSolutions",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/1920px-Amazon_2024.svg.png",
    description:
      "Develop and automate social media applications across multiple platforms for seamless user experiences.",
    tags: ["Full Time", "8 Positions", "Hybrid", "20 LPA", "Bangladesh"],
  },
  {
    title: "Data Analytics",
    company: "DataInsights",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/WeChat_logo.svg/500px-WeChat_logo.svg.png",
    description:
      "Analyze social media performance with advanced tools to drive engagement and measure ROI.",
    tags: ["Part Time", "5 Positions", "On-site", "18 LPA", "Bangladesh"],
  },
  {
    title: "Product Engineer",
    company: "InnovateTech",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1920px-Meta_Platforms_Inc._logo.svg.png",
    description:
      "Design and manage social media content with intuitive tools to ensure consistent delivery.",
    tags: ["Full Time", "10 Positions", "Remote", "22 LPA", "Bangladesh"],
  },
   {
    title: "React  Developer",
    company: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/420px-Google_2015_logo.svg.png",
    description:
      "Join our team to build HIPAA and SOC2 compliant applications, ensuring data security and reliability.",
    tags: ["Full Time", "12 Positions", "Remote", "24 LPA", "Bangladesh"],
  },
  {
    title: "Seo Expert",
    company: "InnovateTech",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1920px-Uber_logo_2018.svg.png",
    description:
      "Design and manage social media content with intuitive tools to ensure consistent delivery.",
    tags: ["Full Time", "10 Positions", "Remote", "22 LPA", "Bangladesh"],
  },
];