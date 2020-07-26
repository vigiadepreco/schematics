import { Injectable } from "@nestjs/common";

import { GenericDomain } from "../../../generics/domain.generic";
import { <%= classify(name) %>Dto } from "../dto/<%= dasherize(name) %>.dto";
import { <%= classify(name) %>Entity } from "../entity/<%= dasherize(name) %>.entity";
import { <%= classify(name) %>Repository } from "../repository/<%= dasherize(name) %>.repository";

@Injectable()
export class <%= classify(name) %>Domain extends GenericDomain<<%= classify(name) %>Dto, <%= classify(name) %>Entity, <%= classify(name) %>Repository>{
    constructor(
        protected dto: <%= classify(name) %>Dto,
        protected entity: <%= classify(name) %>Entity,
        protected repository: <%= classify(name) %>Repository
    ) {
        super(dto, entity, repository);
    }
}