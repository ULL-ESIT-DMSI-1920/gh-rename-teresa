
const ins = require("util").inspect;
const deb = (...args) => {
  console.log(ins(...args, { depth: null }));
};

// comander // 
const fs = require("fs");
const shell = require('shelljs');
const { program } = require('commander');
const config = require("./package.json")
program
  .version(config.version)
  .option('-r, --repo <type>', 'output extra debugging')
  .option('-o, --org <type>', 'small pizza size')

program.parse(process.argv);

const options = program.opts();


if (options.repo) console.log(options.repo);
if (options.org) console.log(options.org);

console.log(`program.args = ${deb(program.args)}`)
console.log("It is working")

// comprobar que git y gh están instalados // 
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

if (!shell.which('gh')) {
  shell.echo('Sorry, this script requires gh cli');
  shell.exit(1);
}

const org = options.org;
if (!org) {
  if (program.args.length < 2) program.help()

}