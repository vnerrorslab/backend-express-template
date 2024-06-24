import { z } from "zod";
import {
  ErrStatusPattern,
  ErrorBrandNameEmpty,
  ErrorLogoEmpty,
} from "../../../../../shared/error";
import { BrandStatus } from "../../../../../shared/dto/status";

export class UpdateBrandDTO {
  constructor(
    readonly name: string,
    readonly logo: string,
    readonly tag_line: string,
    readonly description: string,
    readonly status: BrandStatus,
  ) { }

  validate(): void {
    const schema = z.object({
      name: z.string()
        .min(1, { message: ErrorBrandNameEmpty.message }),

      logo: z.string()
        .min(1, { message: ErrorLogoEmpty.message }),

      tag_line: z.string()
        .optional(),

      description: z.string()
        .optional(),

      status: z.nativeEnum(
        BrandStatus, { message: ErrStatusPattern.message })
        .optional(),

    });

    try {
      schema.parse({
        name: this.name,
        logo: this.logo,
        tag_line: this.tag_line,
        description: this.description,
        status: this.status
      });

    } catch (error: any) {

      throw new Error(error.errors[0].message);
    }
  }
}