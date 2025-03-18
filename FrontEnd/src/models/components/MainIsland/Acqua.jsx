/* eslint-disable react/no-unknown-property */
export default function Acqua({ nodes, materials }) {
    return (
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.acqua_1.geometry}
          material={materials['badan roket']}
        />
        <mesh
          geometry={nodes.acqua_2.geometry}
          material={nodes.acqua_2.material}
        />
      </group>
    )
  }
  