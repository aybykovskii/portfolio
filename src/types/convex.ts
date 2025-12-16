import { Doc as DocType, TableNames } from 'convex/_generated/dataModel'

export type OmitDocFields<T> = Omit<T, '_id' | '_creationTime'>
export type Doc<T extends TableNames> = OmitDocFields<DocType<T>>
