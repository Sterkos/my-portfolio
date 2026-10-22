import { useEffect, useRef } from "react";
import "./Ufo.css";

export default function Ufo({ isActive }) {
  const ufoRef = useRef(null);
  
  const targetPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e) => {
      targetPos.current = {
        x: e.clientX,
        y: e.clientY - 150 
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId;

    const updatePosition = () => {
      if (ufoRef.current) {
        const speed = 0.1; 
        const dx = targetPos.current.x - currentPos.current.x;
        const dy = targetPos.current.y - currentPos.current.y;
        
        currentPos.current.x += dx * speed;
        currentPos.current.y += dy * speed;

        ufoRef.current.style.left = `${currentPos.current.x}px`;
        ufoRef.current.style.top = `${currentPos.current.y}px`;
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="ufo-container">
      <div className="ufo-scene" ref={ufoRef}>
        <div className="ufo-beam"></div>
        <div className="ufo-body">
          <div className="ufo-dome"></div>
          <div className="ufo-lights">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>
  );
}