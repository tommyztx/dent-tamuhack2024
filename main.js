var model;
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
        gltf.scene.position.x = -4.5; // Shift the model 2 units to the left
        model = gltf.scene;
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

var p = document.querySelector("p");
var modelContainer = document.createElement("div");
modelContainer.id = "model-container";
p.parentNode.insertBefore(modelContainer, p);

// var controls = new THREE.OrbitControls(camera, renderer.domElement);
var renderer = new THREE.WebGLRenderer({ alpha: true });
var width = window.innerWidth * 0.8; // 80% of the window width
var height = window.innerHeight * 0.8; // 80% of the window height
renderer.setSize(width, height);
renderer.setClearColor(0x000000, 0); // Set clear color to black with 0 opacity
// document.body.appendChild(renderer.domElement);
document.getElementById("model-container").appendChild(renderer.domElement);

// Add a directional light to the scene
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

var clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        var elapsedTime = clock.getElapsedTime();
        var movement = Math.abs(Math.sin(elapsedTime / 2)) * 0.5; // oscillates between 0 and 0.5
        model.position.y = movement;
    }

    renderer.render(scene, camera);
}

animate();
