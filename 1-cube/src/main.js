import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui'

window.addEventListener('load', function () {
  init();
});



function init() {
  const options = {
    color: 0x00ff00,
  }
  const renderer = new THREE.WebGLRenderer({
    // alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene(2, 2, 2);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 10;
  controls.enableDamping = true;
  // controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  // controls.enablePan = true;
  controls.maxDistance = 10;
  controls.minDistance = 2;

  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI / 2;

  controls.maxAzimuthAngle = Math.PI / 4;
  controls.minAzimuthAngle = -Math.PI / 4;


  
  // const axisHelper = new THREE.AxesHelper(5);
  // scene.add(axisHelper);

  // const geometry = new THREE.BoxGeometry();
  const cubegeometry = new THREE.IcosahedronGeometry(1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 조명에 영향을 받지 않는 재을
  const cubematerial = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    emissive: 0x111111,
    // transparent: true,
    // opacity: 0.5,
    // visible: true,
    // wireframe: true,
    // side: THREE.DoubleSide,
    // side: THREE.BackSide,
  }); // 조명에 영향을 받는 재질
  const cube = new THREE.Mesh(cubegeometry, cubematerial);
  // 씬에 추가
  scene.add(cube);


  const skeletongeometry = new THREE.IcosahedronGeometry(2);
  const skeletonmaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
    trabsparent: true,
    opacity: 0.2,
    color: 0xaaaaaa,
  });
  const skelcton = new THREE.Mesh(skeletongeometry, skeletonmaterial);
  scene.add(skelcton);

  // 씬에 추가하면 기본적으로 (0, 0, 0)에 위치하게 된다
  // 카메라 위치 조정
  // camera.position.set(3, 4, 5);
  camera.position.z = 5;

  // arg 가 보이는 거리로 이동
  // camera.lookAt(cube.position); 



  // 라이트 추가
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // directionalLight.position.set(-1, 2, 3);
  scene.add(directionalLight);
  // 은은한 빛을 준다
  // const ambientLight = new THREE.AmbientLight(0x404040);
  // scene.add(ambientLight);

  renderer.render(scene, camera);

  const clock = new THREE.Clock();
  
  render();

  function render () {
    const elapsedTime = clock.getElapsedTime();
    // cube.rotation.x = Date.now() * 0.0001;
    // cube.rotation.x = clock.getElapsedTime();
    // cube.rotation.x += clock.getDelta();
    // cube.rotation.y += 0.01;

    // cube.rotation.x = elapsedTime;
    // cube.rotation.y = elapsedTime;

    // skelcton.rotation.x = elapsedTime * 1.5;
    // skelcton.rotation.y = elapsedTime * 1.5;
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);

  }

  // 어떤 환경에서든 동일한 fps를 유지하기 위해


  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }


  window.addEventListener('resize', function () {
    controls.update();
    handleResize();
  });


  const gui = new GUI();
  // gui.add(cube.rotation, 'y', 0, Math.PI * 2, 0.1);
  gui
  .add(cube.position, 'y')
  .min(-3)
  .max(3)
  .step(0.1)
  .name('positionY');

  gui.add(cube, 'visible');
  gui.addColor(cube.material, 'color');
  gui.addColor(options, 'color').onChange((value) => {
    cube.material.color.set(value);
  });

} 