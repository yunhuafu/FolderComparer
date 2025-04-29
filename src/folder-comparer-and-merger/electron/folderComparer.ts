import File from '../models/file';
import Folder from '../models/folder';
import { promises as fs } from 'fs';
import path from 'path';

class FolderComparer{
    private static async listFilesAndFolders(folderPath: string): Promise<Folder | null> {
        try {
            console.log("folderPath: " + folderPath);
            const entries = await fs.readdir(folderPath, { withFileTypes: true });

            let folder = new Folder();
            folder.path = folderPath;
            console.log("abcde" + folder.files);

            for (const entry of entries) {
                if (entry.isFile()) {
                    const fullPath = path.join(folderPath, entry.name);
                    const stats = await fs.stat(fullPath);

                    let file = new File();
                    file.name = entry.name;
                    file.size = stats.size;
                
                    folder.files.push(file);
                }
                else if (entry.isDirectory()) {
                    const fullPath = path.join(folderPath, entry.name);
                    const stats = await fs.stat(fullPath);

                    let subfolder = new Folder();
                    subfolder.name = entry.name;
                    subfolder.size = stats.size;
                
                    folder.folders.push(subfolder);
                }
            }

            return folder;

        } catch (err) {
          console.error('Error reading folder:', err);
          //throw err;
          return null;
        }
      }

    public static async compareFolders(folderPath1:string, folderPath2:string): Promise<[Folder | null, Folder | null]> {
        console.log("folderPath: " + folderPath1);
        var folder1 = await FolderComparer.listFilesAndFolders(folderPath1);
        var folder2 = await FolderComparer.listFilesAndFolders(folderPath2);
        return [folder1, folder2];
    }

}

export default FolderComparer;