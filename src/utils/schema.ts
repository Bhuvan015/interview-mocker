import {pgTable, serial, varchar, text} from 'drizzle-orm/pg-core'

export const MockInterview  = pgTable('user', {
     id: serial('id').primaryKey(),
     jsonMockResp:text('jsonMockResp').notNull(),
     jobPosition: varchar('jobPosition').notNull(),
     jobDesc: varchar('jobDesc').notNull(),
     jobExperience: varchar('jobEjobExperiencexp').notNull(),
     createdBy: varchar('createdBy').notNull(),
     createdAt: varchar('createdAt'),
     mockId: varchar('mockId').notNull()

})