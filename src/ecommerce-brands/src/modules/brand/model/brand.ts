import type { BrandStatus } from "../../../shared/dto/status";

export class Brand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly logo: string,
    readonly tag_line: string,
    readonly description: string,
    readonly status: BrandStatus,
  ) { }
}

export class BrandUpdateDTO {
  name?: string;
  logo?: string;
  tag_line?: string;
  description?: string;
  status?: BrandStatus;
}

export class BrandListingConditionDTO {
  constructor(
    readonly searchStr: string,
  ) { }
}

export class BrandChangeStatusDTO {
  constructor(
    readonly id: string,
    readonly status: string,
  ) { }
}