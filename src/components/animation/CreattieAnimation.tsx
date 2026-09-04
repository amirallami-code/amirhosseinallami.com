'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Lottie, LottieHandle } from "lottie-react";

interface CreattieAboutProps {
    animationURL: string;
    className?: string;
    width?: number | string;
    height?: number | string;
    autoplay?: boolean;
    loop?: boolean;
    speed?: number;
}

const CreattieAnimation: React.FC<CreattieAboutProps> = ({animationURL ,className = '', width = '100%', height = '100%', autoplay = true, loop = true, speed = 1}) => {
    const [animationData, setAnimationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const lottieRef = useRef<LottieHandle>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !animationData) {
                    // Only load when visible
                    setIsVisible(true);
                    loadAnimation();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px' // Start loading 100px before visible
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [animationData]);

    const loadAnimation = useCallback(async () => {
        try {
            const response = await fetch(animationURL);
            const data = await response.json();
            setAnimationData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading animation:', error);
            setLoading(false);
        }
    }, [animationURL]);

    // Set animation speed when data loads
    useEffect(() => {
        if (lottieRef.current && animationData) {
            lottieRef.current.setSpeed(speed);
        }
    }, [speed, animationData]);

    if (!isVisible || loading) {
        return (
            <div
                ref={containerRef}
                className={`${className} w-full min-h-[50dvh] md:min-h-[75dvh] h-auto 
                rounded-2xl flex items-center justify-center`}
                style={{ width, height }}
            >
                <div className="text-gray-400">Loading animation...</div>
            </div>
        );
    }

    if (!animationData) {
        return (
            <div
                ref={containerRef}
                className={`${className} bg-gray-200 rounded-lg flex items-center justify-center`}
                style={{ width, height }}
            >
                <span className="text-gray-600 text-sm">Animation failed to load</span>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ width, height }}
        >
            <Lottie
                lottieRef={lottieRef}
                src={animationData}
                loop={loop}
                autoplay={autoplay}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </div>
    );
};

export default CreattieAnimation;