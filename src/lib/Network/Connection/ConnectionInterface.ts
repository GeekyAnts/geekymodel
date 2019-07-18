export default interface ConnectionInterface {
  query(entity: any, select: any, where: any): any;
  insert(entity: any, values: any): any;
  update(entity: any, values: any, where: any): any;
  delete(entity: any, where: any): any;
}
