---
name: 'atomic-molecule'
description: 'Molecule Atomic Design component template'
message: 'Please enter the name of component to be created'
root: './src/atomic/molecules'
output: '**/*'
ignore: []
---

# `{{ input | pascal }}/index.tsx`

```tsx
import React from 'react'
import { Container } from './styles'

export interface I{{ input | pascal }}Props {}

export const {{ input | pascal }}: React.FC<I{{ input | pascal }}Props> = (): JSX.Element => {

  return (
    <Container />
  )
}

```

# `{{ input | pascal }}/{{ input | pascal }}.stories.tsx`

```tsx
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { {{ input | pascal }}, I{{ input | pascal }}Props } from '.'

export default {
  title: 'molecules/{{ input | pascal }}',
  component: {{ input | pascal }},
} as Meta

const Template: Story<I{{ input | pascal }}Props> = args => <{{ input | pascal }} {...args} />

export const Default = Template.bind({})
Default.args = {
  
}

```

# `{{ input | pascal }}/styles.ts`

```ts
import styled from 'styled-components'

export const Container = styled.div`
  padding: 10px;
`

```