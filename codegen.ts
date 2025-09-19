import type { CodegenConfig } from '@graphql-codegen/cli'

function fixImportsAndLint(path: string, content: string) {
  console.log('fixImportsAndLint')
  let newContent = content
  if (!newContent.startsWith(`/* eslint-disable */`)) {
    newContent = `/* eslint-disable */\n${newContent}`
  }
  if (path.endsWith('graphql.ts')) {
    newContent = newContent.replace(
      '/* eslint-disable */',
      `/* eslint-disable */\nimport { type DocumentTypeDecoration } from '@graphql-typed-document-node/core';\n`,
    )
  }
  return newContent
}

const config: CodegenConfig = {
  schema: 'https://graphql.org/graphql/',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/': {
      preset: 'client',
      config: {
        documentMode: 'string',
        useTypeImports: true,
      },
      hooks: {
        beforeOneFileWrite: (path, content) => {
          return fixImportsAndLint(path, content)
        },
      },
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
}

export default config
