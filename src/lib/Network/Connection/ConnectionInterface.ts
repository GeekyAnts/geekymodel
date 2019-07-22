export default interface ConnectionInterface {
  get(entity: any, select: any, where: any): Promise<any>;
  find(entity: any, select: any, where: any): Promise<any>;
  insert(entity: any, values: any): any;
  update(entity: any, values: any, where: any): any;
  delete(entity: any, where: any): any;
}
