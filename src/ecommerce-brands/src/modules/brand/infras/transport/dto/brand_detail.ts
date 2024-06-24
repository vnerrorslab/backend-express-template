import type { BrandStatus } from "../../../../../shared/dto/status";

export class BrandDetailDTO {
  constructor(
    readonly id: string,
    readonly first_name: string,
    readonly last_name: string,
    readonly email: string,
    readonly phone: string,
    readonly address: string,
    readonly identification_card: string,
    readonly status: BrandStatus,
  ) { }
}