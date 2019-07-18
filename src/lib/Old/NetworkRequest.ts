import ErrorMessage from "../Common/ErrorMessage";
import Deferred from "../Common/Deferred";

export default class NetworkRequest implements Deferred {
  loading: boolean = false;
  error: boolean = false;
  errors: Array<ErrorMessage> = [];
  data: any;

  params: any;
  endPoint: string;
  method: string = "GET";
  response: any;
  constructor({ endPoint }: { endPoint: string }) {
    this.endPoint = endPoint;
  }

  send() {
    const promise = new Promise((resolve: any, reject: any) => {
      setTimeout(
        resolve([
          {
            name: "Sanket",
            dob: "3rd March"
          },
          {
            name: "Sahu",
            dob: "30th March"
          }
        ]),
        2000
      );
    });

    return promise;
  }
}
