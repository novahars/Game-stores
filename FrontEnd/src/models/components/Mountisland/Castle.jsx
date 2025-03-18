/* eslint-disable react/no-unknown-property */
export default function Castle({ nodes, materials }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh
        geometry={nodes.Object216_1.geometry}
        material={materials['badan kastil']}
      />
      <mesh
        geometry={nodes.Object216_2.geometry}
        material={materials['planet 3']}
      />
      <mesh
        geometry={nodes.Object216_3.geometry}
        material={materials['ring kastil']}
      />
      <mesh
        geometry={nodes.Object216_4.geometry}
        material={materials.rumput}
      />
    </group>
  )
}
