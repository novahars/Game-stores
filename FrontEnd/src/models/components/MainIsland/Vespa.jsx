/* eslint-disable react/no-unknown-property */
export default function Vespa({ nodes, materials }) {
  return (
    <mesh
      name="mainframe"
      castShadow
      receiveShadow
      geometry={nodes.mainframe.geometry}
      material={materials['Material.015']}
      position={[-72.438, -0.011, 60.108]}
      rotation={[0.005, -0.874, 0.007]}
      scale={0.082}
    />
  )
}
