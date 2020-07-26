import { Body, CacheKey, CacheTTL, Controller, Delete, Get, Param, Post, Put, HttpStatus } from "@nestjs/common";
import { Resource } from "nest-keycloak-connect";

import { Auth } from "../../../decorators/auth.decorator";
import { Paginate } from "../../../decorators/paginate.decorator";
import { PaginateServices } from "../../../services/paginate.service";

import { ResponseEntity } from "../../../entities/response.entity";
import { ResponseService } from "../../../services/response.service";

import { <%= classify(name) %>Dto } from "../dto/coins.dto";
import { <%= classify(name) %>Domain } from "../domain/coins.domain";

@Controller("<%= dasherize(name) %>")
@Resource("<%= dasherize(name) %>")
export class <%= classify(name) %>Controller {
    constructor(
        public readonly domain: <%= classify(name) %>Domain,
        public readonly response: ResponseService<<%= classify(name) %>Dto>,
        @Paginate() public paginate: PaginateServices
    ) { 
        //paginate.entity.findFields = ["name"];
        //paginate.entity.likeMode = true;
    }

    @Get()
    @Auth("realm:admin")
    async getAll(@Paginate() paginate: PaginateServices): Promise<ResponseEntity> {
        this.paginate.assign(paginate);
        return this.response.paginate(this.paginate, await this.domain.getAll(this.paginate), this.domain).catch(err => this.response.error(err));
    }

    @Get(":id")
    @Auth("realm:admin")
    async getById(@Param("id") id: string): Promise<ResponseEntity> {
        return this.response.one(await this.domain.getById(id)).catch(err => this.response.error(err));
    }

    @Post()
    @Auth("realm:admin")
    async create(@Body() dto: <%= classify(name) %>Dto): Promise<ResponseEntity> {
        return this.response.one(await this.domain.create(dto)).catch(err => this.response.error(err));
    }

    @Put(":id")
    @Auth("realm:admin")
    async update(@Param("id") id: string, @Body() dto: <%= classify(name) %>Dto): Promise<ResponseEntity> {
        const result = await this.domain.update(id, dto);
        return this.response.status((result !== null), HttpStatus.OK, HttpStatus.BAD_REQUEST);
    }

    @Delete(":id")
    @Auth("realm:admin")
    async delete(@Param("id") id: string): Promise<ResponseEntity> {
        const result = await this.domain.delete(id);
        return this.response.status((result !== null), HttpStatus.OK, HttpStatus.BAD_REQUEST);
    }
}
