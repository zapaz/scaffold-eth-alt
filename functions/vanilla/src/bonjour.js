export const main = (params) => {
  const { method, path } = params;
  return `Bonjour!  ${method} request to ${path}\n${JSON.stringify(params,null,2)}\n`;
};
