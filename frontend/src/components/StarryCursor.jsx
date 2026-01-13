import React, { useEffect, useRef } from 'react';

const StarryCursor = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const setCanvasDimensions = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasDimensions();

        const createParticle = (e) => {
            const colorHues = [0, 30, 270]; // Red, Orange, Blue
            const count = 4; // Number of particles to generate on move
            for (let i = 0; i < count; i++) {
                particlesRef.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 2 + 1, // Star size
                    speedX: (Math.random() - 0.5) * 2, // Horizontal speed
                    speedY: (Math.random() - 0.5) * 2, // Vertical speed
                    hue: colorHues[Math.floor(Math.random() * colorHues.length)],
                    life: 50, // How long the star lives (in frames)
                    maxLife: 50,
                });
            }
        };

        const handleMouseMove = (e) => {
            createParticle(e);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', setCanvasDimensions);

        let animationFrameId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particlesRef.current.length - 1; i >= 0; i--) {
                const p = particlesRef.current[i];
                p.x += p.speedX;
                p.y += p.speedY;
                p.life -= 1;

                if (p.life <= 0) {
                    particlesRef.current.splice(i, 1); // Remove dead star
                } else {
                    // Fade out the star over its lifetime
                    const opacity = p.life / p.maxLife;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * opacity, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${opacity})`;
                    ctx.fill();
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', setCanvasDimensions);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // This canvas sits on top of everything but doesn't block mouse events
    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-50 pointer-events-none" />;
};

export default StarryCursor;
