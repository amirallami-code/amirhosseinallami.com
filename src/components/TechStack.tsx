"use client";

import { useState } from "react";
import { techStackData } from '@/data/techStackData';
import { SkillCategory } from '@/types/techStack';

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import Image from "next/image";

const ProficiencyBadge = ({ level }: { level: number }) => {
    const proficiencyConfig = {
        3: { label: 'Advanced', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
        2: { label: 'Intermediate', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
        1: { label: 'Beginner', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' }
    } as const;

    const config = proficiencyConfig[level as keyof typeof proficiencyConfig] ?? {
        label: 'Unknown',
        className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    };

    return (
        <Badge variant="default" className={`px-2 py-1 rounded-lg text-xs font-medium ${config.className}`}>
            {config.label}
        </Badge>
    );
};

const TechStack = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <section id="tech-stack">
            <div className="container section-padding relative">
                <h2 className="section-title text-center">Tech Stack & Projects </h2>

                <p className="text-center text-secondary dark:text-chart-3 py-5 lg:py-7">
                    Here&#39;s a list of technologies I work with, along with my
                    proficiency level and examples of how I&#39;ve used them.
                </p>

                <div className="md:flex hidden flex-wrap gap-4 justify-center text-xs pb-3">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-gray-700 dark:text-gray-300">Advanced: Experienced, mentors</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className="text-gray-700 dark:text-gray-300">Intermediate: Works independently</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="text-gray-700 dark:text-gray-300">Beginner: Basic knowledge, learning</span>
                    </div>
                </div>

                <div
                    className={`transition-all duration-1000 ease-in-out ${
                        expanded ? "max-h-none" : "max-h-screen lg:max-h-[550px] overflow-hidden"
                    }`}
                >
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2">
                        {techStackData.categories.map((category: SkillCategory) => (
                            <div
                                key={category.name}
                                className={`${category.name === "Frontend Development" ? "md:col-span-2" : ""}`}
                            >
                                <h3 className="text-xs text-gray-700 uppercase bg-gray-200/50 dark:bg-gray-700/20 dark:text-gray-300/90 px-4 py-3 mb-3 rounded-t-lg tracking-wide">
                                    {category.name}
                                </h3>

                                <div
                                    className={`${
                                        category.name === "Frontend Development"
                                            ? "columns-1 md:columns-2 gap-4"
                                            : ""
                                    }`}
                                >
                                    {category.skills.map((skill) => (
                                        <div key={skill.name} className="skill break-inside-avoid mb-4">
                                            <div className="flex items-center gap-3 p-4 pb-0">
                                                <Image
                                                    src={skill.icon}
                                                    alt={skill.name}
                                                    width={0}
                                                    height={0}
                                                    className={"w-max h-max max-w-6 max-h-6"}
                                                    sizes={"24"}
                                                    unoptimized={true}
                                                />
                                                <h4 className="text-sm">
                                                    <span className="lg:hidden">{skill.name}</span>
                                                    <span className="hidden lg:inline">{skill.fullName}</span>
                                                </h4>
                                            </div>

                                            <div>
                                                <ProficiencyBadge level={skill.proficiency}/>
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Key Features:
                                                </p>
                                                <ul className="list-disc list-inside flex flex-col items-start justify-center gap-1.5 text-xs text-gray-600 dark:text-gray-300/90 tracking-wide">
                                                    {skill.features.map((feature) => (
                                                        <li key={feature}>{feature}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {skill.projects[0] ? (
                                                <div
                                                    className="w-full bg-gray-50 dark:bg-gray-700/20 py-3 rounded-b-xl">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                                                        Projects:
                                                    </p>

                                                    <ul className="text-sm">
                                                        {skill.projects.map((project) => (
                                                            <li key={project.name}>
                                                                <Tooltip>
                                                                    <TooltipTrigger className="w-full h-full">
                                                                        <Link href={project.url}
                                                                              className="w-full h-full flex flex-row gap-1.5 py-1.5 text-sm text-start items-center text-blue-700 dark:text-blue-400">
                                                                            <ExternalLink className="w-4 h-4"/>
                                                                            {project.name}
                                                                        </Link>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>{project.description}</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="md:hidden flex flex-wrap gap-4 justify-start text-xs pb-3">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            <span className="text-gray-700 dark:text-gray-300">Advanced: Experienced, mentors</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            <span className="text-gray-700 dark:text-gray-300">Intermediate: Works independently</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                            <span className="text-gray-700 dark:text-gray-300">Beginner: Basic knowledge, learning</span>
                        </div>
                    </div>
                </div>

                {!expanded && (
                    <div
                        className="absolute bottom-0 left-0 w-full h-72 bg-gradient-to-t from-background via-background/90 to-transparent flex justify-center items-end pb-6">
                        <Button
                            variant={"ghost"}
                            onClick={() => setExpanded(true)}
                            className="px-4 py-1.5 text-primary hover:text-primary font-semibold hover:bg-primary/5 transition cursor-pointer"
                        >
                            Show Full List
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};
export default TechStack;
