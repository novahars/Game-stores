/* eslint-disable react/no-unknown-property */
export default function Mount({ nodes, materials }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.batu_1.geometry}
          material={materials['gunung 2']}
        />
        <mesh
          geometry={nodes.batu_2.geometry}
          material={materials['gunung gradasi']}
        />
      </group>
  )
}
