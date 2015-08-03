/**************
  DEFAULT ACTIONS
**************/

module.exports = {

  // pick random number from a range of numbers
  // @gopher: random 5-20
  randomRange: {
    default: true,
    regex: ["random [0-9]+ ?- ?[0-9]+"],
    action: require('./random.js').randomRange
  },

  // pick something random from comma separated list e.g.
  // @gopher: random john,dave,steve
  random: {
    default: true,
    regex: ["random .*"],
    action: require('./random.js').randomList
  },

  // Return an averge for a set of numbers
  // @gopher: average 1,2,3,4,5
  average: {
    default: true,
    regex: ["average [0-9,\s]+"],
    action: require('./maths.js').average
  },

  // get a brief description from Wikipedia
  // @gopher: wiki Middlesbrough FC
  wiki: {
    default: true,
    regex: ["wiki .*"],
    action: require('./wiki.js').get
  }

}