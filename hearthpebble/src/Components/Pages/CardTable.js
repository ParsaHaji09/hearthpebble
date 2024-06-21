import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CARDS, OPPCARDS } from "./HomeAssets/Card";
import gsap from "gsap";


const ThreeScene = () => {

    const mountRef = useRef(null);
    const [model, setModel] = useState(null);
    const xRef = useRef(-2);

    const [prevData, setPrevData] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("saveData");
        if (data) {
            setPrevData(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        if (!mountRef.current) return;
        
        //console.log(prevData)    

        let hoveredCard;
        const mousePosition = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
        
        const opponentCards = [];
        for(let i = 5; i < CARDS.length; i++){
            opponentCards.push(CARDS[i]);
        }

        const mount = mountRef.current;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xFEFEFE);
        renderer.shadowMap.enabled = true;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        mount.appendChild(renderer.domElement);

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 10, 6);
        camera.lookAt(new THREE.Vector3(0, 6, 2));

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.y = 10;
        scene.add(directionalLight);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;

        const ambientLight = new THREE.AmbientLight(0xA3A3A3, 0.3);
        scene.add(ambientLight);

        // Load the GLTF model and set it to state
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
            '/kitchen_table.glb', // Adjusted path
            (glb) => {
                const loadedModel = glb.scene;
                loadedModel.rotateY(Math.PI / 2);
                loadedModel.scale.set(0.35, 0.35, 0.35);
                loadedModel.position.set(0.25, 0, 0);
                loadedModel.traverse((node) => {
                    if (node.isMesh) node.receiveShadow = true;
                });
                setModel(loadedModel);
            },
            undefined,
            (error) => {
                console.error('An error occurred while loading the model:', error);
                fetch('/kitchen_table.glb') // Attempt to fetch the file directly
                    .then(response => response.text())
                    .then(text => console.log(text)); // Log the response text
            }
        );

        // Grid Helper
        const gridHelper = new THREE.GridHelper(12, 12);
        scene.add(gridHelper);

        CARDS.forEach((card) => {
            scene.add(card);
            // Give each card a name for identification
            card.name = 'playerCard';
        });

        OPPCARDS.forEach((card) => {
            scene.add(card)
            card.name = 'opponentCard';
        })

        // Animation Loop
        const animate = () => {
            if (model) {
                scene.add(model);  // Add the model to the scene if it's loaded
            }
            renderer.render(scene, camera);
        };
        renderer.setAnimationLoop(animate);

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        window.addEventListener('click', function(e) {
            mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mousePosition, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);
            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                
                if (intersectedObject.name.includes('playerCard')) {
                    hoveredCard = intersectedObject;
                    const t1 = gsap.timeline({
                        defaults: {duration: 1},
                    });
                    t1.to(hoveredCard.rotation, {
                        y: Math.PI * 2,
                        z: 0
                    })
                        .to(hoveredCard.position, {
                            y: 3.18,
                            z: 0.9,
                            x: xRef.current
                        }, 0)
                        .to(hoveredCard.scale, {
                            x: 1.5,
                            y: 1.5,
                            z: 1.5,
                        }, 0);
                        if(xRef.current < 2)
                        xRef.current++;
                }
                
            }
        });

        // Cleanup
        return () => {
            if (mount) mount.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleResize);
        };
    }, [model]);  // Re-run the effect if the model changes

    return <div ref={mountRef} />;
};

export default ThreeScene;
