/* eslint-disable react/no-unknown-property */
export default function MountIsland({ nodes, materials }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh
        geometry={nodes.Island3_1.geometry}
        material={materials.tanah}
      />
      <mesh
        geometry={nodes.Island3_2.geometry}
        material={materials.rumput}
      />
    </group>
  )
}
