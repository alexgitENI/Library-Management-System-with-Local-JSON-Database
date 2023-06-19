import fs from "node:fs/promises";
import path from 'node:path';


export async function readData(fileName) {
    try {
      const filePath = path.resolve(process.cwd(), fileName);
      const data = await fs.readFile(filePath);
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Failed to read library data');
    }
  }
  
export async function writeData(fileName, library) {
    try {
      const filePath = path.resolve(process.cwd(), fileName);
      await fs.writeFile(filePath, JSON.stringify(library));
    } catch (error) {
      throw new Error('Failed to write library data');
    }
  }