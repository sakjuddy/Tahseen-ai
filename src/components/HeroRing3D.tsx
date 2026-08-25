"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroRing3DProps {
  mirrored?: boolean;
}

export default function HeroRing3D({ mirrored = true }: HeroRing3DProps) {
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
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // --- 2. Lighting Setup (Mirrored for Arabic RTL) ---
    const ambientLight = new THREE.AmbientLight(0x020712, 1.2);
    scene.add(ambientLight);

    // Key Light: #5deee0, intensity: 7.0
    const textKeyLight = new THREE.PointLight(0x5deee0, 7.0, 50, 1.1);
    textKeyLight.position.set(mirrored ? 6.0 : -6.0, -3.4, 0.6);
    textKeyLight.castShadow = true;
    scene.add(textKeyLight);

    // Directional Light
    const textDirLight = new THREE.DirectionalLight(0x38bdf8, 3.8);
    textDirLight.position.set(mirrored ? 6.0 : -6.0, -1.5, 1.5);
    scene.add(textDirLight);

    // Rim Light
    const rightRimLight = new THREE.PointLight(0x06b6d4, 8.5, 35);
    rightRimLight.position.set(mirrored ? -6.0 : 6.0, 5.0, 2.0);
    scene.add(rightRimLight);

    // Top Highlight
    const topHighlight = new THREE.DirectionalLight(0xe0ffff, 2.2);
    topHighlight.position.set(mirrored ? -4.0 : 4.0, 8.0, 6.0);
    scene.add(topHighlight);

    // --- 3. 3D Ring Construction (Mirrored on X for Arabic) ---
    const heroGroup = new THREE.Group();
    const isDesktop = window.innerWidth >= 1024;
    const ringBaseX = mirrored ? -2.3 : 2.3;
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
    const baseRotY = mirrored ? 0.66 : -0.66;
    const baseRotZ = mirrored ? 0.99 : -0.99;
    heroGroup.rotation.set(baseRotX, baseRotY, baseRotZ);

    // --- Custom Hollow Ring Perimeter Glow Shader ---
    const glowUniforms = {
      glowColor: { value: new THREE.Color(0x00f5d4) },
      intensity: { value: 1.2 },
      innerRadius: { value: 0.42 },
      outerRadius: { value: 0.78 },
      glowSoftness: { value: 1.6 },
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
          
          float pulse = 1.0 + sin(pulseTime) * 0.08;
          vec3 finalColor = glowColor * intensity * pulse * alpha;
          gl_FragColor = vec4(finalColor, alpha * 0.45 * intensity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const ringGlowGeom = new THREE.PlaneGeometry(6.2, 6.2);
    const ringGlowMesh = new THREE.Mesh(ringGlowGeom, ringGlowShader);
    ringGlowMesh.position.set(0, 0, -0.05);
    heroGroup.add(ringGlowMesh);

    // --- Materials (Exact Face Colors & Polish) ---
    const illuminatedMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x05ad9a, // illuminatedFaceColor: #05ad9a
      emissive: 0x003830,
      emissiveIntensity: 0.35,
      roughness: 0.11,
      metalness: 0.47,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.95,
      side: THREE.DoubleSide,
    });

    const shadedMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x16796d, // shadedFaceColor: #16796d
      emissive: 0x002c25,
      emissiveIntensity: 0.35,
      roughness: 0.11,
      metalness: 0.47,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      side: THREE.DoubleSide,
    });

    const sideCapMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x05d6cb, // outerSideColor: #05d6cb
      emissive: 0x00e5be,
      emissiveIntensity: 0.35,
      roughness: 0.11,
      metalness: 0.47,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      side: THREE.DoubleSide,
    });

    // --- Exact Profile Lathe Geometry ---
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

    // Top Half (Shaded)
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
    heroGroup.add(topMesh);

    // Bottom Half (Illuminated)
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
    heroGroup.add(botMesh);

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

    const glowPulseSpeed = 0.8;

    // --- 4. Interactive Digital Wave Particle Mesh with Edge Fading ---
    const cols = 160;
    const rows = 80;
    const count = cols * rows;
    const waveGeom = new THREE.BufferGeometry();

    const positions = new Float32Array(count * 3);
    const uvs = new Float32Array(count * 2);

    let pIdx = 0;
    const gridWidth = 64.0;
    const gridDepth = 32.0;
    const waveElevationY = -0.2;
    const waveAmplitude = 1.2;
    const waveSpeed = 0.9;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const xNorm = j / (cols - 1);
        const zNorm = i / (rows - 1);

        const xPos = (xNorm - 0.5) * gridWidth;
        const zPos = (zNorm - 0.5) * gridDepth - 2.5;

        positions[pIdx * 3] = xPos;
        positions[pIdx * 3 + 1] = waveElevationY;
        positions[pIdx * 3 + 2] = zPos;

        uvs[pIdx * 2] = xNorm;
        uvs[pIdx * 2 + 1] = zNorm;

        pIdx++;
      }
    }

    waveGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    waveGeom.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

    const pCanvas = document.createElement("canvas");
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext("2d")!;
    const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    grad.addColorStop(0.35, "rgba(5, 173, 154, 0.9)");
    grad.addColorStop(0.7, "rgba(0, 180, 160, 0.35)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 64, 64);

    const pTexture = new THREE.CanvasTexture(pCanvas);

    const waveShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: pTexture },
        pointSize: { value: 0.3 },
        baseAlpha: { value: 1.0 },
      },
      vertexShader: `
        uniform float pointSize;
        varying vec2 vUv;
        varying float vAlpha;
        void main() {
          vUv = uv;
          
          float uNorm = uv.x * 2.0 - 1.0;
          float vNorm = uv.y * 2.0 - 1.0;
          
          float fadeX = cos(uNorm * 3.14159265 * 0.5);
          float fadeZ = cos(vNorm * 3.14159265 * 0.5);
          vAlpha = pow(max(0.0, fadeX), 1.6) * pow(max(0.0, fadeZ), 1.3);

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = pointSize * (350.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec2 vUv;
        varying float vAlpha;
        void main() {
          vec4 texColor = texture2D(pointTexture, gl_PointCoord);
          if (texColor.a < 0.05) discard;
          
          vec3 teal1 = vec3(0.02, 0.68, 0.60); // #05ad9a
          vec3 cyan2 = vec3(0.36, 0.93, 0.88); // #5deee0
          vec3 color = mix(teal1, cyan2, vUv.y * 0.7 + vUv.x * 0.3);
          
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
  }, [mirrored]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
