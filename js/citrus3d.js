/**
 * AGRUMEA FARM - INTERACTIVE 3D CITRUS SHOWCASE
 * Three.js WebGL visualizer with organic peel texture, golden hour rim lighting,
 * and high-performance HTML5 Canvas fallback.
 */

export class CitrusVisualizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.isSliced = false;
    this.rotationSpeed = 0.004;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetRotationY = 0;
    this.targetRotationX = 0.2;
    this.currentRotationY = 0;
    this.currentRotationX = 0.2;
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };

    this.init();
  }

  init() {
    // Check if Three.js is available on window
    if (window.THREE) {
      this.initThreeJS();
    } else {
      this.initProceduralCanvas();
    }
  }

  initThreeJS() {
    const width = this.container.clientWidth || 450;
    const height = this.container.clientHeight || 450;

    // Scene
    this.scene = new window.THREE.Scene();

    // Camera
    this.camera = new window.THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    this.camera.position.z = 5.2;

    // Renderer with antialias and alpha
    this.renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = window.THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.container.innerHTML = "";
    this.container.appendChild(this.renderer.domElement);

    // Group for all citrus parts
    this.citrusGroup = new window.THREE.Group();
    this.scene.add(this.citrusGroup);

    // Procedural peel bump texture
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 256;
    bumpCanvas.height = 256;
    const bCtx = bumpCanvas.getContext('2d');
    bCtx.fillStyle = '#808080';
    bCtx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 2400; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const r = Math.random() * 1.8 + 0.6;
      bCtx.fillStyle = Math.random() > 0.4 ? '#555555' : '#aaaaaa';
      bCtx.beginPath();
      bCtx.arc(x, y, r, 0, Math.PI * 2);
      bCtx.fill();
    }
    const bumpTexture = new window.THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = window.THREE.RepeatWrapping;
    bumpTexture.wrapT = window.THREE.RepeatWrapping;
    bumpTexture.repeat.set(4, 4);

    // 1. Outer Orange Sphere
    const geom = new window.THREE.SphereGeometry(1.4, 64, 64);
    const orangeMat = new window.THREE.MeshPhysicalMaterial({
      color: 0xE84E1B,
      emissive: 0x441005,
      roughness: 0.38,
      metalness: 0.05,
      clearcoat: 0.35,
      clearcoatRoughness: 0.25,
      bumpMap: bumpTexture,
      bumpScale: 0.04,
      reflectivity: 0.5
    });
    this.orangeMesh = new window.THREE.Mesh(geom, orangeMat);
    this.citrusGroup.add(this.orangeMesh);

    // 2. Leaf Geometry
    const leafGeom = new window.THREE.CylinderGeometry(0.04, 0.02, 0.45, 8);
    const stemMat = new window.THREE.MeshStandardMaterial({ color: 0x3d2712, roughness: 0.8 });
    const stem = new window.THREE.Mesh(leafGeom, stemMat);
    stem.position.set(0, 1.45, 0);
    this.citrusGroup.add(stem);

    // Leaf mesh
    const leafShape = new window.THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.quadraticCurveTo(0.4, 0.5, 0.5, 1.0);
    leafShape.quadraticCurveTo(0.2, 1.3, 0, 1.6);
    leafShape.quadraticCurveTo(-0.2, 1.3, -0.5, 1.0);
    leafShape.quadraticCurveTo(-0.4, 0.5, 0, 0);

    const extrudeSettings = { depth: 0.02, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
    const leaf3DGeom = new window.THREE.ExtrudeGeometry(leafShape, extrudeSettings);
    const leafMat = new window.THREE.MeshStandardMaterial({
      color: 0x2D4A3E,
      roughness: 0.3,
      side: window.THREE.DoubleSide
    });
    const leaf = new window.THREE.Mesh(leaf3DGeom, leafMat);
    leaf.scale.set(0.6, 0.6, 0.6);
    leaf.position.set(0.1, 1.5, 0);
    leaf.rotation.z = -Math.PI / 4;
    leaf.rotation.x = 0.3;
    this.citrusGroup.add(leaf);

    // 3. Floating pollen particles
    const particleCount = 45;
    const particleGeom = new window.THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeom.setAttribute('position', new window.THREE.BufferAttribute(positions, 3));
    const particleMat = new window.THREE.PointsMaterial({
      color: 0xF5EEDF,
      size: 0.04,
      transparent: true,
      opacity: 0.6
    });
    this.particles = new window.THREE.Points(particleGeom, particleMat);
    this.scene.add(this.particles);

    // Lights
    const ambientLight = new window.THREE.AmbientLight(0xfff7ee, 0.9);
    this.scene.add(ambientLight);

    const sunLight = new window.THREE.DirectionalLight(0xffecd2, 2.2);
    sunLight.position.set(4, 5, 4);
    this.scene.add(sunLight);

    const rimLight = new window.THREE.DirectionalLight(0xE84E1B, 2.8);
    rimLight.position.set(-4, -2, -3);
    this.scene.add(rimLight);

    // Interactions
    this.setupListeners();
    this.animateThreeJS();
  }

  animateThreeJS() {
    requestAnimationFrame(() => this.animateThreeJS());

    if (!this.isDragging) {
      this.targetRotationY += this.rotationSpeed;
    }

    // Smooth damping
    this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.06;
    this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.06;

    this.citrusGroup.rotation.y = this.currentRotationY;
    this.citrusGroup.rotation.x = this.currentRotationX;

    if (this.particles) {
      this.particles.rotation.y += 0.001;
    }

    this.renderer.render(this.scene, this.camera);
  }

  setupListeners() {
    const el = this.renderer ? this.renderer.domElement : this.canvas;

    el.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.targetRotationY += deltaX * 0.01;
      this.targetRotationX += deltaY * 0.01;

      // Clamp X
      this.targetRotationX = Math.max(-0.6, Math.min(0.8, this.targetRotationX));

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch support
    el.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      this.targetRotationY += deltaX * 0.01;
      this.targetRotationX += deltaY * 0.01;
      this.targetRotationX = Math.max(-0.6, Math.min(0.8, this.targetRotationX));

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    // Double-click to toggle slice
    el.addEventListener('dblclick', () => {
      this.toggleSlice();
    });

    // Resize
    window.addEventListener('resize', () => {
      if (!this.renderer) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  toggleSlice() {
    this.isSliced = !this.isSliced;
    if (this.orangeMesh) {
      if (this.isSliced) {
        // Change material to deep blood orange crimson
        this.orangeMesh.material.color.setHex(0x762530);
        this.orangeMesh.material.emissive.setHex(0x280c10);
      } else {
        this.orangeMesh.material.color.setHex(0xE84E1B);
        this.orangeMesh.material.emissive.setHex(0x441005);
      }
    }
  }

  /* Robust high-end 2D/3D procedural fallback if Three.js CDN isn't loaded */
  initProceduralCanvas() {
    const width = this.container.clientWidth || 450;
    const height = this.container.clientHeight || 450;

    this.canvas = document.createElement('canvas');
    this.canvas.width = width * 2;
    this.canvas.height = height * 2;
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this.canvas.style.cursor = "grab";

    this.ctx = this.canvas.getContext('2d');
    this.container.innerHTML = "";
    this.container.appendChild(this.canvas);

    this.angle = 0;
    this.setupListeners();
    this.animateCanvas();
  }

  animateCanvas() {
    requestAnimationFrame(() => this.animateCanvas());

    const w = this.canvas.width;
    const h = this.canvas.height;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, w, h);

    if (!this.isDragging) {
      this.targetRotationY += this.rotationSpeed;
    }
    this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.06;
    this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.06;

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.28;

    ctx.save();
    ctx.translate(cx, cy);

    // Subtle drop shadow
    ctx.beginPath();
    ctx.ellipse(0, radius * 1.15, radius * 0.85, radius * 0.2, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(70, 21, 27, 0.12)";
    ctx.filter = "blur(18px)";
    ctx.fill();
    ctx.filter = "none";

    // 3D Sphere illusion with radial gradient
    const lightOffsetX = -Math.cos(this.currentRotationY) * (radius * 0.35);
    const lightOffsetY = -radius * 0.35 + (this.currentRotationX * 50);

    const grad = ctx.createRadialGradient(
      lightOffsetX, lightOffsetY, radius * 0.1,
      0, 0, radius
    );

    if (this.isSliced) {
      grad.addColorStop(0, '#A83244');
      grad.addColorStop(0.5, '#762530');
      grad.addColorStop(0.9, '#481c21');
      grad.addColorStop(1, '#280c10');
    } else {
      grad.addColorStop(0, '#FFA866');
      grad.addColorStop(0.2, '#F05D23');
      grad.addColorStop(0.65, '#E84E1B');
      grad.addColorStop(0.92, '#8F290E');
      grad.addColorStop(1, '#541C22');
    }

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Natural pores / oil glands
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    for (let i = 0; i < 40; i++) {
      const pAngle = (i * 0.4) + this.currentRotationY;
      const pDist = ((i * 19) % (radius * 0.85));
      const px = Math.cos(pAngle) * pDist;
      const py = Math.sin(pAngle) * pDist;
      ctx.beginPath();
      ctx.arc(px, py, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Stem and Leaf
    ctx.save();
    ctx.rotate(Math.sin(this.currentRotationY * 0.5) * 0.08);

    // Stem
    ctx.beginPath();
    ctx.moveTo(-3, -radius + 4);
    ctx.quadraticCurveTo(0, -radius - 22, 12, -radius - 28);
    ctx.lineWidth = 7;
    ctx.strokeStyle = "#382314";
    ctx.lineCap = "round";
    ctx.stroke();

    // Fresh Green Leaf
    ctx.beginPath();
    ctx.moveTo(8, -radius - 20);
    ctx.quadraticCurveTo(55, -radius - 65, 80, -radius - 25);
    ctx.quadraticCurveTo(50, -radius - 5, 8, -radius - 20);
    ctx.fillStyle = "#2D4A3E";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#3D614E";
    ctx.stroke();

    ctx.restore();

    ctx.restore();
  }
}
