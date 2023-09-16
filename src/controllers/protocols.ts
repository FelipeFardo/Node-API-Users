export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B> {
  params?: any;
  heards?: any;
  body?: B;
}
