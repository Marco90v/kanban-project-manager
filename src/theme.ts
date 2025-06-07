// import {
//   // ChakraProvider,
//   createSystem,
//   defaultConfig,
//   defineConfig,
// } from "@chakra-ui/react"

// const config = defineConfig({
//   theme: {
//     tokens: {
//       colors: {},
//     },
//   },
// })

// export const system = createSystem(defaultConfig, config)


import { defaultConfig, defineTextStyles, createSystem, defineConfig } from "@chakra-ui/react"

const textStyles = defineTextStyles({
  body: {
    description: "The body text style - used in paragraphs",
    value: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif',
    },
  },
})

const config = defineConfig({
  theme: {
    textStyles,
  },
})

export default createSystem(defaultConfig, config)