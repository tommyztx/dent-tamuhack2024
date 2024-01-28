var scene = new THREE.Scene();

var loader = new THREE.GLTFLoader();
loader.load(
    "models/brain.gltf",
    function (gltf) {
        gltf.scene.traverse(function (node) {
            if (node.isMesh) {
                node.material.color = new THREE.Color(0xd3b0b0);
            }
        });
        var bbox = new THREE.Box3().setFromObject(gltf.scene);
        var center = bbox.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center); // center the model
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

// var controls = new THREE.OrbitControls(camera, renderer.domElement);
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Set clear color to black with 0 opacity
document.body.appendChild(renderer.domElement);

// Add a directional light to the scene
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
