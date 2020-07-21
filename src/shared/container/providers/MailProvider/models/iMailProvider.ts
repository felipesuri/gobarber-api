export default interface iMailProvider {
  sendMail(to: string, body: string): Promise<void>
}
