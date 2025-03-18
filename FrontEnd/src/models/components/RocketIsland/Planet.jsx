/* eslint-disable react/no-unknown-property */
export default function Planet({ nodes, materials }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh
        geometry={nodes.Osnova_4_2.geometry}
        material={materials['planet 1']}
      />
      <mesh
        geometry={nodes.Osnova_4_3.geometry}
        material={materials['planet 2']}
      />
      <mesh
        geometry={nodes.Osnova_4_4.geometry}
        material={materials['planet 3']}
      />
      <mesh
        geometry={nodes.Osnova_4_5.geometry}
        material={materials['cincin planet']}
      />
    </group>
  )
}
