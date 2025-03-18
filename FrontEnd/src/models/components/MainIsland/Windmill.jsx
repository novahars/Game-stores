/* eslint-disable react/no-unknown-property */
export default function Windmill({ nodes, materials }) {
  return (
    <mesh
      geometry={nodes.wind_turbin.geometry}
      material={materials.asep}
      rotation={[Math.PI / 2, 0, 0]}
    />
  )
}
