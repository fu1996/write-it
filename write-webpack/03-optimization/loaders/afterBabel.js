function loader(source) {
    console.log(this)
    return source;
}

module.exports = loader;