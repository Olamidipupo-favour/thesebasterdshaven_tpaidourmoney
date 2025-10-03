"use client"

import useSWR from "swr"
import { boxesService } from "@/lib/api/services/boxes.service"
import type { MysteryBox, OpenBoxResponse } from "@/lib/api/types"
import { useState } from "react"

export function useBoxes() {
  const { data, error, isLoading, mutate } = useSWR("boxes", async () => {
    const response = await boxesService.getBoxes()
    return response.data || []
  })

  return {
    boxes: data as MysteryBox[] | undefined,
    isLoading,
    error,
    mutate,
  }
}

export function useBox(id: string) {
  const { data, error, isLoading } = useSWR(id ? `box-${id}` : null, async () => {
    const response = await boxesService.getBox(id)
    return response.data
  })

  return {
    box: data as MysteryBox | undefined,
    isLoading,
    error,
  }
}

export function useOpenBox() {
  const [isOpening, setIsOpening] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const openBox = async (boxId: string, request: any): Promise<OpenBoxResponse | null> => {
    setIsOpening(true)
    setError(null)

    try {
      const response = await boxesService.openBox(boxId, request)
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || "Failed to open box")
      }
    } catch (err: any) {
      setError(err.message || "Failed to open box")
      return null
    } finally {
      setIsOpening(false)
    }
  }

  return {
    openBox,
    isOpening,
    error,
  }
}
