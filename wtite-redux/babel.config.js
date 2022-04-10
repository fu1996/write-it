const plugins = [
    'transform-object-rest-spread',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    '@babel/plugin-proposal-export-default-from',
];

const presets = [
    [
        '@babel/preset-env',
        {
            modules: false,
            useBuiltIns: false,
        },
    ],
];

module.exports = {presets, plugins};
