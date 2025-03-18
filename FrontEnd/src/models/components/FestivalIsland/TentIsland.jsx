/* eslint-disable react/no-unknown-property */
export default function TentIsland({ nodes, materials }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh
        geometry={nodes.Roundcube_001_1.geometry}
        material={materials.tanah}
      />
      <mesh
        geometry={nodes.Roundcube_001_2.geometry}
        material={materials.rumput}
      />
      <mesh
        geometry={nodes.Roundcube_001_3.geometry}
        material={materials["rumput 2"]}
      />
    </group>
  )
}
