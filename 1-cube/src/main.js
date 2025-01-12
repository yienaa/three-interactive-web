import * as THREE from 'three';

window.addEventListener('load', function () {
  init();
});



function init() {
  const renderer = new THREE.WebGLRenderer({
    // alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene(2, 2, 2);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);


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
    requestAnimationFrame(render);
    // cube.rotation.x = Date.now() * 0.0001;
    // cube.rotation.x = clock.getElapsedTime();
    // cube.rotation.x += clock.getDelta();
    // cube.rotation.y += 0.01;

    cube.rotation.x = elapsedTime;
    cube.rotation.y = elapsedTime;

    skelcton.rotation.x = elapsedTime * 1.5;
    skelcton.rotation.y = elapsedTime * 1.5;
    renderer.render(scene, camera);
  }

  // 어떤 환경에서든 동일한 fps를 유지하기 위해


  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }


  window.addEventListener('resize', function () {
    handleResize();
  });
} 