/* eslint-disable react/no-unknown-property */
export default function Tent({ nodes, materials }) {
  return (
    <>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_8_1.geometry}
          material={materials['planet 1']}
        />
        <mesh
          geometry={nodes.Object_8_2.geometry}
          material={nodes.Object_8_2.material}
        />
        <mesh
          geometry={nodes.Object_8_3.geometry}
          material={materials['head roket']}
        />
        <mesh
          geometry={nodes.Object_8_4.geometry}
          material={materials['planet 3']}
        />
        <mesh
          geometry={nodes.Object_8_5.geometry}
          material={materials.asep}
        />
      </group>

      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_996_1.geometry}
          material={materials['head roket']}
        />
        <mesh
          geometry={nodes.Object_996_2.geometry}
          material={materials['batang pohon']}
        />
      </group>

      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_6_1.geometry}
          material={materials['planet 1']}
        />
        <mesh
          geometry={nodes.Object_6_2.geometry}
          material={nodes.Object_6_2.material}
        />
        <mesh
          geometry={nodes.Object_6_3.geometry}
          material={materials['head roket']}
        />
        <mesh
          geometry={nodes.Object_6_4.geometry}
          material={materials['gunung 2']}
        />
        <mesh
          geometry={nodes.Object_6_5.geometry}
          material={materials['planet 3']}
        />
        <mesh
          geometry={nodes.Object_6_6.geometry}
          material={materials['cincin planet']}
        />
      </group>

      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_1414_1.geometry}
          material={nodes.Object_1414_1.material}
        />
        <mesh
          geometry={nodes.Object_1414_2.geometry}
          material={materials['badan kastil']}
        />
        <mesh
          geometry={nodes.Object_1414_3.geometry}
          material={materials['planet 1']}
        />
      </group>
    </>
  )
}
