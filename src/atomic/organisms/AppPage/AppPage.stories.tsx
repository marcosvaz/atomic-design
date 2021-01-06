import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { AppPage, IAppPageProps } from '.'

export default {
  title: 'organisms/AppPage',
  component: AppPage,
} as Meta

const Template: Story<IAppPageProps> = args => <AppPage {...args} />

export const Default = Template.bind({})
Default.args = {

}

