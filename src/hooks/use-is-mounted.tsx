'use client'

import { useEffect, useState } from 'react'

export default function useIsMounted() {
  const [isMounted, setMounted] = useState<boolean>(false)

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return isMounted
}
