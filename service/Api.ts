import { ApiUrl } from "@/config/config";

class Api {
  public url: string = "";
  public auth: boolean = false;
  public type: "form" | "json" = "json";
  public token: string = "";
  public header: any = {};
  public body: any = {};

  public call = async () => {
    const url = ApiUrl + this.url;
    let headers = {
      ...this.header,
      Accept: "application/json",
    };

    if (this.auth && this.token) {
      headers["Authorization"] = "Bearer " + this.token;
    }

    let body;
    if (this.type === "json") {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(this.body);
    } else {
      body = this.body;
      // Jangan tetapkan Content-Type untuk FormData, biarkan browser menanganinya
    }

    const options: RequestInit = {
      method: "POST",
      headers: headers,
      body: body,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Body: ${errorResponse}`,
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API Call Failed:", error);
      return {
        meta: {
          code: (error as Response).status || 400,
          status: "Bad Request",
          message: (error as Response).text() || "Error handling response",
        },
        data: {},
      };
    }
  };
}

export default Api;
