/* eslint-disable react/no-unknown-property */
export default function Stone1({ nodes, materials }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh
        geometry={nodes.Cube_008_1.geometry}
        material={materials['daun 2']}
      />
      <mesh
        geometry={nodes.Cube_008_2.geometry}
        material={materials.batu}
      />
    </group>
  )
}
