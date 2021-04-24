import { useRef } from 'react'

export const useInstance = ( ContainerClass ) => {
  const container = useRef()
  return container.current || (container.current = new ContainerClass())
}