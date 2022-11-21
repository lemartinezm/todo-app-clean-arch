export interface DeleteTodoUseCase {
  execute(id: string): Promise<boolean>;
}
