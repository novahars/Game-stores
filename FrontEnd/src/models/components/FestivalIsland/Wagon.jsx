/* eslint-disable react/no-unknown-property */
export default function Wagon({ nodes, materials }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh
        geometry={nodes.Object_1446_1.geometry}
        material={nodes.Object_1446_1.material}
      />
      <mesh
        geometry={nodes.Object_1446_2.geometry}
        material={materials['gerobak 2']}
      />
      <mesh
        geometry={nodes.Object_1446_3.geometry}
        material={materials['badan launchpad']}
      />
      <mesh
        geometry={nodes.Object_1446_4.geometry}
        material={materials.box}
      />
      <mesh
        geometry={nodes.Object_1446_5.geometry}
        material={materials['badan roket']}
      />
      <mesh
        geometry={nodes.Object_1446_6.geometry}
        material={materials['batang pohon']}
      />
      <mesh
        geometry={nodes.Object_1446_7.geometry}
        material={materials['atap gerobak']}
      />
      <mesh
        geometry={nodes.Object_1446_8.geometry}
        material={materials['atap kincir angin']}
      />
      <mesh
        geometry={nodes.Object_1446_9.geometry}
        material={materials['daun 2']}
      />
      <mesh
        geometry={nodes.Object_1446_10.geometry}
        material={materials['gunung gradasi']}
      />
      <mesh
        geometry={nodes.Object_1446_11.geometry}
        material={materials['planet 1']}
      />
      <mesh
        geometry={nodes.Object_1446_12.geometry}
        material={materials.asep}
      />
    </group>
  )
}
