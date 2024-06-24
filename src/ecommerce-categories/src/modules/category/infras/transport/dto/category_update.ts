import { z } from "zod";
import {
  ErrStatusPattern,
  ErrorCategoryNameEmpty,
  ErrorParentEmpty,
} from "../../../../../shared/error";
import { CategoryStatus } from "../../../../../shared/dto/status";

export class UpdateCategoryDTO {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly parent_id: string,
    readonly status: CategoryStatus,
  ) { }

  validate(): void {
    const schema = z.object({
      name: z.string()
        .min(1, { message: ErrorCategoryNameEmpty.message }),

      parent_id: z.string()
        .min(1, { message: ErrorParentEmpty.message }),

      description: z.string()
        .optional(),

      status: z.nativeEnum(
        CategoryStatus, { message: ErrStatusPattern.message })
        .optional(),

    });

    try {
      schema.parse({
        name: this.name,
        parent_id: this.parent_id,
        description: this.description,
        status: this.status
      });

    } catch (error: any) {

      throw new Error(error.errors[0].message);
    }
  }
}