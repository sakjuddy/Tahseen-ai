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
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10.5);

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
    const textKeyLight = new THREE.PointLight(0x5deee0, 14.0, 50, 1.1);
    textKeyLight.position.set(-6.0, -3.0, 1.2);
    textKeyLight.castShadow = true;
    scene.add(textKeyLight);

    const textDirLight = new THREE.DirectionalLight(0x38bdf8, 3.2);
    textDirLight.position.set(-6.0, -1.5, 1.5);
    scene.add(textDirLight);

    // Top Right Rim Highlight
    const rightRimLight = new THREE.PointLight(0x0bdac2, 6.0, 35);
    rightRimLight.position.set(6.0, 5.0, 2.0);
    scene.add(rightRimLight);

    // --- 3. Finalized 3D Split Ring Construction (Positioned on Right) ---
    const heroGroup = new THREE.Group();
    // Responsive X Position: on desktop, align to right side; on mobile, center
    const isDesktop = window.innerWidth >= 1024;
    heroGroup.position.set(isDesktop ? 2.9 : 0, isDesktop ? 0.1 : 0.8, 0);
    heroGroup.scale.setScalar(isDesktop ? 0.95 : 0.75);
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

    // --- 4. Digital Particle Wave Spanning Full Hero Width (Under Left Text to Right) ---
    const rows = 48;
    const cols = 110;
    const totalParticles = rows * cols;

    const waveGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(totalParticles * 3);
    const originalY = new Float32Array(totalParticles);
    const alphas = new Float32Array(totalParticles);
    const sizes = new Float32Array(totalParticles);

    let pIdx = 0;
    // Extra wide width so the wave extends across entire text side
    const gridWidth = 64.0;
    const gridDepth = 32.0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const uNorm = (j / (cols - 1)) * 2.0 - 1.0;
        const vNorm = (i / (rows - 1)) * 2.0 - 1.0;

        const x = uNorm * (gridWidth * 0.5);
        const z = vNorm * (gridDepth * 0.5) - 3.5;

        // Smooth Edge Falloff: Gentle fade at far left/right boundaries
        const fadeX = Math.cos(uNorm * Math.PI * 0.5);
        const fadeZ = Math.cos(vNorm * Math.PI * 0.5);
        const edgeFade = Math.pow(Math.max(0.0, fadeX), 1.6) * Math.pow(Math.max(0.0, fadeZ), 1.3);

        // Wave elevation positioned right behind & under the text
        const baseY = (Math.sin(j * 0.18) * 1.5 + Math.cos(i * 0.25) * 1.1 - 1.8) * edgeFade;

        positions[pIdx * 3] = x;
        positions[pIdx * 3 + 1] = baseY;
        positions[pIdx * 3 + 2] = z;

        originalY[pIdx] = baseY;
        alphas[pIdx] = edgeFade * 0.95;
        sizes[pIdx] = Math.max(0.05, edgeFade * 0.42);

        pIdx++;
      }
    }

    waveGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    waveGeom.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
    waveGeom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // High-Luminance Radial Glow Particle Texture
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
      pGrad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
      pGrad.addColorStop(0.2, "rgba(0, 245, 212, 1.0)");
      pGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.85)");
      pGrad.addColorStop(0.8, "rgba(0, 180, 216, 0.3)");
      pGrad.addColorStop(1, "rgba(0, 0, 0, 0.0)");
      pCtx.fillStyle = pGrad;
      pCtx.beginPath();
      pCtx.arc(32, 32, 30, 0, Math.PI * 2);
      pCtx.fill();
    }

    const pTexture = new THREE.CanvasTexture(pCanvas);

    const waveShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: pTexture },
        color: { value: new THREE.Color(0x26ffdf) },
      },
      vertexShader: `
        attribute float alpha;
        attribute float size;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (420.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform sampler2D pointTexture;
        varying float vAlpha;
        void main() {
          vec4 texColor = texture2D(pointTexture, gl_PointCoord);
          gl_FragColor = vec4(color * 1.15, vAlpha * texColor.a);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const waveParticleSystem = new THREE.Points(waveGeom, waveShaderMaterial);
    scene.add(waveParticleSystem);

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
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const desktop = width >= 1024;
      heroGroup.position.set(desktop ? 2.9 : 0, desktop ? 0.1 : 0.8, 0);
      heroGroup.scale.setScalar(desktop ? 0.95 : 0.75);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- 7. Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Undulating wave animation extending under text
      const posArray = waveGeom.attributes.position.array as Float32Array;
      let idx = 0;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const uNorm = (j / (cols - 1)) * 2.0 - 1.0;
          const vNorm = (i / (rows - 1)) * 2.0 - 1.0;

          const fadeX = Math.cos(uNorm * Math.PI * 0.5);
          const fadeZ = Math.cos(vNorm * Math.PI * 0.5);
          const edgeFade =
            Math.pow(Math.max(0.0, fadeX), 1.6) *
            Math.pow(Math.max(0.0, fadeZ), 1.3);

          const wave =
            (Math.sin(j * 0.18 + elapsedTime * 1.1) * 0.75 +
              Math.cos(i * 0.25 + elapsedTime * 0.85) * 0.55) *
            edgeFade;

          posArray[idx * 3 + 1] = originalY[idx] + wave;
          idx++;
        }
      }
      waveGeom.attributes.position.needsUpdate = true;

      // Parallax rotation & subtle organic floating
      const targetRotX = baseRotX + mouseY * 0.22;
      const targetRotY =
        baseRotY + mouseX * 0.22 + Math.sin(elapsedTime * 0.5) * 0.03;
      const targetRotZ = baseRotZ + Math.cos(elapsedTime * 0.6) * 0.02;

      heroGroup.rotation.x += (targetRotX - heroGroup.rotation.x) * 0.06;
      heroGroup.rotation.y += (targetRotY - heroGroup.rotation.y) * 0.06;
      heroGroup.rotation.z += (targetRotZ - heroGroup.rotation.z) * 0.06;

      const isDesk = container.clientWidth >= 1024;
      const basePosY = isDesk ? 0.1 : 0.8;
      heroGroup.position.y = basePosY + Math.sin(elapsedTime * 1.2) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      waveGeom.dispose();
      waveShaderMaterial.dispose();
      pTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
