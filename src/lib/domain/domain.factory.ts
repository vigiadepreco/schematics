import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  Source,
  template,
  url,
} from '@angular-devkit/schematics';
import { Location, NameParser } from '../../utils/name.parser';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { DomainOptions } from './domain.schema';

export function main(options: DomainOptions): Rule {
  options = transform(options);
  return chain([mergeSourceRoot(options), mergeWith(generate(options))]);
}

function transform(options: DomainOptions): DomainOptions {
  const target: DomainOptions = Object.assign({}, options);
  if (!target.name) {
    throw new SchematicsException('Option (name) is required.');
  }
  const location: Location = new NameParser().parse(target);
  target.name = strings.dasherize(location.name);
  target.path = strings.dasherize(location.path);
  target.language = target.language !== undefined ? target.language : 'ts';

  target.path = target.flat
    ? target.path
    : join(target.path as Path, target.name);
  return target;
}

function generate(options: DomainOptions): Source {
  return (context: SchematicContext) =>
    apply(url(join('./files' as Path, options.language)), [
      template({
        ...strings,
        ...options,
      }),
      move(options.path),
    ])(context);
}