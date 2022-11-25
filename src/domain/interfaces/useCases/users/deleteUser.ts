export interface DeleteUserUseCase {
  execute(id: string): Promise<boolean>;
}
