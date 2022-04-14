export const wait = (t: number): Promise<void> => new Promise(resolve => setTimeout(resolve, t))
