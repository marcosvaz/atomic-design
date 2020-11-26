---
name: 'atomic-organism'
description: 'Organism Atomic Design component template'
message: 'Please enter the name of component to be created'
root: './src/atomic/organisms'
output: '**/*'
ignore: []
---

# `{{ input | pascal }}/index.tsx`

```jsx
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 10px;
`

export interface I{{ input | pascal }}Props {}

export const {{ input | pascal }} : React.FC<I{{ input | pascal }}Props> = ():JSX.Element => {


  return (
    <Container>

    </Container>
    )
}

```

# `{{ input | pascal }}/{{ input | pascal }}.stories.tsx`

```jsx
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { {{ input | pascal }}, I{{ input | pascal }}Props } from '.'

export default {
  title: 'organisms/{{ input | pascal }}',
  component: {{ input | pascal }},
} as Meta

const Template: Story<I{{ input | pascal }}Props> = args => <{{ input | pascal }} {...args} />

export const Default = Template.bind({})
Default.args = {
  
}


```