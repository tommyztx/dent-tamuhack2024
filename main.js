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
        // gltf.scene.position.x = -4.5; // Shift the model 2 units to the left
        model = gltf.scene;
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

var camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

var container = document.getElementById("containedModel");

var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);
// Add ambient light
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(ambientLight);

// Add directional light
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0); // set the position of the light
scene.add(directionalLight);
window.addEventListener("resize", function () {
    var width = container.clientWidth;
    var height = container.clientHeight;
    renderer.setSize(width, height);
    if (width < 768) {
        // If the screen width is less than 768px
        camera.fov = 70; // Set a larger FOV
    } else {
        camera.fov = 60; // Set a smaller FOV
    }
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
window.dispatchEvent(new Event("resize"));

// Add a directional light to the scene
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);
console.log("hello");

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
