import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    // This is the project ID for the project you want to manage
    projectId: '',
    dataset: 'production'
  }
})
