/* eslint-disable react/no-unknown-property */
export default function Bridge({ nodes, materials }) {
    return (
      <mesh
        geometry={nodes.Cylinder_016.geometry}
        material={materials['head roket']}
        rotation={[Math.PI / 2, 0, 0]}
      />
    )
  }