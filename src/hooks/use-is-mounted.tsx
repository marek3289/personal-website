'use client'

import { useEffect, useState } from 'react'

const useIsMounted = () => {
  const [isMounted, setMounted] = useState<boolean>(false)

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return isMounted
}

export default useIsMounted
