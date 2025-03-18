/* eslint-disable react/no-unknown-property */
export default function Spawn({ nodes, materials }) {
  return (
    <group>

      <group
        name="BezierCircle001"
        position={[3.777, 81.139, 2.622]}
        rotation={[0, -0.746, 0]}
        scale={59.933}
      />
      <group
        name="spawn"
        position={[-74.152, 11.953, 174.676]}
        rotation={[-Math.PI, 0.767, -Math.PI]}
        scale={[0.024, 0.796, 0.024]}>
        <mesh
          name="Cylinder001"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={materials['Black.001']}
        />
        <mesh
          name="Cylinder001_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_1.geometry}
          material={materials['Blue.001']}
        />
        <mesh
          name="Cylinder001_2"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_2.geometry}
          material={materials['White.001']}
        />
        <mesh
          name="Cylinder001_3"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_3.geometry}
          material={materials['Pink.001']}
        />
        <mesh
          name="Cylinder001_4"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_4.geometry}
          material={materials['Material.003']}
        />
        <mesh
          name="Cylinder001_5"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_5.geometry}
          material={materials['Material.004']}
        />
        <mesh
          name="Cylinder001_6"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_6.geometry}
          material={materials['Material.005']}
        />
        <mesh
          name="Cylinder001_7"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_7.geometry}
          material={materials['Material.006']}
        />
      </group>
    </group>
  )
}
