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


  const geometry = new THREE.BoxGeometry();
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 조명에 영향을 받지 않는 재을
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    // transparent: true,
    // opacity: 0.5,
    // visible: true,
    // wireframe: true,
    // side: THREE.DoubleSide,
    // side: THREE.BackSide,
  }); // 조명에 영향을 받는 재질
  const cube = new THREE.Mesh(geometry, material);
  // 씬에 추가
  scene.add(cube);
  // 씬에 추가하면 기본적으로 (0, 0, 0)에 위치하게 된다
  // 카메라 위치 조정
  camera.position.set(3, 4, 5);

  // arg 가 보이는 거리로 이동
  camera.lookAt(cube.position);


  // 라이트 추가
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(-1, 2, 3);
  scene.add(directionalLight);
  // 은은한 빛을 준다
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  renderer.render(scene, camera);

}