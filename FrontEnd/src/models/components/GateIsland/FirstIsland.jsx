/* eslint-disable react/no-unknown-property */
export default function FirstIsland({ nodes, materials }) {
  return (
    <group
      name="Roundcube_003"
      position={[26.308, -0.418, -68.288]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={1.405}>
      <mesh
        name="Roundcube_003_1"
        castShadow
        receiveShadow
        geometry={nodes.Roundcube_003_1.geometry}
        material={materials.tanah}
      />
      <mesh
        name="Roundcube_003_2"
        castShadow
        receiveShadow
        geometry={nodes.Roundcube_003_2.geometry}
        material={materials['rumput 2']}
      />
      <mesh
        name="Roundcube_003_3"
        castShadow
        receiveShadow
        geometry={nodes.Roundcube_003_3.geometry}
        material={materials.rumput}
      />
    </group>
  )
}
