import 'reflect-metadata';
import { Container } from 'inversify';

let _container: Container | undefined;

export const getContainer = () => {
  if (!_container) {
    throw new Error('Container not initialized');
  }
  return _container;
};

export const setContainer = (container: Container) => {
  _container = container;
};
