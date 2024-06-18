// Card.jsx
import React from 'react';
import { useFrame } from '@react-three/fiber';
import { BoxBufferGeometry, MeshStandardMaterial, Mesh } from 'three';

const Card = ({ position, rotation, texture }) => {
    const ref = React.useRef();

    // Update card position/rotation based on props or state
    useFrame(() => {
        ref.current.position.set(position[0], position[1], position[2]);
        ref.current.rotation.set(rotation[0], rotation[1], rotation[2]);
    });

    return (
        <mesh ref={ref}>
            <boxBufferGeometry attach="geometry" args={[1, 1.5, 0.1]} />
            <meshStandardMaterial attach="material" map={texture} />
        </mesh>
    );
};

export default Card;
