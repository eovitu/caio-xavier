'use client';

import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';

export function Bag({ progress, reduced }: {
  progress: RefObject<number>;
  reduced: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    element.append(renderer.domElement);
    element.dataset.ready = 'true';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
    camera.position.set(0, 0, 7.3);
    scene.add(new THREE.HemisphereLight(0xe4defc, 0x4c2631, 2.5));
    const key = new THREE.DirectionalLight(0xffebd3, 3.1);
    key.position.set(-4, 5, 7);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff57ac, 2.9);
    rim.position.set(4, 2, -4);
    scene.add(rim);

    const pixels = new Uint8Array(128 * 128 * 4);
    for (let y = 0; y < 128; y++) {
      for (let x = 0; x < 128; x++) {
        const index = (y * 128 + x) * 4;
        const grain = (x * 73 + y * 137 + x * y * 29) % 37;
        const weave = (x + y * 2) % 5 < 2 ? 35 : 0;
        pixels.set([118 + grain + weave, 137 + grain + weave, 155 + grain + weave, 255], index);
      }
    }
    const fabric = new THREE.DataTexture(pixels, 128, 128);
    fabric.wrapS = fabric.wrapT = THREE.RepeatWrapping;
    fabric.repeat.set(8, 8);
    fabric.colorSpace = THREE.SRGBColorSpace;
    fabric.magFilter = THREE.LinearFilter;
    fabric.minFilter = THREE.LinearMipmapLinearFilter;
    fabric.generateMipmaps = true;
    fabric.needsUpdate = true;

    const bag = new THREE.Group();
    scene.add(bag);
    const denim = new THREE.MeshStandardMaterial({ color: 0x76889f, map: fabric, bumpMap: fabric, bumpScale: .025, roughness: .94 });
    const pocket = denim.clone();
    pocket.color.set(0x526a84);
    const strap = new THREE.MeshStandardMaterial({ color: 0x222837, roughness: .89, map: fabric });
    const stitch = new THREE.MeshStandardMaterial({ color: 0xe5a873, roughness: .88 });
    const metal = new THREE.MeshStandardMaterial({ color: 0xc6b8a2, metalness: .77, roughness: .34 });
    function mesh(geometry: THREE.BufferGeometry, material: THREE.Material) {
      const object = new THREE.Mesh(geometry, material);
      bag.add(object);
      return object;
    }
    function panel(width: number, height: number, depth: number, material: THREE.Material) {
      const shape = new THREE.Shape();
      shape.moveTo(-width / 2, height / 3);
      shape.quadraticCurveTo(-width / 2, height / 2, -width / 3, height / 2);
      shape.lineTo(width / 3, height / 2);
      shape.quadraticCurveTo(width / 2, height / 2, width / 2, height / 3);
      shape.lineTo(width * .46, -height * .32);
      shape.quadraticCurveTo(width * .45, -height / 2, width * .26, -height / 2);
      shape.lineTo(-width * .26, -height / 2);
      shape.quadraticCurveTo(-width * .45, -height / 2, -width * .46, -height * .32);
      shape.closePath();
      return mesh(new THREE.ExtrudeGeometry(shape, {
        depth, bevelEnabled: true, bevelThickness: .085, bevelSize: .075, bevelSegments: 4, curveSegments: 22,
      }), material);
    }
    panel(2.72, 1.5, .53, denim).position.set(0, -.46, -.28);
    panel(2.23, .83, .13, pocket).position.set(0, -.57, .29);
    panel(1.38, .58, .08, pocket).position.set(-.12, -.41, -.37);
    const strapPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.28, -.04, 0), new THREE.Vector3(-1.04, .83, -.13),
      new THREE.Vector3(-.38, 1.46, -.12), new THREE.Vector3(.47, 1.36, -.1),
      new THREE.Vector3(1.1, .72, .02), new THREE.Vector3(1.29, -.02, 0),
    ]);
    mesh(new THREE.TubeGeometry(strapPath, 72, .082, 10, false), strap);
    mesh(new THREE.BoxGeometry(.27, .32, .1), metal).position.set(.93, .96, -.02);
    mesh(new THREE.BoxGeometry(2.24, .064, .037), strap).position.set(0, -.22, .52);
    const zipper = mesh(new THREE.BoxGeometry(.074, .18, .045), metal);
    zipper.position.set(.8, -.29, .554);
    zipper.rotation.z = -.28;
    for (let i = 0; i < 28; i++) {
      const thread = mesh(new THREE.BoxGeometry(.043, .015, .016), stitch);
      thread.position.set(-1.02 + i * .075, -.89, .445);
    }
    const label = mesh(new THREE.BoxGeometry(.33, .19, .026), stitch);
    label.position.set(-.64, -.55, .445);

    const resize = new ResizeObserver(() => {
      if (!element.clientWidth || !element.clientHeight) return;
      renderer.setSize(element.clientWidth, element.clientHeight);
      camera.aspect = element.clientWidth / element.clientHeight;
      camera.updateProjectionMatrix();
    });
    resize.observe(element);
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(element);
    renderer.setAnimationLoop(() => {
      if (!visible || document.hidden) return;
      const value = progress.current;
      bag.rotation.y = -.38 + value * Math.PI * 2;
      bag.rotation.z = -.14 + Math.sin(value * Math.PI) * .24;
      camera.position.z = 7.3 - Math.max(0, (value - .67) / .33) * 2.35;
      camera.position.y = -.43 * Math.max(0, (value - .67) / .33);
      renderer.render(scene, camera);
    });
    return () => {
      observer.disconnect();
      resize.disconnect();
      renderer.setAnimationLoop(null);
      bag.traverse((object) => { if (object instanceof THREE.Mesh) object.geometry.dispose(); });
      for (const material of [denim, pocket, strap, stitch, metal]) material.dispose();
      fabric.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      delete element.dataset.ready;
    };
  }, [progress, reduced]);

  return <div className="model" ref={host} role="img" aria-label="Estudo tridimensional de uma bolsa transversal em jeans" />;
}
