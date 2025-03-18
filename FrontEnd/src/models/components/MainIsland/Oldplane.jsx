/* eslint-disable react/no-unknown-property */
export default function Oldplane({ nodes, materials }) {
    return (
      <group
        position={[109.366, 74.854, -65.389]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <mesh
          geometry={nodes.polySurface136_1.geometry}
          material={materials['badan kastil']}
        />
        <mesh
          geometry={nodes.polySurface136_2.geometry}
          material={materials['planet 3']}
        />
        <mesh
          geometry={nodes.polySurface136_3.geometry}
          material={materials['badan launchpad']}
        />
        <mesh
          geometry={nodes.polySurface136_4.geometry}
          material={materials.asep}
        />
      </group>
    )
  }