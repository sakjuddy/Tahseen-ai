"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroRing3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene & Camera Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 9.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // --- 2. Lighting Setup (Text-Cast Directional & Ambient) ---
    const ambientLight = new THREE.AmbientLight(0x000c0a, 0.55);
    scene.add(ambientLight);

    // Primary Radiant Light Emitter
    const textKeyLight = new THREE.PointLight(0x5deee0, 13.5, 45, 1.1);
    textKeyLight.position.set(-6.0, -3.4, 0.6);
    textKeyLight.castShadow = true;
    scene.add(textKeyLight);

    const textDirLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
    textDirLight.position.set(-6.0, -1.9, 1.1);
    scene.add(textDirLight);

    // --- 3. 3D Split Ring Construction (Exact Saved Specs) ---
    const heroGroup = new THREE.Group();
    heroGroup.position.set(0.15, 0.1, 0);
    heroGroup.scale.setScalar(0.9);
    scene.add(heroGroup);

    const baseRotX = -0.59;
    const baseRotY = -0.66;
    const baseRotZ = -0.99;
    heroGroup.rotation.set(baseRotX, baseRotY, baseRotZ);

    // Materials
    const illuminatedMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0bdac2,
      emissive: 0x0bdac2,
      emissiveIntensity: 0.18,
      roughness: 0.11,
      metalness: 0.47,
      clearcoat: 1.0,
      reflectivity: 0.88,
      side: THREE.DoubleSide,
    });

    const shadedMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x05b8a3,
      emissive: 0x05b8a3,
      emissiveIntensity: 0.08,
      roughness: 0.15,
      metalness: 0.48,
      clearcoat: 0.6,
      side: THREE.DoubleSide,
    });

    const sideCapMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x05d6cb,
      roughness: 0.22,
      metalness: 0.35,
      side: THREE.DoubleSide,
    });

    function createSplitRing() {
      const group = new THREE.Group();

      const innerR = 1.8;
      const outerR = 2.6;
      const ringDepth = 0.74;
      const halfDepth = ringDepth / 2;
      const bevel = 0.03;

      const profilePoints = [
        new THREE.Vector2(innerR, -halfDepth + bevel),
        new THREE.Vector2(innerR + bevel, -halfDepth),
        new THREE.Vector2(outerR - bevel, -halfDepth),
        new THREE.Vector2(outerR, -halfDepth + bevel),
        new THREE.Vector2(outerR, halfDepth - bevel),
        new THREE.Vector2(outerR - bevel, halfDepth),
        new THREE.Vector2(innerR + bevel, halfDepth),
        new THREE.Vector2(innerR, halfDepth - bevel),
        new THREE.Vector2(innerR, -halfDepth + bevel),
      ];

      const segments = 64;
      const gapAngle = 0.06;
      const arcLength = Math.PI - gapAngle;

      // Top / Left Half (Shaded)
      const topGeom = new THREE.LatheGeometry(
        profilePoints,
        segments,
        gapAngle / 2,
        arcLength
      );
      topGeom.computeVertexNormals();
      const topMesh = new THREE.Mesh(topGeom, shadedMaterial);
      topMesh.rotation.x = Math.PI / 2;
      topMesh.position.set(0, 0.025, 0);
      topMesh.castShadow = true;
      topMesh.receiveShadow = true;
      group.add(topMesh);

      // Bottom / Right Half (Illuminated)
      const botGeom = new THREE.LatheGeometry(
        profilePoints,
        segments,
        Math.PI + gapAngle / 2,
        arcLength
      );
      botGeom.computeVertexNormals();
      const botMesh = new THREE.Mesh(botGeom, illuminatedMaterial);
      botMesh.rotation.x = Math.PI / 2;
      botMesh.position.set(0, 0.015, 0);
      botMesh.castShadow = true;
      botMesh.receiveShadow = true;
      group.add(botMesh);

      // End Caps
      const capWidth = outerR - innerR;
      const capHeight = ringDepth;
      const capGeom = new THREE.PlaneGeometry(capWidth, capHeight);
      const midR = (innerR + outerR) / 2;

      function createCutCap(angle: number) {
        const cap = new THREE.Mesh(capGeom, sideCapMaterial);
        cap.position.set(midR * Math.cos(angle), 0, midR * Math.sin(angle));
        cap.rotation.y = -angle + Math.PI / 2;
        return cap;
      }

      topMesh.add(createCutCap(gapAngle / 2));
      topMesh.add(createCutCap(Math.PI - gapAngle / 2));

      botMesh.add(createCutCap(Math.PI + gapAngle / 2));
      botMesh.add(createCutCap(Math.PI * 2 - gapAngle / 2));

      return group;
    }

    const ring = createSplitRing();
    heroGroup.add(ring);

    // --- 4. Background Animated Particle Wave Grid (Spans wide across screen) ---
    const rows = 32;
    const cols = 72;
    const particleCount = rows * cols;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalY = new Float32Array(particleCount);

    let pIndex = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const u = (j / cols - 0.5) * 48; // Expanded width coverage
        const w = (i / rows - 0.5) * 26;
        const v = Math.sin(j * 0.2) * 1.6 + Math.cos(i * 0.28) * 1.1 - 2.8;

        positions[pIndex * 3] = u;
        positions[pIndex * 3 + 1] = v;
        positions[pIndex * 3 + 2] = w - 4;

        originalY[pIndex] = v;
        pIndex++;
      }
    }
    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const canvasTexture = document.createElement("canvas");
    canvasTexture.width = 32;
    canvasTexture.height = 32;
    const ctx = canvasTexture.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 15);
      grad.addColorStop(0, "rgba(11, 218, 194, 1)");
      grad.addColorStop(0.4, "rgba(5, 184, 163, 0.6)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 15, 0, Math.PI * 2);
      ctx.fill();
    }

    const pTexture = new THREE.CanvasTexture(canvasTexture);
    const particleMat = new THREE.PointsMaterial({
      size: 0.32,
      map: pTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    const lineIndices: number[] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const current = i * cols + j;
        if (j < cols - 1) lineIndices.push(current, current + 1);
        if (i < rows - 1) lineIndices.push(current, current + cols);
      }
    }
    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute("position", particleGeom.getAttribute("position"));
    lineGeom.setIndex(lineIndices);

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x05b8a3,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
    });
    const waveLines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(waveLines);

    // --- 5. Smooth Cursor Parallax Tracking ---
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseX = Math.max(-1, Math.min(1, x));
      mouseY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- 6. Resize Observer ---
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- 7. Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Background wave grid animation
      const posArray = particleGeom.attributes.position.array as Float32Array;
      let idx = 0;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const wave =
            Math.sin(j * 0.2 + elapsedTime * 1.1) * 0.75 +
            Math.cos(i * 0.28 + elapsedTime * 0.85) * 0.55;
          posArray[idx * 3 + 1] = originalY[idx] + wave;
          idx++;
        }
      }
      particleGeom.attributes.position.needsUpdate = true;

      // Parallax rotation & subtle organic floating
      const targetRotX = baseRotX + mouseY * 0.25;
      const targetRotY =
        baseRotY + mouseX * 0.25 + Math.sin(elapsedTime * 0.5) * 0.03;
      const targetRotZ = baseRotZ + Math.cos(elapsedTime * 0.6) * 0.02;

      heroGroup.rotation.x += (targetRotX - heroGroup.rotation.x) * 0.06;
      heroGroup.rotation.y += (targetRotY - heroGroup.rotation.y) * 0.06;
      heroGroup.rotation.z += (targetRotZ - heroGroup.rotation.z) * 0.06;

      heroGroup.position.y = 0.1 + Math.sin(elapsedTime * 1.2) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[460px] sm:min-h-[560px] lg:min-h-[640px] xl:min-h-[720px] flex items-center justify-center pointer-events-none"
    />
  );
}
