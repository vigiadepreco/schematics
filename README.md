## Description

This project is a fork of project @nestjs/schematics for use in Vigia de Preço <https://vigiadepreco.com.br/> projects.

The purpose of the CLI is to automatically generate files used in the projects by implementing a Domain-Driven-Design model:

* Controller: with basic CRUD linked to the domain, with standardized pagination and response
* Domain: with the possibility of extending generic class with CRUD functions
* Data Transfer Object (DTO): basic implementation containing class-validator, class-transformer, swagger
* Entity: basics of creating isolated entities from database standards so that it is possible to use repositories
* Repository: independent repositories that can be linked to generic repositories like MongoDB, and whatever else is needed
* Schema: documents and schema for using the MongoDB repository

## Installation

```
$ npm install -g @vigiadepreco/schematics
```
