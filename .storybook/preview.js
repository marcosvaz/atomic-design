// import { withKnobs } from '@storybook/addon-knobs'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { addDecorator, addParameters } from '@storybook/react'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    // defaultViewport: 'iphonex',
  },
  // options: {
  //   addonPanelInRight: true,
  // },
  // darkMode: {
  //   // Set the initial theme
  //   current: 'dark',
  // },
})

// addDecorator(withKnobs({ escapeHTML: false }))