/* eslint-disable react/no-unknown-property */
export default function Tree({ nodes, materials }) {
  return (
    <>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Island1_004_1.geometry}
          material={materials['batang pohon']}
        />
        <mesh
          geometry={nodes.Island1_004_2.geometry}
          material={materials['daun 2']}
        />
      </group>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Cube_006_1.geometry}
          material={materials.box}
        />
        <mesh
          geometry={nodes.Cube_006_2.geometry}
          material={materials['batang pohon']}
        />
        <mesh
          geometry={nodes.Cube_006_3.geometry}
          material={materials['daun 2']}
        />
      </group>
    </>
  )
}
