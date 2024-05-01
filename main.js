import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

//create renderer
let renderer = new THREE.WebGLRenderer({ antialize: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//append render to body
document.body.appendChild(renderer.domElement);

//create scene
var scene = new THREE.Scene();

//create camera
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(4, 5, 11);
// camera.lookAt(0,0,0)

//create controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.ninDistance = 5;
controls.maxDistance = 20;
controls.maxPolarAngle = 0.5;
controls.maxPolarAngle = 2;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

//create model loader
const loader = new GLTFLoader();

//create cube geometry
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);

// create cube texture
const cubeTexture = new THREE.TextureLoader().load("ralph.jpeg");

//create cube material, image texture or color
var cubeMaterial = new THREE.MeshStandardMaterial({
  map: cubeTexture,
});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 0, 3);
cube.castShadow = true;

scene.add(cube);

//create plane geometry
const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);

//create plane material
const planeMaterial = new THREE.MeshStandardMaterial({
  color: "yellow",
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, -1.6, -0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

//create lights
const spotLight = new THREE.SpotLight("0xffffff", 8, 100, 2.2, 0.5);
spotLight.position.set(0, 2, 5);
spotLight.castShadow = true;
scene.add(spotLight);
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);
const ambientLight = new THREE.AmbientLight("white", 0.4);
scene.add(ambientLight);

//game logic//
var update = function () {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.005;
  controls.update();
};
//draw screen
let render = function () {
  renderer.render(scene, camera);
};

// run game loop
var gameLoop = function () {
  requestAnimationFrame(gameLoop);

  update();
  render();
};
gameLoop();

// rescale on window resize
window.addEventListener("resize", function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
