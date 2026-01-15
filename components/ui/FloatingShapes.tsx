'use client';

import React from 'react';

interface FloatingShapesProps {
    className?: string;
}

export function FloatingShapes({ className = '' }: FloatingShapesProps) {
    return (
        <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
            {/* Large Blue Sphere - Top Left */}
            <div
                className="floating-shape gradient-blue animate-float"
                style={{
                    width: '120px',
                    height: '120px',
                    top: '10%',
                    left: '5%',
                    opacity: 0.3,
                }}
            />

            {/* Purple Capsule - Top Right */}
            <div
                className="floating-capsule gradient-purple animate-float-slow"
                style={{
                    width: '80px',
                    height: '160px',
                    top: '15%',
                    right: '8%',
                    opacity: 0.25,
                    transform: 'rotate(25deg)',
                }}
            />

            {/* Pink Sphere - Middle Right */}
            <div
                className="floating-shape gradient-pink animate-float"
                style={{
                    width: '60px',
                    height: '60px',
                    top: '45%',
                    right: '12%',
                    opacity: 0.35,
                    animationDelay: '1s',
                }}
            />

            {/* Orange Sphere - Bottom Left */}
            <div
                className="floating-shape gradient-orange animate-float-slow"
                style={{
                    width: '100px',
                    height: '100px',
                    bottom: '20%',
                    left: '8%',
                    opacity: 0.3,
                    animationDelay: '2s',
                }}
            />

            {/* Small Blue Sphere - Bottom Right */}
            <div
                className="floating-shape gradient-blue animate-float"
                style={{
                    width: '40px',
                    height: '40px',
                    bottom: '30%',
                    right: '25%',
                    opacity: 0.25,
                    animationDelay: '3s',
                }}
            />

            {/* Purple Capsule - Left Side */}
            <div
                className="floating-capsule gradient-purple animate-float-slow"
                style={{
                    width: '50px',
                    height: '100px',
                    top: '60%',
                    left: '3%',
                    opacity: 0.2,
                    transform: 'rotate(-15deg)',
                    animationDelay: '1.5s',
                }}
            />

            {/* Small Pink Sphere - Top Center */}
            <div
                className="floating-shape gradient-pink animate-float"
                style={{
                    width: '30px',
                    height: '30px',
                    top: '8%',
                    left: '40%',
                    opacity: 0.3,
                    animationDelay: '0.5s',
                }}
            />

            {/* Orange Capsule - Bottom Center */}
            <div
                className="floating-capsule gradient-orange animate-float-slow"
                style={{
                    width: '60px',
                    height: '30px',
                    bottom: '10%',
                    left: '50%',
                    opacity: 0.25,
                    animationDelay: '2.5s',
                }}
            />
        </div>
    );
}
