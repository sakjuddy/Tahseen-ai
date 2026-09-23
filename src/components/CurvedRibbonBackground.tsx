"use client";

import { useEffect, useRef } from "react";

export default function CurvedRibbonBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const particleSvgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pathGlowRef = useRef<SVGPathElement>(null);
  const companionPathRef = useRef<SVGPathElement>(null);
  const particleGroupRef = useRef<SVGGElement>(null);
  const trail1Ref = useRef<SVGCircleElement>(null);
  const trail2Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const parent = container.parentElement || container;

    let pathLength = 0;
    let targetDist = 0;
    let currentDist = 0;
    let isAnimating = false;
    let rafId: number | null = null;

    const buildPath = () => {
      const w = parent.clientWidth || window.innerWidth;
      const h = parent.clientHeight || 5000;
      const isMobile = w < 640;
      const isTablet = w >= 640 && w < 1024;

      if (svgRef.current) {
        svgRef.current.setAttribute("viewBox", `0 0 ${w} ${h}`);
      }
      if (particleSvgRef.current) {
        particleSvgRef.current.setAttribute("viewBox", `0 0 ${w} ${h}`);
      }

      const pRect = parent.getBoundingClientRect();

      // Major sections to flow through top to bottom
      const sectionIds = [
        "services",
        "solutions",
        "education",
        "about",
        "testimonials",
        "faq",
        "cta",
      ];

      const points: Array<[number, number]> = [];

      // 1. Entry point right at the top tip of the line (top of services)
      const servicesEl = document.getElementById("services");
      const firstY = servicesEl
        ? servicesEl.getBoundingClientRect().top - pRect.top + 20
        : 35;
      
      const startX = isMobile ? w * 0.12 : w * 0.08;
      points.push([startX, Math.max(25, firstY)]);

      sectionIds.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const topRel = rect.top - pRect.top;
          const midY = topRel + rect.height * 0.50;

          // Snake between right and left margins with mobile-optimized bounds
          const isRight = idx % 2 === 0;
          const xMargin = isMobile
            ? isRight ? w * 0.88 : w * 0.12
            : isTablet
            ? isRight ? w * 0.90 : w * 0.10
            : isRight ? w * 0.92 : w * 0.08;

          points.push([xMargin, midY]);
        } else {
          const frac = (idx + 1) / (sectionIds.length + 1);
          const isRight = idx % 2 === 0;
          const xMargin = isMobile
            ? isRight ? w * 0.85 : w * 0.15
            : isRight ? w * 0.90 : w * 0.10;
          points.push([xMargin, h * frac]);
        }
      });

      // Exit point towards footer bottom center
      points.push([w * 0.5, h - 45]);

      // Catmull-Rom to Cubic Bezier spline for flowing curvature
      const n = points.length;
      let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
      const baseCompanionOffsetX = isMobile ? 12 : isTablet ? 20 : 32;
      let compD = `M ${(points[0][0] + baseCompanionOffsetX).toFixed(1)} ${(points[0][1] - 18).toFixed(1)}`;

      const tension = isMobile ? 0.18 : 0.24;

      for (let i = 0; i < n - 1; i++) {
        const p0 = points[Math.max(0, i - 1)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(n - 1, i + 2)];

        // Main curve control points
        const cp1x = p1[0] + (p2[0] - p0[0]) * tension;
        const cp1y = p1[1] + (p2[1] - p0[1]) * tension;
        const cp2x = p2[0] - (p3[0] - p1[0]) * tension;
        const cp2y = p2[1] - (p3[1] - p1[1]) * tension;

        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;

        // Offset companion path for architectural ribbon contour
        const baseOffset = isMobile ? 12 : isTablet ? 24 : 44;
        const offset = i % 2 === 0 ? -baseOffset : baseOffset;
        const c_cp1x = cp1x + offset;
        const c_cp2x = cp2x + offset;
        const c_p2x = p2[0] + offset;

        compD += ` C ${c_cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${c_cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${c_p2x.toFixed(1)} ${p2[1].toFixed(1)}`;
      }

      if (pathRef.current) {
        pathRef.current.setAttribute("d", d);
        pathLength = pathRef.current.getTotalLength() || 1;
      }
      if (pathGlowRef.current) {
        pathGlowRef.current.setAttribute("d", d);
      }
      if (companionPathRef.current) {
        companionPathRef.current.setAttribute("d", compD);
      }
    };

    buildPath();

    // Smooth physics loop for fluid particle movement on scroll/touch
    const renderParticle = () => {
      if (!pathRef.current || !particleGroupRef.current || pathLength <= 0) {
        isAnimating = false;
        return;
      }

      // Smooth interpolation towards target distance
      const diff = targetDist - currentDist;
      if (Math.abs(diff) > 0.1) {
        currentDist += diff * 0.18;
      } else {
        currentDist = targetDist;
      }

      const clampedDist = Math.max(0, Math.min(pathLength, currentDist));
      const pt = pathRef.current.getPointAtLength(clampedDist);

      particleGroupRef.current.setAttribute(
        "transform",
        `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)})`
      );

      // Trailing sparkles along the exact curve
      const isMoving = clampedDist > 20;
      const trailSpacing = window.innerWidth < 640 ? 18 : 32;

      if (trail1Ref.current) {
        if (isMoving) {
          const pt1 = pathRef.current.getPointAtLength(Math.max(0, clampedDist - trailSpacing));
          trail1Ref.current.setAttribute("cx", pt1.x.toFixed(1));
          trail1Ref.current.setAttribute("cy", pt1.y.toFixed(1));
          trail1Ref.current.style.opacity = "0.6";
        } else {
          trail1Ref.current.style.opacity = "0";
        }
      }

      if (trail2Ref.current) {
        if (isMoving && clampedDist > trailSpacing * 2) {
          const pt2 = pathRef.current.getPointAtLength(Math.max(0, clampedDist - trailSpacing * 2));
          trail2Ref.current.setAttribute("cx", pt2.x.toFixed(1));
          trail2Ref.current.setAttribute("cy", pt2.y.toFixed(1));
          trail2Ref.current.style.opacity = "0.35";
        } else {
          trail2Ref.current.style.opacity = "0";
        }
      }

      if (Math.abs(diff) > 0.1) {
        rafId = requestAnimationFrame(renderParticle);
        isAnimating = true;
      } else {
        isAnimating = false;
      }
    };

    const updateTargetFromScroll = () => {
      if (!parent || pathLength <= 0) return;

      const pRect = parent.getBoundingClientRect();
      const hWindow = window.innerHeight || 800;
      const totalH = parent.clientHeight || 5000;
      
      // Calculate how far down the user has scrolled through the page body
      const scrollDown = -pRect.top;
      const maxScroll = Math.max(1, totalH - hWindow * 0.5);

      // Smooth monotonic progress along the curve (0.0 to 1.0)
      const rawProgress = (scrollDown + hWindow * 0.3) / maxScroll;
      const progress = Math.max(0, Math.min(1, rawProgress));

      targetDist = progress * pathLength;

      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(renderParticle);
      }
    };

    // ResizeObserver for dynamic page reflows
    const resizeObserver = new ResizeObserver(() => {
      buildPath();
      updateTargetFromScroll();
    });
    resizeObserver.observe(parent);

    const handleScroll = () => {
      updateTargetFromScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial position on load
    updateTargetFromScroll();
    currentDist = targetDist;
    renderParticle();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
    >
      {/* Faint Architectural Gridlines */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.032) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.032) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />

      {/* 1. Background Route Curves & Halos (Z-0) */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="routeGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="routeGradientStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#008688" stopOpacity="0.4" />
            <stop offset="15%" stopColor="#008688" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#00a8aa" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#008688" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#00a8aa" stopOpacity="0.85" />
            <stop offset="90%" stopColor="#008688" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#008688" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Ambient Halo */}
        <path
          ref={pathGlowRef}
          fill="none"
          stroke="#008688"
          strokeWidth="10"
          opacity="0.30"
          filter="url(#routeGlowFilter)"
        />

        {/* Core Luminous Journey Line */}
        <path
          ref={pathRef}
          fill="none"
          stroke="url(#routeGradientStroke)"
          strokeWidth="2.6"
        />

        {/* Architectural Dashed Companion Guideline */}
        <path
          ref={companionPathRef}
          fill="none"
          stroke="#008688"
          strokeWidth="1.2"
          strokeDasharray="6 4"
          opacity="0.45"
        />
      </svg>

      {/* 2. Elevated Floating Dark Teal Particle */}
      <svg
        ref={particleSvgRef}
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="darkTealGlowFilter" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="darkTealParticleAura">
            <stop offset="0%" stopColor="#00a8aa" stopOpacity="0.80" />
            <stop offset="35%" stopColor="#008688" stopOpacity="0.55" />
            <stop offset="75%" stopColor="#005a5b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#008688" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Trailing sparkles along the exact curve */}
        <circle
          ref={trail1Ref}
          r="3.5"
          fill="#008688"
          opacity="0"
          className="transition-opacity duration-200"
        />
        <circle
          ref={trail2Ref}
          r="2.5"
          fill="#008688"
          opacity="0"
          className="transition-opacity duration-200"
        />

        {/* Traveling Dark Teal Particle */}
        <g ref={particleGroupRef} className="transition-opacity duration-200">
          <circle r="22" fill="url(#darkTealParticleAura)" opacity="0.6" />
          <circle
            r="8.5"
            fill="#008688"
            opacity="0.8"
            filter="url(#darkTealGlowFilter)"
          />
          <circle r="5" fill="#008688" />
          <circle r="2" fill="#00b4b6" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}
