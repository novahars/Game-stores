/* eslint-disable react/no-unknown-property */
export default function StreetMiddle({ nodes, materials }) {
    return (
      <>
        <mesh
          geometry={nodes.jalanan_tengah.geometry}
          material={materials.jalanan}
          position={[0, -0.82, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.jalanan_kanan.geometry}
          material={materials.jalanan}
          rotation={[Math.PI / 2, 0, 0]}
        />
  
        <mesh
          geometry={nodes.jalnan_kiri.geometry}
          material={materials.jalanan}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </>
    )
  }
  