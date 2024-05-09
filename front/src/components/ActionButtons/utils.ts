export const urlHasAllParams = (url: string) => url?.indexOf("{") < 0;
export const isExternal = (url: string) => url?.indexOf("http") >= 0;
