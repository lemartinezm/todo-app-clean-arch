export interface DeleteTeamUseCase {
  execute(id: string): Promise<boolean>;
}
