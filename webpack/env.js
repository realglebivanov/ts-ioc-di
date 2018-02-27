module.exports = class Env {
  isProduction() {
    return this.is('production');
  }

  isDevelopment() {
    return this.is('development');
  }

  isTest() {
    return this.is('test');
  }

  is(name) {
    return this.getName() === name;
  }

  getName() {
    return process.env.NODE_ENV || 'development';
  }
}
