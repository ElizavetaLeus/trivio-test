interface HttpResponse<T> {
  data?: T;
  error?: string;
}

interface Http {
  baseURL: string;
  get<T>(endpoint: string): Promise<HttpResponse<T>>;
  post<T, Body>(endpoint: string, body: Body): Promise<HttpResponse<T>>;
  delete<T>(endpoint: string): Promise<HttpResponse<T>>;
}

export default class HTTP implements Http {
  baseURL = 'http://localhost:3000';

  private async query<T>(endpoint: string, options: RequestInit): Promise<HttpResponse<T>> {
    try {
      const response = await fetch(this.baseURL + endpoint, {
        headers: {
          'content-type': 'application/json',
        },
        ...options,
      });
      if (!response.ok) {
        const message = `Response error ${response.status} ${response.statusText}`;

        return {
          error: message,
        };
      }
      const data: T = await response.json();
      return {
        data: data,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          error: error.message,
        };
      }
      return {
        error: 'Unknown error',
      };
    }
  }

  async get<T>(endpoint: string) {
    return await this.query<T>(endpoint, { method: 'GET' });
  };

  async post<T, Body>(endpoint: string, body: Body) {
    return await this.query<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  };

  async delete<T>(endpoint: string) {
    return await this.query<T>(endpoint, { method: 'DELETE' });
  }
};
