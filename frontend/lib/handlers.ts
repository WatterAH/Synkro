interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  errors: any[];
}

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

class ApiRequest {
  async get<T>(url: string): Promise<T> {
    const res = await fetch(SERVER_URL + url);
    const data: ApiResponse<T> = await res.json();

    if (data.success) {
      return data.data;
    } else {
      throw new ValidationError(data.errors || [], data.message);
    }
  }

  async post<T>(url: string, body: any, formDataContent?: boolean): Promise<T> {
    const res = await fetch(SERVER_URL + url, {
      method: "POST",
      headers: formDataContent ? {} : { "Content-Type": "application/json" },
      credentials: "include",
      body,
    });
    const data: ApiResponse<T> = await res.json();

    if (data.success) {
      return data.data;
    } else {
      throw new ValidationError(data.errors || [], data.message);
    }
  }

  async put<T>(url: string, body: any, formDataContent?: boolean): Promise<T> {
    const res = await fetch(url, {
      method: "PUT",
      headers: formDataContent ? {} : { "Content-Type": "application/json" },
      credentials: "include",
      body,
    });
    const data: ApiResponse<T> = await res.json();

    if (data.success) {
      return data.data;
    } else {
      throw new ValidationError(data.errors || [], data.message);
    }
  }

  async delete<T>(url: string, body?: any): Promise<T> {
    const res = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    const data: ApiResponse<T> = await res.json();

    if (data.success) {
      return data.data;
    } else {
      throw new ValidationError(data.errors || [], data.message);
    }
  }

  async download<T>(url: string, body: T, filename: string) {
    const headers: Record<string, string> = {};

    let bodyToSend: BodyInit | undefined = undefined;

    // Detectar tipo de body
    if (body instanceof FormData) {
      bodyToSend = body; // multipart/form-data
    } else if (typeof body === "object") {
      bodyToSend = JSON.stringify(body); // JSON
      headers["Content-Type"] = "application/json";
    } else if (typeof body === "string") {
      bodyToSend = body; // puede ser un string plano
    }

    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers,
      body: bodyToSend,
    });

    if (!res.ok) {
      const data: ApiResponse<T> = await res.json();
      throw new Error(data.message || "Error al descargar el archivo");
    }

    const blob = await res.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
  }
}

export const request = new ApiRequest();

class ValidationError extends Error {
  errors: any[];
  message: string;

  constructor(errors: any[], message?: string) {
    super(message || "Validation failed");
    this.errors = errors;
    this.message = message || "Validation failed";
    this.name = "ValidationError";
  }
}
