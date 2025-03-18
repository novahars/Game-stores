/* eslint-disable react/no-unknown-property */
export default function Rocket({ nodes, materials }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh
        geometry={nodes.Crater_2.geometry}
        material={materials['badan roket']}
      />
      <mesh
        geometry={nodes.Crater_3.geometry}
        material={materials['head roket']}
      />
      <mesh
        geometry={nodes.Crater_4.geometry}
        material={materials['planet 3']}
      />
      <mesh
        geometry={nodes.Crater_5.geometry}
        material={materials.asep}
      />

    </group>
  )
}
