import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Helicopter({ nodes, materials }) {
    const propellerRef = useRef();

    // Add rotation animation
    useFrame(() => {
        if (propellerRef.current) {
            propellerRef.current.rotation.z += 0.10; // Adjust speed by changing this value
        }
    });

    return (
        <group>
            <group name="BezierCircle" position={[-1.189, 31.847, 95.311]} />
            <group
                name="Empty001"
                position={[-36.919, 81.139, 46.621]}
                rotation={[-Math.PI, 1.004, -Math.PI]}
                scale={9.025}>
                <group
                    name="Copter001"
                    position={[0.427, 0.323, -0.048]}
                    rotation={[-1.571, -1.536, -3.142]}
                    scale={0.001}>
                    <mesh
                        name="Mesh024"
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh024.geometry}
                        material={materials['Palette.004']}
                    />
                    <mesh
                        name="Mesh024_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh024_1.geometry}
                        material={materials['Material.012']}
                    />
                    <mesh
                        name="Mesh024_2"
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh024_2.geometry}
                        material={materials['Material.010']}
                    />
                    <mesh
                        name="Mesh024_3"
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh024_3.geometry}
                        material={materials['Material.014']}
                    />
                    <mesh
                        name="Mesh024_4"
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh024_4.geometry}
                        material={materials['Material.009']}
                    />
                    <mesh
                        name="Mesh024_5"
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh024_5.geometry}
                        material={materials['Material.008']}
                    />
                    <mesh
                        name="Mesh024_6"
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh024_6.geometry}
                        material={materials['Material.011']}
                    />
                    <mesh
                        name="Mesh024_7"
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh024_7.geometry}
                        material={materials['Material.013']}
                    />
                </group>
                <mesh
                    name="Copter002"
                    castShadow
                    receiveShadow
                    geometry={nodes.Copter002.geometry}
                    material={materials['Palette.004']}
                    position={[0.427, 0.323, -0.048]}
                    rotation={[-1.571, -1.536, -3.142]}
                    scale={0.001}
                />
                <group
                    ref={propellerRef}
                    name="Propeller_2001"
                    position={[0.225, 0.41, 0.014]}
                    rotation={[1.555, 0.031, -0.834]}
                    scale={0.001}>
                    <mesh
                        name="Mesh020"
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh020.geometry}
                        material={materials['Palette.004']}
                    />
                    <mesh
                        name="Mesh020_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh020_1.geometry}
                        material={materials['Material.007']}
                    />
                </group>
            </group>
        </group>
    )
}