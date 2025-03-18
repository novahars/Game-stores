/* eslint-disable react/no-unknown-property */
export default function MountTree({ nodes, materials }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh
        geometry={nodes.CAMP033_1.geometry}
        material={materials.pohon}
      />
      <mesh
        geometry={nodes.CAMP033_2.geometry}
        material={materials['batang pohon']}
      />
      <mesh
        geometry={nodes.CAMP033_3.geometry}
        material={nodes.CAMP033_3.material}
      />
    </group>
  )
}
