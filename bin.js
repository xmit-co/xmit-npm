const { Binary } = require("binary-install");
const { arch, type } = require("os");
const { join } = require("path");
const version = require(join(__dirname, "package.json")).version.split("-")[0];

const osType = type();
const osArch = arch();

const goos = {
  Windows_NT: "windows",
  Linux: "linux",
  Darwin: "darwin",
}[osType];

const goarch = {
  arm64: "arm64",
  x64: "amd64",
}[osArch];

if (goos === undefined || goarch === undefined) {
  throw new Error(`Unsupported OS: ${osType} ${osArch}`);
}

const binary = new Binary(
  "xmit",
  `https://github.com/xmit-co/xmit/releases/download/v${version}/xmit_${version}_${goos}_${goarch}.tgz`,
  {
    installDirectory: join(__dirname, `${goos}-${goarch}`),
  },
);

module.exports = binary;
