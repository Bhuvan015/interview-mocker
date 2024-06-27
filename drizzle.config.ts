import { defineConfig } from 'drizzle-kit'
export default defineConfig({
 schema: "./src/utils/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://user_owner:QJYHeB1X0EqN@ep-yellow-field-a56h0u69.us-east-2.aws.neon.tech/user?sslmode=require',
  },
  verbose: true,
  strict: true,
})
