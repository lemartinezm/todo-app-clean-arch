export interface Database {
  find(query: object): Promise<any[]>;
  findOne(query: object): Promise<any>;
  insertOne(query: object): Promise<any>;
  deleteOne(query: object): Promise<any>;
  updateOne(query: object, dataToUpdate: object): Promise<any>;
}
