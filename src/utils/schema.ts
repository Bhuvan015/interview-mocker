import {pgTable, serial, varchar, text} from 'drizzle-orm/pg-core'

export const MockInterview  = pgTable('user', {
     id: serial('id').primaryKey(),
     jsonMockResp:text('jsonMockResp').notNull(),
     jobPosition: varchar('jobPosition').notNull(),
     jobDesc: varchar('jobDesc').notNull(),
     jobExperience: varchar('jobExperience').notNull(),
     createdBy: varchar('createdBy').notNull(),
     createdAt: varchar('createdAt'),
     mockId: varchar('mockId').notNull()
})

export const UserAnswer = pgTable('userAnswer', {
     id: serial('id').primaryKey(),
     mockIdRef: varchar('mockId').notNull(),
     correctAns: varchar('correctAns'),
     userAns: varchar('userAns'),
     question: text('userAns').notNull(),
     feedback: text('feedback'),
     rating: varchar('rating'),
     userEmail: varchar('userEamil'),
     createdAt: varchar('createdAt')
})