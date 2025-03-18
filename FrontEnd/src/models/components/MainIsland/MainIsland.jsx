/* eslint-disable react/no-unknown-property */
export default function MainIsland({ nodes, materials }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh
        geometry={nodes.GeoSphere001_1.geometry}
        material={materials.tanah}
      />
      <mesh
        geometry={nodes.GeoSphere001_2.geometry}
        material={materials.rumput}
      />
    </group>
  )
}
