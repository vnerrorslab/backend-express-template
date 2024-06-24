import { Op, Sequelize, type WhereOptions } from "sequelize";

import type { IBrandRepository } from "../../interfaces/repository";
import { Brand, BrandListingConditionDTO, BrandUpdateDTO } from "../../model/brand";
import { BrandPersistence } from "./dto/brand";
import type { Paging } from "../../../../shared/dto/paging";
import { BrandStatus } from "../../../../shared/dto/status";
import type { BrandDetailDTO } from "../transport/dto/brand_detail";

export class MySQLRepository implements IBrandRepository {
  constructor(readonly sequelize: Sequelize) { }

  async insertBrand(data: Brand): Promise<string> {
    try {
      const brandData = {
        id: data.id,
        name: data.name,
        logo: data.logo,
        tag_line: data.tag_line,
        description: data.description,
        status: data.status,
      };

      const result = await BrandPersistence.create(brandData);

      return result.getDataValue('id');

    } catch (error: any) {
      throw new Error(`Error inserting brand: ${error.message}`);
    }
  }

  async findByName(name: string): Promise<Brand | null> {
    try {
      const brand = await BrandPersistence.findOne({ where: { name } });

      return brand ? brand.get({ plain: true }) : null;

    } catch (error: any) {
      throw new Error(`Error finding brand: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Brand | null> {
    try {
      const brand = await BrandPersistence.findByPk(id);

      return brand ? brand.get({ plain: true }) : null;

    } catch (error: any) {
      throw new Error(`Error finding brand: ${error.message}`);
    }
  }

  async listingBrand(condition: BrandListingConditionDTO, paging: Paging): Promise<{ brands: Brand[], total_pages: number }> {
    try {
      let whereClause: WhereOptions = {};

      if (condition.searchStr) {
        whereClause = {
          ...whereClause,
          [Op.or]: [
            { name: { [Op.like]: `%${condition.searchStr}%` } },
            { tag_line: { [Op.like]: `%${condition.searchStr}%` } },
          ]
        };
      }

      const { rows: brands, count: total_pages } = await BrandPersistence.findAndCountAll({
        where: whereClause,
        limit: paging.limit,
        offset: (paging.page - 1) * paging.limit,
      });

      return {
        brands: brands.map(brand => brand.get({ plain: true })),
        total_pages,
      }

    } catch (error: any) {

      throw new Error(`Error listing brands: ${error.message}`);
    }
  }

  async updateBrandById(id: string, dto: BrandUpdateDTO): Promise<boolean> {
    try {
      const [affectedCount] = await BrandPersistence.update(dto, { where: { id } });
      return affectedCount > 0;
    } catch (error: any) {
      throw new Error(`Error updating brand: ${error.message}`);
    }
  }

  async deleteBrandById(id: string): Promise<boolean> {
    try {
      const result = await BrandPersistence.update(
        { status: BrandStatus.INACTIVE },

        { where: { id } }
      );

      return result[0] > 0;

    } catch (error: any) {

      throw new Error(`Error deleting brand: ${error.message}`);
    }
  }

  async findBrandById(id: string): Promise<BrandDetailDTO | null> {
    const brand = await BrandPersistence.findByPk(id, {
      attributes: ['id', 'name', 'logo', 'tag_line', 'description', 'status'],
    });

    if (!brand) return null;

    return brand ? brand.get({ plain: true }) : null;
  }
}
