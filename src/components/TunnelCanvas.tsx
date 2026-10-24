'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SHOWCASE_PAIRS, ProductItem } from '@/data/fashionData';

interface TunnelCanvasProps {
  scrollProgress: number;
  onSelectProduct: (product: ProductItem) => void;
  activeFrameIndex: number;
}

export default function TunnelCanvas({
  scrollProgress,
  onSelectProduct,
}: TunnelCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetCamZ = useRef<number>(8.0);
  const currentCamZ = useRef<number>(8.0);
  const alcovesRef = useRef<{ mesh: THREE.Object3D; product: ProductItem }[]>([]);

  // Map scroll progress to camera Z
  useEffect(() => {
    const startZ = 8.0;
    const endZ = -68.0;
    targetCamZ.current = startZ + (endZ - startZ) * scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ====== SCENE ======
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0806);
    scene.fog = new THREE.Fog(0x0c0806, 30, 90);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // ====== CAMERA ======
    const camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 200);
    camera.position.set(0, 0.6, 8.0);
    camera.lookAt(0, 0.4, -50);

    // ====== RENDERER ======
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    // ====== MATERIALS ======
    // Dark espresso brown wall material
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x1a120d,
      roughness: 0.7,
      metalness: 0.15,
    });
    // Darker structural beam material
    const beamMat = new THREE.MeshStandardMaterial({
      color: 0x130d09,
      roughness: 0.5,
      metalness: 0.2,
    });
    // Ceiling material - warm dark espresso brown (NOT black)
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x1e1510,
      roughness: 0.65,
      metalness: 0.1,
    });
    // Floor material - dark polished
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x120e0a,
      roughness: 0.15,
      metalness: 0.85,
      envMapIntensity: 0.8,
    });
    // Frame material for display alcoves
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1c1410,
      roughness: 0.4,
      metalness: 0.3,
    });
    // Red neon emissive - SUBTLE, not overpowering
    const redEmissiveMat = new THREE.MeshStandardMaterial({
      color: 0xff2211,
      emissive: 0xff2211,
      emissiveIntensity: 0.7,
      roughness: 0.3,
    });
    // Amber/golden neon emissive - warm golden
    const amberEmissiveMat = new THREE.MeshStandardMaterial({
      color: 0xffaa22,
      emissive: 0xffaa22,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });
    // Warm white ceiling light strip
    const warmLightMat = new THREE.MeshStandardMaterial({
      color: 0xffeedd,
      emissive: 0xffe8cc,
      emissiveIntensity: 0.4,
      roughness: 0.2,
    });
    // Golden frame border glow
    const goldBorderMat = new THREE.MeshStandardMaterial({
      color: 0xdaa520,
      emissive: 0xdaa520,
      emissiveIntensity: 0.5,
      roughness: 0.3,
    });
    // Ivory backdrop for displays
    const ivoryMat = new THREE.MeshBasicMaterial({
      color: 0xfff5e6,
    });

    // ====== TUNNEL DIMENSIONS ======
    const tunnelLength = 120;
    const tunnelHalfW = 5.5; // half-width of corridor
    const tunnelHeight = 4.5;
    const floorY = -2.2;
    const ceilingY = floorY + tunnelHeight; // 2.3
    const tunnelCenterZ = -40;

    // ====== FLOOR ======
    const floorGeo = new THREE.PlaneGeometry(tunnelHalfW * 2, tunnelLength);
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, floorY, tunnelCenterZ);
    floor.receiveShadow = true;
    scene.add(floor);

    // Floor center line - subtle
    const centerLineGeo = new THREE.PlaneGeometry(0.02, tunnelLength);
    const centerLineMat = new THREE.MeshBasicMaterial({
      color: 0x3d2e22,
      transparent: true,
      opacity: 0.3,
    });
    const centerLine = new THREE.Mesh(centerLineGeo, centerLineMat);
    centerLine.rotation.x = -Math.PI / 2;
    centerLine.position.set(0, floorY + 0.001, tunnelCenterZ);
    scene.add(centerLine);

    // ====== CEILING ======
    const ceilGeo = new THREE.PlaneGeometry(tunnelHalfW * 2, tunnelLength);
    const ceiling = new THREE.Mesh(ceilGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, ceilingY, tunnelCenterZ);
    scene.add(ceiling);

    // ====== SIDE WALLS ======
    // Continuous dark brown side walls
    const sideWallGeo = new THREE.PlaneGeometry(tunnelLength, tunnelHeight);
    // Left wall
    const leftWall = new THREE.Mesh(sideWallGeo, wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-tunnelHalfW, floorY + tunnelHeight / 2, tunnelCenterZ);
    scene.add(leftWall);
    // Right wall
    const rightWall = new THREE.Mesh(sideWallGeo, wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(tunnelHalfW, floorY + tunnelHeight / 2, tunnelCenterZ);
    scene.add(rightWall);

    // ====== LIGHTING ======
    // Warm ambient fill
    const ambientLight = new THREE.AmbientLight(0x3d2a1a, 2.0);
    scene.add(ambientLight);

    // Key light - warm overhead
    const keyLight = new THREE.DirectionalLight(0xffeedd, 0.8);
    keyLight.position.set(0, 8, 5);
    scene.add(keyLight);

    // Warm fill from floor
    const fillLight = new THREE.DirectionalLight(0xffcc88, 0.3);
    fillLight.position.set(0, -2, 0);
    scene.add(fillLight);

    // ====== REPEATING ARCHITECTURAL FRAMES (the perspective-enhancing arch structures) ======
    const framePositions = [8, 2, -4, -10, -16, -22, -28, -34, -40, -46, -52, -58, -64, -70, -76];

    framePositions.forEach((zPos) => {
      // Vertical structural columns on each side (close to walls)
      const columnW = 0.35;
      const columnGeo = new THREE.BoxGeometry(columnW, tunnelHeight, 0.5);

      // Left column
      const leftCol = new THREE.Mesh(columnGeo, beamMat);
      leftCol.position.set(-tunnelHalfW + columnW / 2 + 0.05, floorY + tunnelHeight / 2, zPos);
      scene.add(leftCol);

      // Right column
      const rightCol = new THREE.Mesh(columnGeo, beamMat);
      rightCol.position.set(tunnelHalfW - columnW / 2 - 0.05, floorY + tunnelHeight / 2, zPos);
      scene.add(rightCol);

      // Ceiling cross-beam
      const crossBeamGeo = new THREE.BoxGeometry(tunnelHalfW * 2, 0.35, 0.5);
      const crossBeam = new THREE.Mesh(crossBeamGeo, beamMat);
      crossBeam.position.set(0, ceilingY - 0.18, zPos);
      scene.add(crossBeam);

      // Warm ceiling light strip (recessed under beam)
      const ceilLightGeo = new THREE.BoxGeometry(tunnelHalfW * 1.2, 0.03, 0.12);
      const ceilLight = new THREE.Mesh(ceilLightGeo, warmLightMat);
      ceilLight.position.set(0, ceilingY - 0.37, zPos);
      scene.add(ceilLight);

      // Small RED accent strips at beam-wall junction (subtle, thin)
      const redAccentGeo = new THREE.BoxGeometry(0.03, 0.06, 0.35);
      // Left red accent at column top
      const leftRedTop = new THREE.Mesh(redAccentGeo, redEmissiveMat);
      leftRedTop.position.set(-tunnelHalfW + 0.15, ceilingY - 0.5, zPos);
      scene.add(leftRedTop);
      // Right red accent at column top
      const rightRedTop = new THREE.Mesh(redAccentGeo, redEmissiveMat);
      rightRedTop.position.set(tunnelHalfW - 0.15, ceilingY - 0.5, zPos);
      scene.add(rightRedTop);

      // Point light at each beam for warm illumination (sparse - every other beam)
      if (zPos % 12 === 0 || zPos % 10 === 0) {
        const beamPointLight = new THREE.PointLight(0xffcc88, 1.5, 12, 1.5);
        beamPointLight.position.set(0, ceilingY - 0.5, zPos);
        scene.add(beamPointLight);
      }
    });

    // ====== CONTINUOUS FLOOR-LEVEL LIGHT STRIPS (Red + Amber) ======
    // These run along the inner wall-floor junction — THIN and elegant
    const stripLength = tunnelLength;
    const stripZ = tunnelCenterZ;

    // Red strip — inner floor edge (thin!)
    const redStripGeo = new THREE.BoxGeometry(0.04, 0.03, stripLength);
    const leftRedFloor = new THREE.Mesh(redStripGeo, redEmissiveMat);
    leftRedFloor.position.set(-tunnelHalfW + 0.6, floorY + 0.015, stripZ);
    scene.add(leftRedFloor);
    const rightRedFloor = new THREE.Mesh(redStripGeo, redEmissiveMat);
    rightRedFloor.position.set(tunnelHalfW - 0.6, floorY + 0.015, stripZ);
    scene.add(rightRedFloor);

    // Amber/gold strip — slightly further out along curb
    const amberStripGeo = new THREE.BoxGeometry(0.05, 0.025, stripLength);
    const leftAmberFloor = new THREE.Mesh(amberStripGeo, amberEmissiveMat);
    leftAmberFloor.position.set(-tunnelHalfW + 0.3, floorY + 0.013, stripZ);
    scene.add(leftAmberFloor);
    const rightAmberFloor = new THREE.Mesh(amberStripGeo, amberEmissiveMat);
    rightAmberFloor.position.set(tunnelHalfW - 0.3, floorY + 0.013, stripZ);
    scene.add(rightAmberFloor);

    // Upper wall red accent lines (very thin, running along wall-ceiling junction)
    const upperRedGeo = new THREE.BoxGeometry(0.025, 0.025, stripLength);
    const leftUpperRed = new THREE.Mesh(upperRedGeo, redEmissiveMat);
    leftUpperRed.position.set(-tunnelHalfW + 0.05, ceilingY - 0.08, stripZ);
    scene.add(leftUpperRed);
    const rightUpperRed = new THREE.Mesh(upperRedGeo, redEmissiveMat);
    rightUpperRed.position.set(tunnelHalfW - 0.05, ceilingY - 0.08, stripZ);
    scene.add(rightUpperRed);

    // ====== DISPLAY ALCOVES — Fashion Model Showcases ======
    const alcoves: { mesh: THREE.Object3D; product: ProductItem }[] = [];

    // Helper: create label texture
    const createLabelTexture = (title: string, subtitle: string = 'EXPLORE →') => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Title
        ctx.font = '500 56px serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(255, 200, 100, 0.5)';
        ctx.shadowBlur = 12;
        ctx.fillText(title, 256, 90);
        // Subtitle
        ctx.font = '300 18px sans-serif';
        ctx.fillStyle = '#e8c875';
        ctx.shadowBlur = 6;
        ctx.fillText(subtitle, 256, 135);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };

    SHOWCASE_PAIRS.forEach((pair) => {
      const zPos = pair.zDistance;

      const items: { item: ProductItem; xPos: number; side: 'left' | 'right' }[] = [
        { item: pair.leftItem, xPos: -3.6, side: 'left' },
        { item: pair.rightItem, xPos: 3.6, side: 'right' },
      ];

      items.forEach(({ item, xPos, side }) => {
        const group = new THREE.Group();
        group.position.set(xPos, floorY + 0.01, zPos);

        // Display dimensions — LARGE to dominate the viewport
        const displayW = 3.2;
        const displayH = 4.2;
        const displayD = 0.9;
        const frameThick = 0.18;

        // ---- Outer dark frame box (4 sides) ----
        // Top frame
        const topF = new THREE.Mesh(
          new THREE.BoxGeometry(displayW, frameThick, displayD),
          frameMat
        );
        topF.position.set(0, displayH - frameThick / 2, 0);
        group.add(topF);

        // Bottom frame / base
        const bottomF = new THREE.Mesh(
          new THREE.BoxGeometry(displayW, frameThick * 1.5, displayD),
          frameMat
        );
        bottomF.position.set(0, frameThick * 0.75, 0);
        group.add(bottomF);

        // Side frames
        const sideGeo = new THREE.BoxGeometry(frameThick, displayH, displayD);
        const outerSide = new THREE.Mesh(sideGeo, frameMat);
        outerSide.position.set(
          side === 'left' ? -displayW / 2 + frameThick / 2 : displayW / 2 - frameThick / 2,
          displayH / 2,
          0
        );
        group.add(outerSide);

        const innerSide = new THREE.Mesh(sideGeo, frameMat);
        innerSide.position.set(
          side === 'left' ? displayW / 2 - frameThick / 2 : -displayW / 2 + frameThick / 2,
          displayH / 2,
          0
        );
        group.add(innerSide);

        // ---- Golden glow border (inner perimeter) ----
        const innerW = displayW - frameThick * 2;
        const innerH = displayH - frameThick * 2.5;
        const borderThick = 0.035;
        const borderFrontZ = displayD / 2 - 0.02;

        // Top gold
        group.add(
          (() => {
            const m = new THREE.Mesh(
              new THREE.BoxGeometry(innerW + 0.1, borderThick, borderThick),
              goldBorderMat
            );
            m.position.set(0, displayH - frameThick - borderThick / 2, borderFrontZ);
            return m;
          })()
        );
        // Bottom gold
        group.add(
          (() => {
            const m = new THREE.Mesh(
              new THREE.BoxGeometry(innerW + 0.1, borderThick, borderThick),
              goldBorderMat
            );
            m.position.set(0, frameThick * 1.5 + borderThick / 2, borderFrontZ);
            return m;
          })()
        );
        // Left gold
        group.add(
          (() => {
            const m = new THREE.Mesh(
              new THREE.BoxGeometry(borderThick, innerH + 0.1, borderThick),
              goldBorderMat
            );
            m.position.set(-innerW / 2, displayH / 2 + frameThick * 0.25 / 2, borderFrontZ);
            return m;
          })()
        );
        // Right gold
        group.add(
          (() => {
            const m = new THREE.Mesh(
              new THREE.BoxGeometry(borderThick, innerH + 0.1, borderThick),
              goldBorderMat
            );
            m.position.set(innerW / 2, displayH / 2 + frameThick * 0.25 / 2, borderFrontZ);
            return m;
          })()
        );

        // ---- Ivory lightbox backdrop ----
        const backdrop = new THREE.Mesh(
          new THREE.PlaneGeometry(innerW, innerH),
          ivoryMat
        );
        backdrop.position.set(0, displayH / 2 + frameThick * 0.25 / 2, -displayD / 2 + 0.03);
        group.add(backdrop);

        // ---- Fashion model photograph ----
        const photoW = innerW * 0.92;
        const photoH = innerH * 0.94;
        const photoGeo = new THREE.PlaneGeometry(photoW, photoH);
        const photoMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
        });

        textureLoader.load(
          item.image,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            photoMat.map = tex;
            photoMat.needsUpdate = true;
          },
          undefined,
          (err) => console.warn('Texture load error:', item.image, err)
        );

        const photoMesh = new THREE.Mesh(photoGeo, photoMat);
        photoMesh.position.set(0, displayH / 2 + frameThick * 0.25 / 2, -displayD / 2 + 0.08);
        group.add(photoMesh);

        // ---- Spotlight inside alcove ----
        const spot = new THREE.SpotLight(0xfff0dd, 4.0, 8, Math.PI / 3, 0.5);
        spot.position.set(0, displayH - 0.3, displayD / 2 + 0.5);
        spot.target = photoMesh;
        group.add(spot);

        // ---- Label sign ----
        const labelTex = createLabelTexture(item.category, 'EXPLORE →');
        const labelGeo = new THREE.PlaneGeometry(1.8, 0.7);
        const labelMat = new THREE.MeshBasicMaterial({
          map: labelTex,
          transparent: true,
          blending: THREE.AdditiveBlending,
          opacity: 0.9,
        });
        const labelMesh = new THREE.Mesh(labelGeo, labelMat);
        labelMesh.position.set(0, 1.2, displayD / 2 + 0.01);
        group.add(labelMesh);

        // ---- Red accent strip at alcove top edge ----
        const alcoveRedGeo = new THREE.BoxGeometry(displayW + 0.1, 0.03, 0.03);
        const alcoveRed = new THREE.Mesh(alcoveRedGeo, redEmissiveMat);
        alcoveRed.position.set(0, displayH + 0.02, displayD / 2);
        group.add(alcoveRed);

        // ---- Amber accent strip at alcove base ----
        const alcoveAmberGeo = new THREE.BoxGeometry(displayW + 0.1, 0.025, 0.025);
        const alcoveAmber = new THREE.Mesh(alcoveAmberGeo, amberEmissiveMat);
        alcoveAmber.position.set(0, 0.02, displayD / 2);
        group.add(alcoveAmber);

        // ---- Interactive hit plane ----
        const hitGeo = new THREE.PlaneGeometry(displayW, displayH);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitPlane = new THREE.Mesh(hitGeo, hitMat);
        hitPlane.position.set(0, displayH / 2, displayD / 2 + 0.05);
        (hitPlane as any).productData = item;
        group.add(hitPlane);

        scene.add(group);
        alcoves.push({ mesh: hitPlane, product: item });
      });
    });

    alcovesRef.current = alcoves;

    // ====== VANISHING POINT PORTAL ======
    const portalGroup = new THREE.Group();
    portalGroup.position.set(0, floorY + tunnelHeight / 2, -82);

    // Warm glowing frame
    const pW = 4.5, pH = 3.8, pT = 0.08;
    const pMat = new THREE.MeshStandardMaterial({
      color: 0xdaa520,
      emissive: 0xdaa520,
      emissiveIntensity: 0.4,
    });
    // Top
    portalGroup.add((() => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(pW, pT, pT), pMat);
      m.position.set(0, pH / 2, 0);
      return m;
    })());
    // Bottom
    portalGroup.add((() => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(pW, pT, pT), pMat);
      m.position.set(0, -pH / 2, 0);
      return m;
    })());
    // Left
    portalGroup.add((() => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(pT, pH, pT), pMat);
      m.position.set(-pW / 2, 0, 0);
      return m;
    })());
    // Right
    portalGroup.add((() => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(pT, pH, pT), pMat);
      m.position.set(pW / 2, 0, 0);
      return m;
    })());

    // VASTRAA text sign
    const portalCanvas = document.createElement('canvas');
    portalCanvas.width = 512;
    portalCanvas.height = 512;
    const pCtx = portalCanvas.getContext('2d');
    if (pCtx) {
      pCtx.clearRect(0, 0, 512, 512);
      pCtx.fillStyle = '#ffe0a0';
      pCtx.font = '400 48px serif';
      pCtx.textAlign = 'center';
      pCtx.shadowColor = 'rgba(255, 170, 0, 0.8)';
      pCtx.shadowBlur = 20;
      pCtx.fillText('VASTRAA', 256, 230);
      pCtx.font = '300 16px sans-serif';
      pCtx.fillStyle = '#ddaa44';
      pCtx.shadowBlur = 10;
      pCtx.fillText('WEAR YOUR STORY', 256, 275);
    }
    const portalTex = new THREE.CanvasTexture(portalCanvas);
    const portalSign = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 3.2),
      new THREE.MeshBasicMaterial({
        map: portalTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
      })
    );
    portalSign.position.set(0, 0, 0.05);
    portalGroup.add(portalSign);

    // Dark backing
    portalGroup.add((() => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(pW - 0.2, pH - 0.2),
        new THREE.MeshBasicMaterial({ color: 0x110d08 })
      );
      m.position.set(0, 0, -0.02);
      return m;
    })());

    scene.add(portalGroup);

    // ====== INTERACTION ======
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hitMeshes = alcovesRef.current.map((a) => a.mesh);
      const intersects = raycaster.intersectObjects(hitMeshes);
      if (intersects.length > 0) {
        const data = (intersects[0].object as any).productData;
        if (data) onSelectProduct(data);
      }
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hitMeshes = alcovesRef.current.map((a) => a.mesh);
      const intersects = raycaster.intersectObjects(hitMeshes);
      renderer.domElement.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);

    // ====== RESIZE ======
    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ====== ANIMATION ======
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth lerp camera Z
      currentCamZ.current += (targetCamZ.current - currentCamZ.current) * 0.07;
      camera.position.set(0, 0.6, currentCamZ.current);
      camera.lookAt(0, 0.4, camera.position.z - 40);

      renderer.render(scene, camera);
    };

    animate();

    // ====== CLEANUP ======
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.dispose();
      scene.clear();
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
