---
name: 'page'
description: 'Page Atomic Design component template'
message: 'Please enter the name of component to be created'
root: './src/pages'
output: '**/*'
ignore: []
---

# `{{ input | pascal }}/index.tsx`

```jsx
import React from 'react'

export interface I{{ input | pascal }}Props {}

export const {{ input | pascal }}: React.FC<I{{ input | pascal }}Props> = (): JSX.Element => {
  return (
    <div />
  )
}

```