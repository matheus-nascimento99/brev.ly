import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/**/*.ts', // inclui tudo que termina em .ts
    '!src/**/*.sql', // exclui sql
    '!src/**/*.json', // exclui json, se quiser
    '!src/**/*.spec.ts', // exclui tests, se for o caso
    '!src/**/*.e2e-spec.ts', // exclui tests, se for o caso
  ],
  outDir: 'dist',
  clean: true,
  format: ['cjs', 'esm'],
})
