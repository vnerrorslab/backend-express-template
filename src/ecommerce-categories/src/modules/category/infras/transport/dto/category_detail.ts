import type { CategoryStatus } from "../../../../../shared/dto/status";

export class CategoryDetailDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly descripiton: string,
    readonly status: CategoryStatus,
    readonly parent_id: string,
  ) { }
}