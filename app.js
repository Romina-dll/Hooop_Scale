/*const video = document.getElementById("video");
const canvas = document.getElementById("pose-canvas");
const ctx = canvas.getContext("2d");

navigator.mediaDevices.getUserMedia({video:true})
.then(stream=>{
video.srcObject = stream;
});

const scene = new THREE.Scene();

const camera3D = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);

document.getElementById("three-container").appendChild(renderer.domElement);

let player;

const loader = new THREE.GLTFLoader();

loader.load("models/model.glb",function(gltf){

player = gltf.scene;

//player.scale.set(1,1,1);
player.scale.set(3,3,3);
scene.add(player);

});

camera3D.position.z = 5;

function animate(){

requestAnimationFrame(animate);

renderer.render(scene,camera3D);

}

animate();

const pose = new Pose({
locateFile:(file)=>{
return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
}
});

pose.setOptions({
modelComplexity:1,
smoothLandmarks:true,
minDetectionConfidence:0.5,
minTrackingConfidence:0.5
});

pose.onResults(results=>{

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

ctx.drawImage(video,0,0,canvas.width,canvas.height);

if(results.poseLandmarks && player){

const head = results.poseLandmarks[0];

const x = (head.x-0.2)*10;
const y = -(head.y-0.5)*5;

//player.position.x = x+1.5;
//player.position.y = y;

player.scale.set(2,2,2);

//player.scale.set(2,2,2);

player.position.x = (head.x - 0.5) * 4 + 2;
player.position.y = -(head.y - 0.5) * 2 - 1.2;
player.position.z = -2;

}

});

const cam = new Camera(video,{
onFrame:async()=>{
await pose.send({image:video});
},
width:640,
height:480
});

cam.start();

document.getElementById("capture").onclick=()=>{

const link=document.createElement("a");

link.download="hoopscale.png";

//link.href=renderer.domElement.toDataURL();
document.getElementById("capture").onclick = () => {

const finalCanvas = document.createElement("canvas");
finalCanvas.width = canvas.width;
finalCanvas.height = canvas.height;

const finalCtx = finalCanvas.getContext("2d");*/

/* draw camera frame */
//captureCtx.drawImage(canvas,0,0);
//finalCtx.drawImage(video,0,0,canvas.width,canvas.height);


/* draw 3D player layer */
//captureCtx.drawImage(renderer.domElement,0,0);
//finalCtx.drawImage(renderer.domElement,0,0,canvas.width,canvas.height);

/*const link = document.createElement("a");
link.download = "hoopscale.png";
link.href = finalCanvas.toDataURL();

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(0,5,5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff,0.6);
scene.add(ambient);

link.click();

};

link.click();

};*/

const video = document.getElementById("video");
const canvas = document.getElementById("pose-canvas");
const ctx = canvas.getContext("2d");

/* CAMERA */

navigator.mediaDevices.getUserMedia({video:true})
.then(stream=>{
video.srcObject = stream;
});

/* THREE.JS */

const scene = new THREE.Scene();

const camera3D = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

//const renderer = new THREE.WebGLRenderer({alpha:true});

const renderer = new THREE.WebGLRenderer({
alpha:true,
preserveDrawingBuffer:true
});

renderer.setSize(window.innerWidth,window.innerHeight);
//
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
//
document
.getElementById("three-container")
.appendChild(renderer.domElement);

/* LIGHTING (THIS FIXES BLACK MODEL) */

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(0,5,5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff,0.7);
scene.add(ambient);

/* LOAD PLAYER */

let player;

const loader = new THREE.GLTFLoader();

loader.load("models/model.glb",function(gltf){

player = gltf.scene;

player.scale.set(2.5,2.5,2.5);

scene.add(player);

});

camera3D.position.z = 5;

/* RENDER LOOP */

function animate(){

requestAnimationFrame(animate);

renderer.render(scene,camera3D);

}

animate();

/* MEDIAPIPE */

const pose = new Pose({
locateFile:(file)=>{
return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
}
});

pose.setOptions({
modelComplexity:1,
smoothLandmarks:true,
minDetectionConfidence:0.5,
minTrackingConfidence:0.5
});

pose.onResults(results=>{

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

ctx.drawImage(video,0,0,canvas.width,canvas.height);

if(results.poseLandmarks && player){

const head = results.poseLandmarks[0];

/* PLACE PLAYER BESIDE USER */

player.position.x = (head.x - 4.5)*4 + 20;
player.position.y = -(head.y - 4.5)*2 - 10;
player.position.z = -2;

}

});

/* START CAMERA */

const cam = new Camera(video,{
onFrame:async()=>{
await pose.send({image:video});
},
width:640,
height:480
});

cam.start();
/*document.getElementById("capture").onclick = () => {

const ambient = new THREE.AmbientLight(0xffffff,1);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(3,5,2);
scene.add(light);
};*/

/* PHOTO CAPTURE */

window.addEventListener("load", () => {

const button = document.getElementById("capture");

button.addEventListener("click", () => {

const canvas = document.querySelector("canvas");

if(!canvas){
alert("Canvas not ready");
return;
}

const image = canvas.toDataURL("image/png");

const link = document.createElement("a");
link.download = "hoopscale.png";
link.href = image;

link.click();

});

});
/* CAPTURE IMAGE */
/*
document.getElementById("capture").onclick = () => {

const captureCanvas = document.createElement("canvas");

captureCanvas.width = canvas.width;
captureCanvas.height = canvas.height;

const captureCtx = captureCanvas.getContext("2d");*/

/* camera frame */

////captureCtx.drawImage(canvas,0,0);

/* player layer */

/*captureCtx.drawImage(renderer.domElement,0,0);

const link = document.createElement("a");

link.download = "hoopscale.png";
link.href = captureCanvas.toDataURL();

link.click();

};*/

