export {};

declare global {
  interface Window {
    electronAPI: {
      selectFolder: () => Promise<string | null>;
      compareFolders: (folderPath1:string, folderPath2:string) => Promise<string>;
    };
  }
}