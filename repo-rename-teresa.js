
const ins = require("util").inspect;
const deb = (...args) => {
  console.log(ins(...args, { depth: null }));
};

// comander // 
const fs = require("fs");
const shell = require('shelljs');
const { program } = require('commander');
const { args } = program;
const { version }  = require("./package.json")

program
  .version(version)
  .option('-r, --repo <type>', 'specifies the repo')
  .option('-o, --org <type>', 'specifies the organization')

program.parse(process.argv);

const options = program.opts();


if (options.repo) console.log(options.repo);
if (options.org) console.log(options.org);

console.log(`program.args = ${program.args}`)
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
let newName;
if (!org) {
  [org, repo] = args[0].split("/");
  console.log(`org and repo ${org} ${repo}`);
  console.log(`newName = ${newName}`)
}
if(!newName) newName = args[0]
if(!org || !repo || !newName) program.help()

if(program.args.length < 1) program.help();

let r = shell.exec {
  `gh api -X PATCH "/repos/${org}/${repo}"  -f  name=${newName} --jq .[].name`,
{silent:false}
};
console.log(`stdout= ${r.stdout}`);
console.log(`stderr= ${r.stderr}`);

/*
if (!repo) {
  [org, repo] = args[1].split("/")
}
if ( args.length < 1) program.help();
if (!org || !repo) {
  program.help();
}
else if (args.length === 0) {
  program.help();
}
console.log('The number of arguments is correct')
*/