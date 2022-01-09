require("./rulesinjson");

const { AbilityBuilder, Ability } = require("@casl/ability");
const { adminperms, userperms } = require("./rulesinjson");

let ANONYMOUS_ABILITY;

function defineAbilityFor(user) {
  return new Ability(defineRulesFor(user));
}

function defineRulesFor(user) {
  let perms;

  switch (user.role) {
    case "admin":
      perms = adminperms(user);
      break;
    case "user":
      perms = userperms(user);
      break;
  }
  return perms;
}

module.exports = {
  defineRulesFor,
  defineAbilityFor,
};
