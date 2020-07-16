export default interface iStorageProvider {
  saveFile(file: string): Promise<string>
  deleteFile(file: string): Promise<void>
}
