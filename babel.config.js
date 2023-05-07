/**
 * Without this export, compiling mocha unit tests fails to first compile it with babel, then typescript.
 */
 module.exports = {
    plugins: [
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining'
    ],
    presets: [
      [
        "@babel/preset-env", {
          "targets": {
            "node": "current"
          }
        }
      ]
    ]
  }