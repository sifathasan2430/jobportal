"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function SonnerDemo({title="",descriptionMessage=''}) {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast(title, {
          description: descriptionMessage,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}
