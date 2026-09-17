'use client';


export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-[#FF6B35] z-[100] origin-left shadow-[0_0_10px_#FF6B35]"
      style={{ scaleX }}
    />
  );
}
