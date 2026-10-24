'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { SHOWCASE_PAIRS, ProductItem } from '@/data/fashionData';

interface TunnelCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  onSelectProduct: (product: ProductItem) => void;
  activeFrameIndex: number;
}

export default function TunnelCanvas({
  scrollProgress,
  onSelectProduct,
}: TunnelCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const targetCamZ = useRef<number>(11.0);
  const currentCamZ = useRef<number>(11.0);
  const alcovesRef = useRef<{ mesh: THREE.Object3D; product: ProductItem }[]>([]);
  const hoveredProductRef = useRef<ProductItem | null>(null);

  // Map scroll progress (0.0 to 1.0) to camera travel down the hallway
  useEffect(() => {
    const startZ = 11.0;
    const endZ = -68.0;
    targetCamZ.current = startZ + (endZ - startZ) * scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup with warm atmospheric dark tone
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0e0a08);
    scene.fog = new THREE.FogExp2(0x0e0a08, 0.016);

    // 2. Camera setup - centered perspective hallway
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(54, width / height, 0.1, 180);
    camera.position.set(0, 0.15, 11.0);
    camera.lookAt(0, 0.15, -40);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Ambient and Key Lighting
    // Warm dark amber ambient illumination for architectural richness
    const ambientLight = new THREE.AmbientLight(0x35251c, 1.4);
    scene.add(ambientLight);

    // Warm overhead directional light
    const dirLight = new THREE.DirectionalLight(0xffecd0, 1.2);
    dirLight.position.set(0, 8, 4);
    scene.add(dirLight);

    // 5. Polished Mirror Floor (Reflector)
    const floorWidth = 20;
    const floorLength = 110;
    const floorCenterZ = -35;
    const floorGeo = new THREE.PlaneGeometry(floorWidth, floorLength);

    try {
      const reflector = new Reflector(floorGeo, {
        clipBias: 0.003,
        textureWidth: Math.min(width * window.devicePixelRatio, 1024),
        textureHeight: Math.min(height * window.devicePixelRatio, 1024),
        color: 0x140e0b, // Dark warm espresso tint
      });
      reflector.rotation.x = -Math.PI / 2;
      reflector.position.set(0, -2.1, floorCenterZ);
      scene.add(reflector);
    } catch {
      // Fallback specular material if Reflector fails
      const floorMat = new THREE.MeshStandardMaterial({
        color: 0x120d0a,
        roughness: 0.08,
        metalness: 0.85,
      });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(0, -2.1, floorCenterZ);
      scene.add(floor);
    }

    // Floor Center Subtle Seam / Guide Line
    const centerLineGeo = new THREE.PlaneGeometry(0.04, floorLength);
    const centerLineMat = new THREE.MeshBasicMaterial({
      color: 0x8a6d54,
      transparent: true,
      opacity: 0.35,
    });
    const centerLine = new THREE.Mesh(centerLineGeo, centerLineMat);
    centerLine.rotation.x = -Math.PI / 2;
    centerLine.position.set(0, -2.09, floorCenterZ);
    scene.add(centerLine);

    // 6. Glowing Floor Curbs & Rails (Golden Amber + Neon Red)
    // Run along the corridor in front of the camera (from z = 10.5 down to z = -80)
    const corridorLength = 91; // from z = 10.5 to z = -80.5
    const corridorCenterZ = (10.5 + -80.5) / 2; // -35

    const redNeonMat = new THREE.MeshBasicMaterial({ color: 0xff1e0e });
    const yellowNeonMat = new THREE.MeshBasicMaterial({ color: 0xffa800 });
    const curbMat = new THREE.MeshStandardMaterial({
      color: 0x1b130f,
      roughness: 0.55,
      metalness: 0.3,
    });

    // Dark curb structural plinths
    const curbGeo = new THREE.BoxGeometry(0.5, 0.16, corridorLength);
    const leftCurb = new THREE.Mesh(curbGeo, curbMat);
    leftCurb.position.set(-3.55, -2.02, corridorCenterZ);
    scene.add(leftCurb);

    const rightCurb = new THREE.Mesh(curbGeo, curbMat);
    rightCurb.position.set(3.55, -2.02, corridorCenterZ);
    scene.add(rightCurb);

    // Horizontal glowing strips on floor curbs
    // Inner Red Neon Strip
    const floorRedGeo = new THREE.BoxGeometry(0.06, 0.05, corridorLength);
    const leftFloorRed = new THREE.Mesh(floorRedGeo, redNeonMat);
    leftFloorRed.position.set(-3.25, -2.06, corridorCenterZ);
    scene.add(leftFloorRed);

    const rightFloorRed = new THREE.Mesh(floorRedGeo, redNeonMat);
    rightFloorRed.position.set(3.25, -2.06, corridorCenterZ);
    scene.add(rightFloorRed);

    // Outer Golden Amber Neon Strip
    const floorYellowGeo = new THREE.BoxGeometry(0.08, 0.07, corridorLength);
    const leftFloorYellow = new THREE.Mesh(floorYellowGeo, yellowNeonMat);
    leftFloorYellow.position.set(-3.4, -2.03, corridorCenterZ);
    scene.add(leftFloorYellow);

    const rightFloorYellow = new THREE.Mesh(floorYellowGeo, yellowNeonMat);
    rightFloorYellow.position.set(3.4, -2.03, corridorCenterZ);
    scene.add(rightFloorYellow);

    // 7. ARCHITECTURAL LUXURY CEILING MATCHING REFERENCE
    // Solid warm espresso/bronze coffered ceiling plane directly meeting tops of alcoves
    const ceilingY = 2.82;
    const ceilingWidth = 8.4;
    const ceilingGeo = new THREE.PlaneGeometry(ceilingWidth, corridorLength);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x1a130f, // Rich warm espresso tone
      roughness: 0.5,
      metalness: 0.2,
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, ceilingY, corridorCenterZ);
    scene.add(ceiling);

    // Upper Longitudinal Light Coves (Top Left and Top Right Corners)
    // Red neon strip running down ceiling-wall edge
    const upperRedGeo = new THREE.BoxGeometry(0.06, 0.05, corridorLength);
    const leftUpperRed = new THREE.Mesh(upperRedGeo, redNeonMat);
    leftUpperRed.position.set(-3.65, ceilingY - 0.03, corridorCenterZ);
    scene.add(leftUpperRed);

    const rightUpperRed = new THREE.Mesh(upperRedGeo, redNeonMat);
    rightUpperRed.position.set(3.65, ceilingY - 0.03, corridorCenterZ);
    scene.add(rightUpperRed);

    // Warm Golden Amber strip directly adjacent along ceiling edge
    const upperYellowGeo = new THREE.BoxGeometry(0.07, 0.05, corridorLength);
    const leftUpperYellow = new THREE.Mesh(upperYellowGeo, yellowNeonMat);
    leftUpperYellow.position.set(-3.55, ceilingY - 0.05, corridorCenterZ);
    scene.add(leftUpperYellow);

    const rightUpperYellow = new THREE.Mesh(upperYellowGeo, yellowNeonMat);
    rightUpperYellow.position.set(3.55, ceilingY - 0.05, corridorCenterZ);
    scene.add(rightUpperYellow);

    // Overhead Transverse Cross-Beams & Horizontal Light Bars
    // Spaced regularly down the corridor matching the reference perspective
    const beamPositionsZ = [
      9.5, 3.5, -2.5, -8.5, -14.5, -20.5, -26.5, -32.5, -38.5, -44.5, -50.5, -56.5, -62.5, -68.5, -74.5,
    ];

    const crossBeamMat = new THREE.MeshStandardMaterial({
      color: 0x1d1510,
      roughness: 0.45,
      metalness: 0.25,
    });
    const beamLightMat = new THREE.MeshBasicMaterial({
      color: 0xffd37a, // Warm golden white ceiling light
    });
    const beamCoreMat = new THREE.MeshBasicMaterial({
      color: 0xfff3d6, // Inner bright core
    });

    beamPositionsZ.forEach((bz) => {
      // Main cross beam spanning between walls
      const beamGeo = new THREE.BoxGeometry(7.4, 0.22, 0.45);
      const beam = new THREE.Mesh(beamGeo, crossBeamMat);
      beam.position.set(0, ceilingY - 0.11, bz);
      scene.add(beam);

      // Underside warm golden light bar
      const beamLightGeo = new THREE.BoxGeometry(5.6, 0.04, 0.22);
      const beamLight = new THREE.Mesh(beamLightGeo, beamLightMat);
      beamLight.position.set(0, ceilingY - 0.225, bz);
      scene.add(beamLight);

      // Core bright light strip
      const beamCoreGeo = new THREE.BoxGeometry(4.8, 0.02, 0.12);
      const beamCore = new THREE.Mesh(beamCoreGeo, beamCoreMat);
      beamCore.position.set(0, ceilingY - 0.235, bz);
      scene.add(beamCore);

      // Red neon side accent blocks on beam ends
      const redAccentGeo = new THREE.BoxGeometry(0.7, 0.05, 0.22);
      const leftRedAccent = new THREE.Mesh(redAccentGeo, redNeonMat);
      leftRedAccent.position.set(-3.2, ceilingY - 0.22, bz);
      scene.add(leftRedAccent);

      const rightRedAccent = new THREE.Mesh(redAccentGeo, redNeonMat);
      rightRedAccent.position.set(3.2, ceilingY - 0.22, bz);
      scene.add(rightRedAccent);
    });

    // 8. Architectural Wall Pilasters / Panels between Displays
    // Closes the corridor into an authentic luxury gallery (no empty black void)
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x150f0c,
      roughness: 0.65,
      metalness: 0.2,
    });
    const wallSegmentsZ = [-5.0, -23.0, -41.0, -59.0, -73.0];
    wallSegmentsZ.forEach((wz) => {
      const pilasterGeo = new THREE.BoxGeometry(0.4, 4.9, 3.2);
      const leftP = new THREE.Mesh(pilasterGeo, wallMat);
      leftP.position.set(-4.2, 0.35, wz);
      scene.add(leftP);

      const rightP = new THREE.Mesh(pilasterGeo, wallMat);
      rightP.position.set(4.2, 0.35, wz);
      scene.add(rightP);
    });

    // 9. High-Fashion Display Vitrines (Alcoves) with Models
    const textureLoader = new THREE.TextureLoader();
    const alcoves: { mesh: THREE.Object3D; product: ProductItem }[] = [];

    // Helper: Canvas texture for luxury typography ("MEN", "WOMEN", "EXPLORE →")
    const createSignTexture = (title: string, subtitle: string = 'EXPLORE →') => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Luxury serif title in gold-white
        ctx.font = '500 50px "Cormorant Garamond", Georgia, serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.letterSpacing = '6px';
        ctx.shadowColor = 'rgba(255, 220, 160, 0.8)';
        ctx.shadowBlur = 14;
        ctx.fillText(title.toUpperCase(), 256, 120);

        // Subtitle
        ctx.font = '400 20px "Montserrat", sans-serif';
        ctx.fillStyle = '#ffcf77';
        ctx.letterSpacing = '4px';
        ctx.shadowBlur = 8;
        ctx.fillText(subtitle, 256, 175);
      }
      return new THREE.CanvasTexture(canvas);
    };

    SHOWCASE_PAIRS.forEach((pair) => {
      const zPos = pair.zDistance;

      const items = [
        { item: pair.leftItem, x: -4.3, side: 'left' },
        { item: pair.rightItem, x: 4.3, side: 'right' },
      ];

      items.forEach(({ item, x, side }) => {
        const alcoveGroup = new THREE.Group();
        // Position vitrine so top touches ceiling (y = 2.8) and bottom touches floor (y = -2.1)
        alcoveGroup.position.set(x, 0.35, zPos);

        const boxWidth = 3.4;
        const boxHeight = 4.9;
        const boxDepth = 1.3;

        const frameMat = new THREE.MeshStandardMaterial({
          color: 0x1f1611,
          roughness: 0.4,
          metalness: 0.3,
        });

        const frameThickness = 0.22;

        // Top frame
        const topFrame = new THREE.Mesh(
          new THREE.BoxGeometry(boxWidth, frameThickness, boxDepth),
          frameMat
        );
        topFrame.position.set(0, boxHeight / 2 - frameThickness / 2, 0);
        alcoveGroup.add(topFrame);

        // Bottom frame / base
        const bottomFrame = new THREE.Mesh(
          new THREE.BoxGeometry(boxWidth, frameThickness, boxDepth),
          frameMat
        );
        bottomFrame.position.set(0, -boxHeight / 2 + frameThickness / 2, 0);
        alcoveGroup.add(bottomFrame);

        // Side frames
        const sideFrameGeo = new THREE.BoxGeometry(frameThickness, boxHeight, boxDepth);
        const outerSideFrame = new THREE.Mesh(sideFrameGeo, frameMat);
        outerSideFrame.position.set(
          side === 'left' ? -boxWidth / 2 + frameThickness / 2 : boxWidth / 2 - frameThickness / 2,
          0,
          0
        );
        alcoveGroup.add(outerSideFrame);

        const innerSideFrame = new THREE.Mesh(sideFrameGeo, frameMat);
        innerSideFrame.position.set(
          side === 'left' ? boxWidth / 2 - frameThickness / 2 : -boxWidth / 2 + frameThickness / 2,
          0,
          0
        );
        alcoveGroup.add(innerSideFrame);

        // Glowing Golden Border framing the display window
        const borderLightMat = new THREE.MeshBasicMaterial({
          color: 0xffbe44,
        });
        const innerW = boxWidth - frameThickness * 2;
        const innerH = boxHeight - frameThickness * 2;
        const lightThickness = 0.045;
        const lightZ = boxDepth / 2 - 0.04;

        // Top border light
        const tLight = new THREE.Mesh(
          new THREE.BoxGeometry(innerW, lightThickness, lightThickness),
          borderLightMat
        );
        tLight.position.set(0, innerH / 2, lightZ);
        alcoveGroup.add(tLight);

        // Bottom border light
        const bLight = new THREE.Mesh(
          new THREE.BoxGeometry(innerW, lightThickness, lightThickness),
          borderLightMat
        );
        bLight.position.set(0, -innerH / 2, lightZ);
        alcoveGroup.add(bLight);

        // Left border light
        const lLight = new THREE.Mesh(
          new THREE.BoxGeometry(lightThickness, innerH, lightThickness),
          borderLightMat
        );
        lLight.position.set(-innerW / 2, 0, lightZ);
        alcoveGroup.add(lLight);

        // Right border light
        const rLight = new THREE.Mesh(
          new THREE.BoxGeometry(lightThickness, innerH, lightThickness),
          borderLightMat
        );
        rLight.position.set(innerW / 2, 0, lightZ);
        alcoveGroup.add(rLight);

        // Warm Ivory Lightbox Backdrop
        const backdropGeo = new THREE.PlaneGeometry(innerW, innerH);
        const backdropMat = new THREE.MeshBasicMaterial({
          color: 0xfff4e6,
        });
        const backdrop = new THREE.Mesh(backdropGeo, backdropMat);
        backdrop.position.set(0, 0, -boxDepth / 2 + 0.05);
        alcoveGroup.add(backdrop);

        // Model Photograph Plane
        const modelGeo = new THREE.PlaneGeometry(2.65, 3.95);
        const modelMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.98,
        });

        textureLoader.load(
          item.image,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            modelMat.map = tex;
            modelMat.needsUpdate = true;
          },
          undefined,
          (err) => {
            console.warn(`Failed loading model image ${item.image}`, err);
          }
        );

        const modelMesh = new THREE.Mesh(modelGeo, modelMat);
        modelMesh.position.set(0, -0.05, -boxDepth / 2 + 0.12);
        alcoveGroup.add(modelMesh);

        // Focused Interior Spotlight
        const alcoveSpot = new THREE.SpotLight(0xffecd0, 4.0);
        alcoveSpot.position.set(0, innerH / 2 - 0.2, 0.5);
        alcoveSpot.target = modelMesh;
        alcoveSpot.angle = Math.PI / 3;
        alcoveSpot.penumbra = 0.5;
        alcoveSpot.distance = 7;
        alcoveGroup.add(alcoveSpot);

        // Vitrine Serif Signage ("MEN", "WOMEN", etc.)
        const signTex = createSignTexture(item.category, 'EXPLORE →');
        const signGeo = new THREE.PlaneGeometry(2.1, 1.05);
        const signMat = new THREE.MeshBasicMaterial({
          map: signTex,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
        });
        const signMesh = new THREE.Mesh(signGeo, signMat);
        signMesh.position.set(0, -0.95, boxDepth / 2 - 0.02);
        alcoveGroup.add(signMesh);

        // Interactive Raycast Hit Plane
        const hitPlaneGeo = new THREE.PlaneGeometry(innerW, innerH);
        const hitPlaneMat = new THREE.MeshBasicMaterial({
          visible: false,
        });
        const hitPlane = new THREE.Mesh(hitPlaneGeo, hitPlaneMat);
        hitPlane.position.set(0, 0, boxDepth / 2);
        (hitPlane as any).productData = item;
        alcoveGroup.add(hitPlane);

        scene.add(alcoveGroup);
        alcoves.push({ mesh: hitPlane, product: item });
      });
    });

    alcovesRef.current = alcoves;

    // 10. Golden Vanishing Point Portal Archway
    const portalGroup = new THREE.Group();
    portalGroup.position.set(0, 0.35, -80.5);

    const portalW = 5.2;
    const portalH = 4.6;
    const portalLightBorderMat = new THREE.MeshBasicMaterial({
      color: 0xffb733,
    });
    const pThickness = 0.12;

    // Portal glowing outline
    const pTop = new THREE.Mesh(new THREE.BoxGeometry(portalW, pThickness, pThickness), portalLightBorderMat);
    pTop.position.set(0, portalH / 2, 0);
    portalGroup.add(pTop);

    const pBottom = new THREE.Mesh(new THREE.BoxGeometry(portalW, pThickness, pThickness), portalLightBorderMat);
    pBottom.position.set(0, -portalH / 2, 0);
    portalGroup.add(pBottom);

    const pLeft = new THREE.Mesh(new THREE.BoxGeometry(pThickness, portalH, pThickness), portalLightBorderMat);
    pLeft.position.set(-portalW / 2, 0, 0);
    portalGroup.add(pLeft);

    const pRight = new THREE.Mesh(new THREE.BoxGeometry(pThickness, portalH, pThickness), portalLightBorderMat);
    pRight.position.set(portalW / 2, 0, 0);
    portalGroup.add(pRight);

    // Glowing VASTRAA portal logo
    const portalCanvas = document.createElement('canvas');
    portalCanvas.width = 512;
    portalCanvas.height = 512;
    const pCtx = portalCanvas.getContext('2d');
    if (pCtx) {
      pCtx.clearRect(0, 0, 512, 512);
      pCtx.fillStyle = '#ffeed6';
      pCtx.font = '400 48px "Cormorant Garamond", serif';
      pCtx.textAlign = 'center';
      pCtx.letterSpacing = '8px';
      pCtx.shadowColor = 'rgba(255, 180, 50, 0.9)';
      pCtx.shadowBlur = 18;
      pCtx.fillText('VASTRAA', 256, 230);

      pCtx.font = '300 18px "Montserrat", sans-serif';
      pCtx.fillStyle = '#ffb733';
      pCtx.letterSpacing = '5px';
      pCtx.shadowBlur = 10;
      pCtx.fillText('WEAR YOUR STORY', 256, 280);
    }
    const portalTex = new THREE.CanvasTexture(portalCanvas);
    const portalSignMat = new THREE.MeshBasicMaterial({
      map: portalTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const portalSignMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 3.6), portalSignMat);
    portalSignMesh.position.set(0, 0, 0.05);
    portalGroup.add(portalSignMesh);

    scene.add(portalGroup);

    // 11. Subtle Ambient Floating Dust Particles (High Fashion Atmosphere)
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6; // X
      particlePositions[i + 1] = (Math.random() - 0.5) * 4; // Y
      particlePositions[i + 2] = 10 - Math.random() * 85; // Z
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffd999,
      size: 0.045,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 12. Interactive Raycaster for Clicks and Hovers
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const interactiveMeshes = alcovesRef.current.map((a) => a.mesh);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as any;
        if (hit.productData) {
          onSelectProduct(hit.productData);
        }
      }
    };

    const onPointerMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const interactiveMeshes = alcovesRef.current.map((a) => a.mesh);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        const hit = intersects[0].object as any;
        hoveredProductRef.current = hit.productData || null;
      } else {
        document.body.style.cursor = 'default';
        hoveredProductRef.current = null;
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);

    // 13. Window Resize Handler
    const onResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // 14. Smooth Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth lerp camera Z position (fluid scroll dampening)
      currentCamZ.current += (targetCamZ.current - currentCamZ.current) * 0.08;
      camera.position.z = currentCamZ.current;

      // Keep camera level and centered
      camera.position.x = 0;
      camera.position.y = 0.15;
      camera.lookAt(0, 0.15, camera.position.z - 40);

      // Gentle floating particles motion
      particles.rotation.y += 0.0003;

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // 15. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);

      renderer.dispose();
      scene.clear();
      document.body.style.cursor = 'default';
    };
  }, [onSelectProduct]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full absolute inset-0 select-none overflow-hidden"
      style={{ touchAction: 'none' }}
    />
  );
}
