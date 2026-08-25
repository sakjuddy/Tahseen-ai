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

    // --- 2. Lighting Setup (Crisp Electric Cyan & Radiant Brand Teal) ---
    const ambientLight = new THREE.AmbientLight(0x020712, 1.2);
    scene.add(ambientLight);

    // Primary Radiant Electric Teal Light Emitter
    const textKeyLight = new THREE.PointLight(0x00f5d4, 15.0, 50, 1.1);
    textKeyLight.position.set(-6.0, -3.0, 1.2);
    textKeyLight.castShadow = true;
    scene.add(textKeyLight);

    // Crisp Cyan Directional Light to eliminate greenish cast
    const textDirLight = new THREE.DirectionalLight(0x38bdf8, 3.8);
    textDirLight.position.set(-6.0, -1.5, 1.5);
    scene.add(textDirLight);

    // Vibrant Electric Cyan / Teal Rim Light
    const rightRimLight = new THREE.PointLight(0x06b6d4, 8.5, 35);
    rightRimLight.position.set(6.0, 5.0, 2.0);
    scene.add(rightRimLight);

    // Top Specular Highlight
    const topHighlight = new THREE.DirectionalLight(0xe0ffff, 2.2);
    topHighlight.position.set(4.0, 8.0, 6.0);
    scene.add(topHighlight);

    // --- 3. Finalized 3D Split Ring Construction ---
    const heroGroup = new THREE.Group();
    const isDesktop = window.innerWidth >= 1024;
    const ringBaseX = 2.3;
    const ringBaseY = 1.35;
    const ringBaseZ = 0.0;
    const ringBaseScale = 0.75;

    heroGroup.position.set(
      isDesktop ? ringBaseX : 0,
      isDesktop ? ringBaseY : 1.2,
      ringBaseZ
    );
    heroGroup.scale.setScalar(isDesktop ? ringBaseScale : 0.65);
    scene.add(heroGroup);

    const baseRotX = -0.59;
    const baseRotY = -0.66;
    const baseRotZ = -0.99;
    heroGroup.rotation.set(baseRotX, baseRotY, baseRotZ);

    // --- Custom Hollow Ring Perimeter Glow Shader (Pure Cyan / Teal) ---
    const glowUniforms = {
      glowColor: { value: new THREE.Color(0x00f5d4) },
      intensity: { value: 0.15 },
      innerRadius: { value: 0.36 },
      outerRadius: { value: 1.1 },
      glowSoftness: { value: 3.5 },
      pulseTime: { value: 0.0 },
    };

    const ringGlowShader = new THREE.ShaderMaterial({
      uniforms: glowUniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 glowColor;
        uniform float intensity;
        uniform float innerRadius;
        uniform float outerRadius;
        uniform float glowSoftness;
        uniform float pulseTime;

        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center) * 2.0;
          
          float midRadius = (innerRadius + outerRadius) * 0.5;
          float halfWidth = (outerRadius - innerRadius) * 0.5;
          float distFromMid = abs(dist - midRadius);
          
          float alpha = smoothstep(halfWidth, 0.0, distFromMid);
          alpha = pow(alpha, glowSoftness);

          float pulse = 1.0 + sin(pulseTime * 2.5) * 0.12;
          float finalAlpha = alpha * intensity * pulse;

          gl_FragColor = vec4(glowColor, clamp(finalAlpha, 0.0, 1.0));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const ringGlowGeom = new THREE.PlaneGeometry(8.2, 8.2);
    const ringGlowMesh = new THREE.Mesh(ringGlowGeom, ringGlowShader);
    ringGlowMesh.position.set(0, 0, -0.08);
    heroGroup.add(ringGlowMesh);

    // Materials (Fixed: Pure Vibrant Brand Teal & Electric Cyan #00E5BE / #00F5D4)
    const illuminatedMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00f5d4,            // Pure saturated vibrant cyan/teal
      emissive: 0x003830,
      emissiveIntensity: 0.25,
      roughness: 0.12,
      metalness: 0.45,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.95,
      side: THREE.DoubleSide,
    });

    const shadedMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00d2b4,            // Rich brand teal
      emissive: 0x002c25,
      emissiveIntensity: 0.18,
      roughness: 0.16,
      metalness: 0.48,
      clearcoat: 0.6,
      side: THREE.DoubleSide,
    });

    const sideCapMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00f5d4,
      emissive: 0x00e5be,
      emissiveIntensity: 0.4,
      roughness: 0.12,
      metalness: 0.4,
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

    heroGroup.add(createSplitRing());

    // --- 4. Digital Particle Wave (Exact Tuned Wave Specs) ---
    const rows = 48;
    const cols = 110;
    const totalParticles = rows * cols;

    const waveGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(totalParticles * 3);
    const originalY = new Float32Array(totalParticles);
    const alphas = new Float32Array(totalParticles);
    const sizes = new Float32Array(totalParticles);

    let pIdx = 0;
    const gridWidth = 64.0;
    const gridDepth = 32.0;
    const waveElevationY = -0.2;
    const waveAmplitude = 1.2;
    const waveAlphaMax = 1.0;
    const waveBaseSize = 0.3;
    const waveSpeed = 0.9;
    const glowPulseSpeed = 1.7;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const uNorm = (j / (cols - 1)) * 2.0 - 1.0;
        const vNorm = (i / (rows - 1)) * 2.0 - 1.0;

        const x = uNorm * (gridWidth * 0.5);
        const z = vNorm * (gridDepth * 0.5) - 3.5;

        const fadeX = Math.cos(uNorm * Math.PI * 0.5);
        const fadeZ = Math.cos(vNorm * Math.PI * 0.5);
        const edgeFade =
          Math.pow(Math.max(0.0, fadeX), 1.6) *
          Math.pow(Math.max(0.0, fadeZ), 1.3);

        const baseY =
          (Math.sin(j * 0.18) * waveAmplitude +
            Math.cos(i * 0.25) * 1.1 +
            waveElevationY) *
          edgeFade;

        positions[pIdx * 3] = x;
        positions[pIdx * 3 + 1] = baseY;
        positions[pIdx * 3 + 2] = z;

        originalY[pIdx] = baseY;
        alphas[pIdx] = edgeFade * waveAlphaMax;
        sizes[pIdx] = Math.max(0.04, edgeFade * waveBaseSize);

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
        color: { value: new THREE.Color(0x00f5d4) },
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

      const desk = width >= 1024;
      heroGroup.position.set(
        desk ? ringBaseX : 0,
        desk ? ringBaseY : 1.2,
        ringBaseZ
      );
      heroGroup.scale.setScalar(desk ? ringBaseScale : 0.65);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- 7. Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update ring glow pulse
      glowUniforms.pulseTime.value = elapsedTime * glowPulseSpeed;

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
            (Math.sin(j * 0.18 + elapsedTime * waveSpeed * 1.1) *
              (waveAmplitude * 0.5) +
              Math.cos(i * 0.25 + elapsedTime * waveSpeed * 0.85) * 0.55 +
              waveElevationY) *
            edgeFade;

          posArray[idx * 3 + 1] = wave;
          idx++;
        }
      }
      waveGeom.attributes.position.needsUpdate = true;

      // Parallax rotation & subtle organic floating
      const targetRotX = baseRotX + mouseY * 0.18;
      const targetRotY =
        baseRotY + mouseX * 0.18 + Math.sin(elapsedTime * 0.5) * 0.02;
      const targetRotZ = baseRotZ + Math.cos(elapsedTime * 0.6) * 0.015;

      heroGroup.rotation.x += (targetRotX - heroGroup.rotation.x) * 0.06;
      heroGroup.rotation.y += (targetRotY - heroGroup.rotation.y) * 0.06;
      heroGroup.rotation.z += (targetRotZ - heroGroup.rotation.z) * 0.06;

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
      ringGlowGeom.dispose();
      ringGlowShader.dispose();
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
