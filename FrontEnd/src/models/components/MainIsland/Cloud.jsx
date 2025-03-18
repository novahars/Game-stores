/* eslint-disable react/no-unknown-property */
export default function Cloud({ nodes }) {
  return (
    <mesh
      name="awan"
      castShadow
      receiveShadow
      geometry={nodes.awan.geometry}
      material={nodes.awan.material}
      rotation={[Math.PI / 2, 0, 0]}
    />
  )
}

