"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LucideIcon, Menu, House, User, Code, CircleStar, Cat, Mail } from 'lucide-react';
import { useThemeContext } from '@/components/ThemeProvider';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import Signature from "@/components/ui/signature";

// Navigation items configuration
type NavigationItemType = {
    id: string;
    label: string;
    icon: LucideIcon;
};
const navigationItems: NavigationItemType[] = [
    { id: 'hero', label: 'Hero', icon: House },
    { id: 'about', label: 'About me', icon: User },
    { id: 'tech-stack', label: 'Tech Stack & Projects', icon: Code },
    { id: 'certificates', label: 'Certificates', icon: CircleStar },
    { id: 'github', label: 'Github', icon: Cat },
    { id: 'stay-in-touch', label: 'Stay in touch', icon: Mail },
];

const useScrollSpy = () => {
    const [activeSection, setActiveSection] = useState<string>(navigationItems[0].id);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            const scrollPos = window.scrollY + 100;

            for (const section of sections) {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;

                if (scrollPos >= top && scrollPos < bottom) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return activeSection;
};













const ThemeSwitcher = () => {
    const { theme, toggleTheme, mounted } = useThemeContext();

    const starsSvg = useMemo(() => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" fill="currentColor"></path>
        </svg>
    ), []);

    if (!mounted) {
        return (
            <label className="theme-switch" id="theme-switch">
                <input type="checkbox" className="theme-switch__checkbox hidden" checked={true} readOnly />
                <div className="theme-switch__container">
                    <div className="theme-switch__clouds"></div>
                    <div className="theme-switch__stars-container">{starsSvg}</div>
                    <div className="theme-switch__circle-container">
                        <div className="theme-switch__sun-moon-container">
                            <div className="theme-switch__moon">
                                <div className="theme-switch__spot"></div>
                                <div className="theme-switch__spot"></div>
                                <div className="theme-switch__spot"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </label>
        );
    }

    return (
        <label className="theme-switch" id="theme-switch">
            <input
                type="checkbox"
                className="theme-switch__checkbox hidden"
                id="toggle"
                name="toggle"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                aria-label="Theme toggle loading"
            />
            <div className="theme-switch__container">
                <div className="theme-switch__clouds"></div>
                <div className="theme-switch__stars-container">{starsSvg}</div>
                <div className="theme-switch__circle-container">
                    <div className="theme-switch__sun-moon-container">
                        <div className="theme-switch__moon">
                            <div className="theme-switch__spot"></div>
                            <div className="theme-switch__spot"></div>
                            <div className="theme-switch__spot"></div>
                        </div>
                    </div>
                </div>
            </div>
        </label>
    );
};

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 50;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};

const Header = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const activeSection = useScrollSpy();

    const handleNavClick = useCallback((sectionId: string) => {
        scrollToSection(sectionId);
        setIsSheetOpen(false);
    }, []);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header>
            <nav
                className={twMerge(
                    "fixed w-full h-20 z-20 top-0 start-0 transition-all duration-200",
                    scrolled && "bg-gradient-to-b from-primary/90 via-primary/70 to-primary/50 backdrop-blur-md"
                )}
            >
                <div className="container h-full pr-0 lg:pr-5">
                    <div className="h-full flex items-center justify-between">
                        <div className="h-full flex items-center justify-center">
                            <Signature color={"#fff"} width={"150"} height={"35"} />
                        </div>

                        <div className="hidden lg:flex items-center gap-6">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={cn(
                                        "text-primary-foreground transition-all cursor-pointer hover:opacity-80",
                                        activeSection === item.id && "font-extrabold tracking-wide"
                                    )}
                                    aria-label={`Navigate to ${item.label}`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center justify-center h-full w-auto gap-2">
                            <ThemeSwitcher />
                            <div className="flex lg:hidden h-full w-16 rounded-2xl">
                                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                                    <SheetTrigger className="relative h-3/4 m-auto me-2 w-full flex items-center justify-center rounded-2xl" aria-label="Open navigation menu">
                                        <span className="absolute"></span>
                                        <Menu className="text-background/80 w-6 h-6"/>
                                    </SheetTrigger>
                                    <SheetContent side={"bottom"} className="rounded-t-3xl gap-1 pb-3 border-none">
                                        <SheetHeader className="relative pt-8 pb-0">
                                            <span className="absolute w-12 h-1 top-0 right-0 left-0 m-auto mt-2.5 bg-gray-400/50 rounded-full"></span>
                                            <SheetTitle className="px-1 text-md">Navigation</SheetTitle>
                                        </SheetHeader>

                                        <div>
                                            <ul className="flex flex-col gap-1 px-3 py-2">
                                                {navigationItems.map((item) => {
                                                    const Icon = item.icon;
                                                    const isActive = activeSection === item.id;
                                                    return (
                                                        <li key={item.id}
                                                            className={cn(
                                                                "mobile-menu-item transition-colors",
                                                                isActive && "active bg-primary/20 text-primary"
                                                            )}
                                                        >
                                                        <span className="mobile-menu-icon-wrapper">
                                                            <Icon className={cn(
                                                                "mobile-menu-icon",
                                                                isActive && "text-primary"
                                                            )}/>
                                                        </span>
                                                            <button
                                                                onClick={() => handleNavClick(item.id)}
                                                                className="flex-1 text-left absolute inset-0 w-full h-full ps-12 rounded-2xl"
                                                                aria-label={`Navigate to ${item.label}`}
                                                            >
                                                                {item.label}
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>


                                        <SheetFooter className="py-2">
                                            <SheetHeader className="hidden">
                                                <p>Quick Actions</p>
                                            </SheetHeader>
                                            <SheetDescription className="flex items-center justify-center gap-2">
                                                {/*<Link href="/cv.pdf" className="flex-1/2 min-w-fit flex items-center justify-center bg-primary text-white h-10 w-1/2 !rounded-lg" target="_blank" rel="noopener noreferrer">*/}
                                                {/*    Download CV*/}
                                                {/*</Link>*/}

                                                <Button
                                                    className="flex-1/2 h-10"
                                                    onClick={() => handleNavClick('stay-in-touch')}
                                                >
                                                    Contact Me
                                                </Button>
                                            </SheetDescription>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;